import React from 'react';
import "./ShopDetails.css"
import homeDeliveryImg from '../../Image/architecture-building-city-2047397.png'
import fastDeliveryImg from '../../Image/adult-blur-blurred-background-687824.png'
import autoResponderImg from '../../Image/chef-cook-food-33614.png'
import { faTruck, faBell, faLuggageCart } from '@fortawesome/free-solid-svg-icons'
import SinglePost from '../SinglePost/SinglePost';

const ShopDetails = () => {
        const fakePost = [
            { id: 1, title: "Fast Delivery", img: fastDeliveryImg, icon: faTruck},
            { id: 2, title: "A Good Auto Responder", img: autoResponderImg, icon:faBell },
            { id: 3, title: "Home Delivery", img: homeDeliveryImg, icon:faLuggageCart },
        ]
        
        return (
            <div className="container whyChooseUs mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="ContentTop">
                            <h2>Why Choose Us</h2>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis laboriosam repellat perferendis corrupti numquam neque, vitae nemo.</p>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
                <div className="row">
                    {
                        fakePost.map(ShopDetails => <SinglePost key={ShopDetails.id} feature={ShopDetails }></SinglePost>)
                    }
                </div>
            </div>
    );
};

export default ShopDetails;