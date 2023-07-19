import { DetailsContainer, Nav, FormDetails } from "./AccDetailsStyles";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { fs } from "../../../config/firebase";
import { useEffect } from "react";
import { useRef } from "react";
import { updateEmail } from "firebase/auth";
import { login, updateUser } from "../../../store/AuthSlice";
const AccDetails = () => {
  const user = useSelector((state) => state.auth);
  const email = useSelector((state) => state.auth.email);
  const date = useSelector((state) => state.auth.date);
  const uid = useSelector((state) => state.auth.uid);
  const fullName = useSelector((state) => state.auth.fullName);
  const token = useSelector((state) => state.auth.token);
  const [firstName, lastName] = fullName.split(" ");
  console.log(fullName)
  const firstRef = useRef();
  const lastRef = useRef();
  const dateRef = useRef();
  const descRef = useRef();
  const emailRef = useRef();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userRef = doc(fs, "user", uid);
      const updatedData = {};
      updatedData.fullName = `${firstRef.current.value || firstName} ${
        lastRef.current.value || lastName
      }`;
      updatedData.email = emailRef.current.value;
      updatedData.date = dateRef.current.value;
      updatedData.description = descRef.current.value;
      await setDoc(userRef, updatedData);
      // await updateEmail(user, emailRef.current.value);
      const updatedSnapshot = await getDoc(userRef);
      const updatedUser = {
        ...user,
        ...updatedSnapshot.data(),
      };
      console.log(updatedUser);
      dispatch(updateUser(updatedUser));
      console.log("Dane zostały zaktualizowane w Firestore!");
    } catch (error) {
      console.error("Błąd podczas aktualizowania danych:", error);
    }
  };

  // console.log(user)
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
            type="text"
            ref={descRef}
          />
        </label>
        <button type="submit">SUBMIT</button>
      </FormDetails>
    </DetailsContainer>
  );
};

export default AccDetails;
