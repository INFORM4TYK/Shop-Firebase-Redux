import { Link } from "react-router-dom";
import { Nav } from "./NavbarStyles";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { persistor } from "../../store/Store";

const Navbar = () => {
  const resetState = () => {
    persistor.purge();
  };
  const user = useSelector(state => state.auth.fullName);
  const totalQty = useSelector(state => state.cart.totalQty );
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
          <button onClick={resetState}>RESET</button>
        </div>
      </div>
    </Nav>
  );
};

export default Navbar;
