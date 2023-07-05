import { Link } from "react-router-dom";
import { Nav } from "./NavbarStyles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/AuthSlice";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/CartSlice";
import { Button } from "../product/ProductStyles";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.fullName);
  const totalQty = useSelector((state) => state.cart.totalQty);
  const navigate = useNavigate();
  const resetState = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
        dispatch(logout(user));
        dispatch(clearCart());
      })
      .catch((error) => {
        console.log("Logout errro:", error);
      });
  };
  return (
    <Nav>
      <div>
        <Link to="/">SHOP</Link>
      </div>
      <div>
        <div>
          {user && user ? (
            <>
              <Link to="/account">{user}</Link>
            </>
          ) : (
            <>
              <Link to="/signin">Sign In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
        <div>
          <Link to="/cart">
            <AiOutlineShoppingCart />
            <p>{totalQty}</p>
          </Link>
          {user && <Button onClick={() => resetState()}>Log Out</Button>}
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
