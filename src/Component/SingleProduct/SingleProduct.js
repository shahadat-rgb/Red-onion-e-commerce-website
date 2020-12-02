import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import './SingleProduct.css'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const SingleProduct = (props) => {
    const {setCartAmount} = props;
    const { productKey } = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch('https://fathomless-ridge-69474.herokuapp.com/food/' + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, [productKey]);

    const [quantity, setQuantity] = useState(1);
    const [btn, setBtn] = useState(true);
    const [successMsg, setSuceessMsg] = useState(null);

    const hanldeCart = (cartProduct) => {
        addToDatabaseCart(cartProduct.key, quantity);
        // Set the Cart Amount in Navbar
        const cart = getDatabaseCart();
        const cartAmount = Object.keys(cart).length;
        setCartAmount(cartAmount);
        
        setBtn(false)
        setSuceessMsg("Product Successfully added to Your Cart");
        setTimeout(() => {
            setSuceessMsg(null);
        }, 2000)
    }

    const handlePlusIcon = () => {
        const ProductQuantity = quantity + 1;
        setQuantity(ProductQuantity);
    }
    const handleMinusIcon = () => {
        if (quantity >= 2) {
            const ProductQuantity = quantity - 1;
            setQuantity(ProductQuantity);
        }
    }
    return (
        <div className="container">
            <div className="ProductSection">
                <div className=" row ProductContents">
                    <div className="ProductTexts col-md-6">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        {
                            product.quantity ?
                                <div>
                                    <div className="ProductPrice d-flex align-items-center mt-3">
                                        <h4>&#36; <span id="price">{quantity > 0 ? (product.price * quantity).toFixed(2) : product.price}</span></h4>
                                        <div className="ProductQuantity d-flex">
                                            <button onClick={handleMinusIcon}>-</button>
                                            <span id="quantity">{quantity}</span>
                                            <button onClick={handlePlusIcon}>+</button>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <div className="BottomLeft">
                                            {
                                                btn ? <button onClick={() => hanldeCart(product)} className="CartBtn"><FontAwesomeIcon icon={faShoppingCart} /><span>Add</span></button> : <Link to="/"><button className="CartBtn"><span>Shop More</span><FontAwesomeIcon icon={faAngleDoubleRight} /></button></Link>
                                            }
                                        </div>
                                        <div className="BottomRight pt-4 ml-4">
                                            {
                                                successMsg && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>{successMsg}</p>
                                            }
                                        </div>
                                    </div>

                                   <div className="row">
                                   <div className="simpleFoodImg col-md-6">
                                        <img src={product.img} alt="" />
                                    </div>

                                    <div className="simpleFoodImg col-md-6">
                                       <img src={product.img} alt="" />
                                    </div>
                                   </div>

                                </div>
                                : <div id="preloder">
                                    <div className="loader"></div>
                                </div>
                        }
                    </div>
                    <div className="ProductImage col-md-6">
                        <img src={product.img} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;