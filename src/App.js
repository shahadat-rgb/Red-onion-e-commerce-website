import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Header from './Component/Header/Header';
import NoMatch from './Component/NoMatch/NoMatch';
import Home from './Component/Home/Home';
import ShopDetails from './Component/ShopDetails/ShopDetails';
import Footer from './Component/Footer/Footer';
import SingleProduct from './Component/SingleProduct/SingleProduct';
import Login from './Component/Login/Login';
import PrivateRoute from './Component/Login/PraivateRoute/PraivateRoute';
import Shipment from './Component/Shipment/Shipment';



export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cartAmount, setCartAmount] = useState(0);
  return (
    <UserContext.Provider  value={[loggedInUser, setLoggedInUser ]}>
    <Router>
      
        <Header cartAmount={cartAmount}></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
            <ShopDetails></ShopDetails>
          </Route>
          <Route path="/home">
            <Home></Home>
          </Route>

          <Route path="/product/:productKey">
            <SingleProduct setCartAmount={setCartAmount}></SingleProduct>
          </Route>
          
           <Route path='/login'>
             <Login></Login>
           </Route>
           
           <PrivateRoute path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute>
            
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
        <Footer></Footer>
    </Router>
    </UserContext.Provider>
  );
}

export default App;