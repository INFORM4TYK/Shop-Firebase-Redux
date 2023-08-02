import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./components/Auth/SignIn/SignIn";
import SignUp from "./components/Auth/SignUp/SignUp";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import AddProcucts from "./components/product/AddProcucts";
import { store, persistor } from "./store/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./components/Home/Home";
import { Analytics } from '@vercel/analytics/react';
 
function App() {
  return (
    <>
    <Analytics />
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Navbar />
            <Routes>
              <Route exact path="/" Component={Home} />
              <Route path="/cart" Component={Cart} />
              <Route path="/signin" Component={SignIn} />
              <Route path="/signup" Component={SignUp} />
              <Route path="/account" Component={Dashboard} />
              <Route path="/add-products" Component={AddProcucts} />
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
  </>
  );
}

export default App;
