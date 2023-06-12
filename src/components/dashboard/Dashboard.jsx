import { auth } from "../../config/firebase";
import { Button } from "../product/ProductStyles";
import { useNavigate } from "react-router-dom";
import withAuthentication from "../utils/HOC";
import { Link } from "react-router-dom";
import {DashboardContainer} from './DashboardStyles'
const Dashboard = ({ user }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/signin");
      })
      .catch((error) => {
        console.log("Logout errro:", error);
      });
  };
  return (
    <DashboardContainer>
      <div>{user && user}</div>
      <Link to="/add-products">
      <Button>Add Products</Button>
      </Link>
      <Button onClick={handleLogout}>Logout</Button>
    </DashboardContainer>
  );
};

export default withAuthentication(Dashboard);
