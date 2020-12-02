import React from 'react';
import './CartProducts.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const CartProducts = (props) => {
    const {key, name, quantity, img, price} = props.cartProduct;

    return (
        <div className="CartSection">
            <div className="CartFoods d-flex justify-content-between align-items-center">
                <div className="CartContent d-flex justify-content-start">
                    <div className="CartImg">
                        <img src={img} alt=""/>
                    </div>
                    <div className="CartText">
                        <h4>{name}</h4>
                        <h6>&#36; {price}</h6>
                        <p>Quantity: {quantity}</p>
                    </div>
                </div>
                <div className="RemoveCartBtn d-flex align-items-center">
                    <button onClick={() => props.handleRemoveCart(key)}><FontAwesomeIcon style={{ color: '#F91944' }} icon={faTimes} /></button>
                </div>
            </div>
        </div>
    );
};

export default CartProducts;