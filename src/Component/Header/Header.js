import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo2 from "../../logo2.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { getDatabaseCart } from '../../utilities/databaseManager';
import { handleSignOut } from '../Login/LoginManager';
import { UserContext } from '../../App';
const Header = (props)=> {

const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();

  const handleLoggingButton = () => {
    if (loggedInUser.name || loggedInUser.email) {
      handleSignOut();
      setLoggedInUser({});
      history.push("/");
    } else {
      history.push("/login");
    }
  };
      
    let { cartAmount } = props;
    if (cartAmount === 0) {
        const cart = getDatabaseCart();
        cartAmount = Object.keys(cart).length;
    }

    let cart = '';
    if (cartAmount > 0 && loggedInUser.name) {
        cart = <Link to="/shipment"><span className="CartIconActive"><FontAwesomeIcon icon={faShoppingCart} /> (<span className="cartLength">{cartAmount}</span>)</span></Link>
    }
    else if (cartAmount > 0) {
        cart = <Link to="/shipment"><span className="CartIconActive"><FontAwesomeIcon icon={faShoppingCart} /> (<span className="cartLength">{cartAmount}</span>)</span></Link>
    }
    else {
        cart = <span onClick={() => alert("Cart is empty yet. Keep Shopping")}  className="CartIcon"><FontAwesomeIcon icon={faShoppingCart} /> (<span className="cartLength">{cartAmount}</span>)</span>
        
    }
    return (
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light ">
          <img style={{ height: "30px" }} src={logo2} alt="" />
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul class="navbar-nav">
              <li class="nav-item active">
                <Link to="/" class="nav-link" href="#">
                    Home <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li style={{ color: "red", marginTop: "7px", fontSize: "20px" }}>
                    {cart}
              </li>
              <li class="nav-item">
                <Link class="nav-link" href="#">
                    <h4 className='text-dark'>{loggedInUser.name}</h4>
                </Link>
              </li>
              <li class="nav-item">
                  {/* <Link className="nav-link" to="/login"> */}
                  <button onClick={handleLoggingButton} className="btn btn-danger">
                    {loggedInUser.name || loggedInUser.email
                      ? "Logout"
                      : "Login"}
                  </button>
                  {/* </Link> */}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
};

export default Header;
