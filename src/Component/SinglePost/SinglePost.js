import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import "./SinglePost.css"

const SinglePost = (props) => {
    const {title, img ,icon } = props.feature;

    const [showSeeLessBtn, setShowSeeLessBtn] = useState(false);
    const [moreText, setMoreText] = useState(null);

    const handleSeeMore = () => {
        setMoreText(" Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque sunm ipsum dolor sit amet");
        setShowSeeLessBtn(true);
    }
    const handleSeeLess = () => {
        setMoreText(null);
        setShowSeeLessBtn(false);
    }

    return (
        <div className="col-md-4">
        <div className="PostContent">
            <img src={img} alt="" className="img-fluid" />
            <div className="row mt-4">
                <div className="col-md-2 mt-3">
                    <span className="HeaderIcon"><FontAwesomeIcon icon={icon} /></span>
                </div>
                <div className="col-md-10">
                    <h2>{title}</h2>

                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat suscipit beatae quam et inventore eum {moreText && moreText}</p>

                    {
                        showSeeLessBtn ?
                        <button onClick={handleSeeLess}>See Less <span className="btnIcon"><FontAwesomeIcon icon={faArrowLeft} /></span></button>
                        :
                        <button onClick={handleSeeMore}>See More <span className="btnIcon"><FontAwesomeIcon icon={faArrowRight} /></span></button>
                    }
                </div>
            </div>
        </div>
    </div>
    );
};

export default SinglePost;