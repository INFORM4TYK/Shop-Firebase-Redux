import { Link } from "react-router-dom";
import { Nav } from "./NavbarStyles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { persistor } from "../../store/Store";
import { logout } from "../../store/AuthSlice";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/CartSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.fullName);
  const totalQty = useSelector((state) => state.cart.totalQty);
  const navigate = useNavigate();
  const resetState = () => {
    auth
      .signOut()
      .then(() => {
        persistor.purge();
        navigate("/signin");
        dispatch(logout(user));
        dispatch(clearCart());
        window.location.reload(true);
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
          <button onClick={() => resetState()}>RESET</button>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
