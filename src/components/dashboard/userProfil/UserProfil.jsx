import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fs } from "../../../config/firebase";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { updateUser } from "../../../store/AuthSlice";
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
} from "./UserProfilStyles";
import defaultAvatar from "../../../../images/Avatar.png";
const UserProfil = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { avatarUrl, createDate, fullName, email } = useSelector(
    (state) => state.auth
  );
  
  const [avatar, setAvatar] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  if (selectedFile) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  const handleUploadAvatar = async (e) => {
    console.log("ello");
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
        const userRef = doc(fs, "user", user.uid);
        await updateDoc(userRef, { avatarUrl: downloadURL });
        const updatedSnapshot = await getDoc(userRef);
        const updatedUser = {
          ...user,
          ...updatedSnapshot.data(),
        };
        dispatch(updateUser(updatedUser));
        console.log("wykonuje");
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  return (
    <>
      <ProfilContainer>
        <ProfilImage
          img={avatar || avatarUrl || defaultAvatar}
          onChange={handleUploadAvatar}
        >
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            accept="image/*"
          />
        </ProfilImage>
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
