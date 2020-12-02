import React from 'react';
import './LunchProducts.css'
import { Link } from 'react-router-dom';

const LunchProducts = (props) => {
    const { key, name, price, short_dsc, img, category } = props.lunchProducts;
    return (
        <div className="col-md-4">
            <Link to={"/product/" + key}>
                <div className="ProductContent">
                    <div className="ProductImg">
                        <img src={img} alt="" />
                    </div>
                    <div className="ProductText">
                        <h4 className="title">{name}</h4>
                        <p style={{ marginBottom: '5px' }}>{short_dsc}</p>
                        <p style={{ textTransform: 'capitalize' }}>Category: {category}</p>
                        <h6>&#36; {price}</h6>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default LunchProducts;