import { DetailsContainer, Nav, FormDetails } from "./AccDetailsStyles";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, fs } from "../../../config/firebase";
import { useRef } from "react";
import { updateEmail } from "firebase/auth";
import { updateUser } from "../../../store/AuthSlice";
import { useState, useEffect } from "react";
import { Button } from "../../product/ProductStyles";

const AccDetails = () => {
  const user = useSelector((state) => state.auth);
  const { email, date, fullName } = useSelector((state) => state.auth);
  const [firstName, lastName] = fullName.split(" ");
  const [formChanged, setFormChanged] = useState(false);
  const [alert, setAlert] = useState("");
  const firstRef = useRef();
  const lastRef = useRef();
  const dateRef = useRef();
  const descRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formChanged) {
      setAlert("No changes for submit");
    } else {
      try {
        const userRef = doc(fs, "user", auth.currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        const currentUserData = userSnapshot.data();

        const updatedData = {
          ...currentUserData,
          fullName: `${firstRef.current.value || firstName} ${
            lastRef.current?.value || lastName
          }`,
          email: emailRef.current.value,
          date: dateRef.current.value,
          description: descRef.current.value,
        };
        dispatch(updateUser(updatedData));
        await setDoc(userRef, updatedData);
        await updateEmail(auth.currentUser, emailRef.current?.value);
        setFormChanged(false);
        setAlert("Data updated!");
      } catch (error) {
        console.log(error);
        setAlert("Something went wrong. Try again later");
      }
    }
    setTimeout(() => {
      setAlert("");
    }, 3000);
  };
  useEffect(() => {
    const inputRefs = [firstRef, lastRef, emailRef, dateRef, descRef];
    const handleInputChange = () => {
      setFormChanged(true);
    };
    inputRefs.forEach((ref) => {
      ref.current.removeEventListener("input", handleInputChange);
      ref.current.addEventListener("input", handleInputChange);
    });
  }, []);
  return (
    <DetailsContainer>
      <Nav>
        <h2>Edit Account Details</h2>
      </Nav>
      <FormDetails onSubmit={handleSubmit}>
        <label>
          <p>First name </p>
          <input defaultValue={firstName} type="text" ref={firstRef} />
        </label>
        <label>
          <p>Last name </p>
          <input defaultValue={lastName} type="text" ref={lastRef} />
        </label>
        <label>
          <p>Email</p>
          <input defaultValue={email} type="email" ref={emailRef} />
        </label>
        <label>
          <p>Date of Birth</p>
          <input defaultValue={date || null} type="date" ref={dateRef} />
        </label>
        <label>
          <p>Description</p>
          <textarea
            id="desc"
            defaultValue={user.description || null}
            placeholder="Type your description here..."
            type="text"
            ref={descRef}
            spellCheck="false"
          />
        </label>
        <label>
          <h3>{alert}</h3>
        </label>
        <label>
          <Button type="submit">Update Details</Button>
        </label>
      </FormDetails>
    </DetailsContainer>
  );
};

export default AccDetails;
