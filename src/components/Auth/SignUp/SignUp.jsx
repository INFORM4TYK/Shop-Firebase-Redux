import { Container, FormContainer, CreateAccount } from "../SignInStyles";
import { Button } from "../../product/ProductStyles";
import { useRef, useState } from "react";
import { auth, fs } from "../../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/AuthSlice";
const SignUp = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const fullNameRef = useRef();
  const confirmPasswordRef = useRef();
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");
  const date = new Date(); 
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  console.log(formattedDate)
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
          fullName: fullNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
          createDate: formattedDate,
          avatarUrl: "",
          dateOfBirth: "",
          description: "",
        })
        .then(() => {
          setSuccessMsg("successfull");
          const fullName = fullNameRef.current.value;
          const email = emailRef.current.value;
          const avatarUrl = "";
          const createDate = formattedDate;
          const uid =  auth.currentUser.uid;
          
          dispatch(
            login({
              createDate,
              avatarUrl,
              uid,
              email,
              fullName,
              date: "",
              description: "",
            })
          );
          navigation("/account");
        })
        .catch((error) => {
          setError(error.message);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
};
  const handleInputChange = () => {
    let inputValue = fullNameRef.current.value;
    const words = inputValue.split(" ");
    const capitalizedWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    const capitalizedValue = capitalizedWords.join(" ");
    fullNameRef.current.value = capitalizedValue;
  };
  return (
    <Container onSubmit={handleSignUp}>
      <FormContainer action="">
        <h2>Register</h2>
        <label>
          Full Name
          <input
            type="text"
            ref={fullNameRef}
            required
            onChange={handleInputChange}
          />
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
          <input type="password" ref={confirmPasswordRef} required />
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
