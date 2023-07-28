import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, fs } from "../../../config/firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { updateUser } from "../../../store/AuthSlice";
import { Button } from "../../product/ProductStyles";
import { MdDoneOutline } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { sendEmailVerification } from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  ProfilContainer,
  ProfilImage,
  UserData,
  UserNoDesc,
  UserDesc,
  ImageSection,
} from "./UserProfilStyles";
import defaultAvatar from "../../../../images/Avatar.png";
const UserProfil = ({ setMessage }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  let verified = auth.currentUser.emailVerified;
  const { avatarUrl, createDate, fullName, email } = useSelector(
    (state) => state.auth
  );

  const [avatar, setAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const clearMesage = () => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  const handleUploadAvatar = async (e) => {
    if (selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      });
      try {
        await uploadTask;
        const downloadURL = await getDownloadURL(storageRef);
        const userRef = doc(fs, "user", auth.currentUser.uid);
        await updateDoc(userRef, { avatarUrl: downloadURL });
        const updatedSnapshot = await getDoc(userRef);
        const updatedUser = {
          ...user,
          ...updatedSnapshot.data(),
        };
        dispatch(updateUser(updatedUser));
        setMessage("Avatar uploaded successfully");
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    } else {
      setMessage("You need to select a file in circle");
    }
    clearMesage();
  };
  const handleRemoveAvatar = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(fs, "user", auth.currentUser.uid);
      await updateDoc(userRef, { avatarUrl: "" });
      const updatedSnapshot = await getDoc(userRef);
      const updatedUser = {
        ...user,
        ...updatedSnapshot.data(),
      };
      dispatch(updateUser(updatedUser));
      setMessage("Avatar removed successfully");
      clearMesage();
    } catch (error) {
      console.error("Error removing avatar", error);
    }
  };
  const handleVerifyEmail = () => {
    if(!verified){
      sendEmailVerification(auth.currentUser)
        .then(() => {
          setMessage("Verification has been sent to your e-mail");
        })
        .catch((error) => {
          console.error(error);
        });
    }else{
      setMessage("E-mail already verified")
    }
    clearMesage();
  };
  return (
    <>
      <ProfilContainer>
        <ImageSection>
          <ProfilImage img={avatar || avatarUrl || defaultAvatar}>
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              accept="image/*"
            />
          </ProfilImage>
          <Button
            onClick={handleUploadAvatar}
            style={{ fontSize: "var(--fs-xsmall)" }}
          >
            Upload Avatar
          </Button>
          <Button
            onClick={handleRemoveAvatar}
            style={{
              backgroundColor: "var(--white-color)",
              border: "1px solid var(--main-color)",
              fontSize: "var(--fs-xsmall)",
            }}
          >
            Delete Avatar
          </Button>
        </ImageSection>
        <UserData>
          <nav>
            <h3>{user && fullName}</h3>
          </nav>
          <section>
            <aside>
              <label>
                <h5>Email:</h5>
                <p>{user && email}</p>
              </label>
              <label>
                <h5>Register Date:</h5>
                <p>{user && createDate}</p>
              </label>
            </aside>
            <aside>
              <label>
                <h5>Date of Birth:</h5>
                <p>{user && user.date}</p>
              </label>
              <label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h5>Verified:</h5>
                  {user && verified ? (
                    <MdDoneOutline style={{ color: "green" }} />
                  ) : (
                    <IoMdClose style={{ color: "red" }} />
                  )}
                </div>
                <Button
                  onClick={handleVerifyEmail}
                  style={{ marginTop: ".5rem" }}
                >
                  Verify Email
                </Button>
              </label>
            </aside>
          </section>
        </UserData>
        {user.description ? (
          <UserDesc>
            <p>{user.description}</p>
          </UserDesc>
        ) : (
          <UserNoDesc>
            <p>You can add your description down below</p>
          </UserNoDesc>
        )}
      </ProfilContainer>
      {/* <button onClick={handleUploadAvatar}>ADD AVATAR</button> */}
    </>
  );
};

export default UserProfil;
