import { Container, FormContainer, CreateAccount } from "../SignInStyles";
import { Button } from "../../product/ProductStyles";
import { useRef, useState } from "react";
import { auth, fs } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const navigation = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const confirmPasswordRef = useRef();
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const handleSignUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((credentials) => {
        console.log(credentials);
        setDoc(doc(fs, "user", credentials.user.uid), {
          FullName: fullNameRef.current.value,
          Email: emailRef.current.value,
          Password: passwordRef.current.value,
        })
          .then(() => {
            setSuccessMsg("successfull");
            navigation("/account");
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });

    console.log(emailRef.current.value, passwordRef.current.value);
  };
  return (
    <Container onSubmit={handleSignUp}>
      <FormContainer action="">
        <h2>Register</h2>
        <label>
          Full Name
          <input type="text" ref={fullNameRef} required />
        </label>
        <label>
          Email
          <input type="text" ref={emailRef} required />
        </label>
        <label>
          Password
          <input type="password" ref={passwordRef} required />
        </label>
        <label>
          Confirm Password
          <input type="password" ref={confirmPasswordRef} required  />
        </label>
        <p>{error && error}</p>
        <p>{successMsg && successMsg}</p>
        <Button type="submit">Sign Up</Button>
        <CreateAccount>
          <h6>You have an account?</h6>
          <Link to="/signin">
            <p>Sing In</p>
          </Link>
        </CreateAccount>
      </FormContainer>
    </Container>
  );
};

export default SignUp;
