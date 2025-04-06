
import React from 'react';

const Hero = ({ title, imageUrl }) => {
    return ( 
        <div className='hero container' >
            <div className="banner">
                <h1>{title}</h1>
                <p>
                Life Care is a state-of-the-art healthcare facility dedicated to delivering comprehensive services with compassion and expertise. Our team of highly skilled professionals provides personalized care tailored to each patient’s unique needs. At Life Care, your well-being is our highest priority, ensuring a seamless journey toward optimal health and overall wellness
                </p>
            </div>
            <div className="banner">
                <img src={imageUrl} alt="Hero" className='animated-image'/>
                <span>
                    <img src="/Vector.png" alt="Vector" />
                </span>
            </div>
        </div>
    );
}

export default Hero;
