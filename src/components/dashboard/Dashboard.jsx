import { DashboardContainer, AlertSection } from "./DashboardStyles";
import UserProfil from "./userProfil/UserProfil";
import AccDetails from "./accDetails/AccDetails";
import { useState } from "react";
const Dashboard = () => {
  const [message, setMessage] = useState("");
  return (
    <DashboardContainer>
      <UserProfil setMessage={setMessage} />
      {message && (
        <AlertSection>
          <p>{message}</p>
        </AlertSection>
      )}
      <AccDetails setMessage={setMessage} />
    </DashboardContainer>
  );
};

export default Dashboard;
