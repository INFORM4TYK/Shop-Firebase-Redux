import { useRef, useState, useEffect } from "react";
import { Button } from "../../product/ProductStyles";
import { FormContainer, Container, CreateAccount } from "../SignInStyles";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fs } from "../../../config/firebase";
import { login } from "../../../store/AuthSlice";
import { getDoc,doc, } from "firebase/firestore";
import { auth } from "../../../config/firebase";
import { useDispatch,useSelector } from "react-redux";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [signIn, setSignIn] = useState(false);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const handleSingIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((userCredentials) => {
        setSignIn(true);
        const user = userCredentials.user;
        getDoc(doc(fs, "user", user.uid))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const fullName = snapshot.data().fullName;
            const date = snapshot.data().dateOfBirth;
            const description = snapshot.data().description;
            const createDate = snapshot.data().CreateDate;
            const email = snapshot.data().email;
            const uid = user.uid
            const token = user.accessToken;
              dispatch(login({ token,uid,email, fullName,date, description,createDate}));
            } 
          })
          .catch((error) => {
            console.log("Błąd pobierania danych użytkownika:", error)
          });
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.code.replace("auth/", ""));
      });
  };
  // console.log(signIn);
 useEffect(()=>{
  if(isLoggedIn){
    navigate('/')
  }
 },[isLoggedIn])
  return (
    <>
      <Container>
        <FormContainer onSubmit={handleSingIn}>
          <h2>Login</h2>
          <label>
            Email
            <input type="text" ref={emailRef} required />
          </label>
          <label>
            Password
            <input type="password" ref={passwordRef} required />
          </label>
          <p>{error && error}</p>
          <Button type="submit">Sign In</Button>
          <CreateAccount>
            <h6>You don't have an account?</h6>
            <Link to="/signup">
              <p>Create Account</p>
            </Link>
          </CreateAccount>
        </FormContainer>
      </Container>
    </>
  );
};
export default SignIn;
