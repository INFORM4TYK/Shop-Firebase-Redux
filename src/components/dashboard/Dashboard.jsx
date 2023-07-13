import { auth } from "../../config/firebase";
import { Button } from "../product/ProductStyles";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DashboardContainer } from "./DashboardStyles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/AuthSlice";
import { clearCart } from "../../store/CartSlice";
import UserProfil from "./userProfil/UserProfil";
import AccDetails from "./accDetails/AccDetails";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.fullName);
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/signin");
        dispatch(logout(user));
        dispatch(clearCart());
      })
      .catch((error) => {
        console.log("Logout errro:", error);
      });
  };
  return (
    // <DashboardContainer>
    //   <div>{user && user}</div>
    //   <Link to="/add-products">
    //     <Button>Add Products</Button>
    //   </Link>
    //   <Button onClick={handleLogout}>Logout</Button>
    // </DashboardContainer>
    <DashboardContainer>
      <UserProfil/>
      <AccDetails/>
    </DashboardContainer>
  );
};

export default Dashboard;
