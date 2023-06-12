import { useRef, useState, useEffect } from "react";
import { Button } from "../../product/ProductStyles";
import { FormContainer, Container, CreateAccount } from "../SignInStyles";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
const SignIn = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [signIn, setSignIn] = useState(false);
  const handleSingIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        setSignIn(true);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };
  console.log(signIn);
  if (signIn) {
    navigate("/");
  }
  return (
    <>
    <Container>
      <FormContainer onSubmit={handleSingIn}>
        <h2>Login</h2>
        <label>
          Email
          <input type="text" ref={emailRef} required  />
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
