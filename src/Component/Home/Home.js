import React, { useState, useEffect, useContext } from 'react';
import LunchProducts from '../LunchProducts/LunchProducts';
import BreakfastProducts from '../BreakfastProducts/BreakfastProducts';
import DinnerProducts from '../DinnerProducts/DinnerProducts';
import { getDatabaseCart } from '../../utilities/databaseManager';
import bannerbackground from "../../bannerbackground.png"
import "./Home.css"
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';


const Home = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [foods, setFoods] = useState([]);

    const [lunchProduct, setLunchProduct] = useState([]);
    const [breakfastProduct, setbreakfastProduct] = useState([]);
    const [dinnerProduct, setDinnerProduct] = useState([]);
  
    const [showBreakfast, setShowBreakfast] = useState(false);
    const [showLunch, setShowLunch] = useState(true);
    const [showDinner, setShowDinner] = useState(false);
    useEffect(() => {
      // Get All Foods & Lunch Foods for HomePage
      fetch('https://fathomless-ridge-69474.herokuapp.com/foods')
        .then(res => res.json())
        .then(data => {
          const lunchFoods = data.filter(food => food.category === 'lunch');
          setLunchProduct(lunchFoods)
          setFoods(data)
        })
        .catch(err => console.log(err))
  
    }, [])
    const handleBreakfastProduct = () => {
      const breakfastFoods = foods.filter(food => food.category === 'breakfast');
      setbreakfastProduct(breakfastFoods)
  
      setShowBreakfast(true);
      setShowLunch(false);
      setShowDinner(false);
    }
    const handleLunchProduct = () => {
      const lanchFoods = foods.filter(food => food.category === 'lunch');
      setLunchProduct(lanchFoods)
  
      setShowLunch(true);
      setShowBreakfast(false);
      setShowDinner(false);
    }
    const handleDinnerProduct = () => {
      const dinnerFoods = foods.filter(food => food.category === 'dinner');
      setDinnerProduct(dinnerFoods)
  
      setShowDinner(true);
      setShowLunch(false);
      setShowBreakfast(false);
    }
    // cart amount

    const cartInfo = getDatabaseCart();
    const cartProductKeys = Object.keys(cartInfo);
    const productKeysCount = cartProductKeys.length;
   
    // button
   
    let checkOutBtn = '';
    if (productKeysCount > 0 && loggedInUser.name) {
      checkOutBtn = <Link to="/shipment"><button className="checkoutBtnActivate">Checkout Your Foods</button></Link>
    }
    else if (productKeysCount > 0) {
      checkOutBtn = <Link to="/shipment"><button className="checkoutBtnActivate">Login to Checkout</button></Link>
    }
    else {
      checkOutBtn = <button onClick={() => alert("Cart is empty yet. Keep Shopping")} className="checkoutBtn">Checkout Your Foods</button>
    }
    return (
        <body>
        
            <div style={{ backgroundImage: `url(${bannerbackground})` }} className="home">
                <div className="container input-aria">
                    <h1>Best food waiting for your belly</h1>
                    <div class="input-group">
                       <input type="text" class="form-control" placeholder="Search food items" aria-describedby="button-addon2"/>
                            <div class="input-group-append">
                              <button class="btn btn-danger input-btn" type="button" id="button-addon2">Search</button>
                            </div>
                    </div>
                </div>   
             </div>  
        
   {/* navbar of products */}
       
   <div className="ShopSection">
      <div className="ShopContent">
        <div className="ShopBtnWrapper d-flex justify-content-center">
          <div className="pb-2">
            <button onClick={handleBreakfastProduct} className={showBreakfast ? 'ShopBtnActive' : 'ShopBtnInactive'}>Breakfast</button>
            <button onClick={handleLunchProduct} className={showLunch ? 'ShopBtnActive' : 'ShopBtnInactive'}>Lunch</button>
            <button onClick={handleDinnerProduct} className={showDinner ? 'ShopBtnActive' : 'ShopBtnInactive'}>Dinner</button>
          </div>
        </div>
          

          
        <div className="container">
          {
            lunchProduct.length > 0 ?
              <div className="row">
                {
                  showLunch &&
                  lunchProduct.map(product => <LunchProducts
                    key={product.key}
                    lunchProducts={product}>
                  </LunchProducts>)
                }
              </div>
              : <div id="preloder">
                <div className="loader"></div>
              </div>
          }
          <div className="row">
            {
              showBreakfast &&
              breakfastProduct.map(product => <BreakfastProducts
                key={product.key}
                breakfastProducts={product}>
              </BreakfastProducts>)
            }
          </div>
          <div className="row">
            {
              showDinner &&
              dinnerProduct.map(product => <DinnerProducts
                key={product.key}
                dinnerProducts={product}>
              </DinnerProducts>)
            }
          </div>
        </div>
      </div>
      {
        checkOutBtn
      }
      </div>

      
</body>
       
              
  );
};

export default Home;