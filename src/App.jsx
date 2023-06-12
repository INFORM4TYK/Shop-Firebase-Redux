import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./components/product/Product";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import AddProcucts from "./components/product/AddProcucts";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" Component={Product} />
          <Route path="/cart" Component={Cart} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/account" Component={Dashboard} />
          <Route path="/add-products" Component={AddProcucts} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
