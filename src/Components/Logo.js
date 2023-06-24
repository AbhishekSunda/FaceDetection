import React from 'react';
import Tilt from 'react-parallax-tilt';
import ParticlesBg from 'particles-bg'
import faceImage from './user-images.png'


const Logo = (props) => {
    return <div className='logo-container'>
        <Tilt className='logo'>
            <div >
                <ParticlesBg color="#e7eff9" type="circle" bg={true} />
                <img src={faceImage} width={100} height={"auto"}></img>
            </div>
        </Tilt>
        <div className='image-info'>Total Faces in current Image:- {props.totalFaces}</div>

    </div>

}

export default Logo;