import { DetailsContainer, Nav, FormDetails } from "./AccDetailsStyles";
import { useSelector } from "react-redux";
const AccDetails = () => {
  const user = useSelector((state) => state.auth);
  const [firstName, lastName] = user.fullName.split(" ");

  return (
    <DetailsContainer>
      <Nav>
        <h2>Personal Details</h2>
      </Nav>
      <FormDetails>
        <label >
          <p>First name </p>
          <input placeholder={firstName}  type="text" />
        </label>
        <label>
          <p>Last name </p>
          <input placeholder={lastName} type="text" />
        </label>
        <label>
          <p>Email</p>
          <input placeholder={user.user.email} type="email" />
        </label>
        <label>
          <p>Date of Birth</p>
          <input type="date" />
        </label>
        <label>
          <p>Description</p>
          <textarea type="text" />
        </label>
      </FormDetails>
    </DetailsContainer>
  );
};

export default AccDetails;
