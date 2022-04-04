import React from 'react'
import img1 from './images/iph/1_iphone13blue_portrait.png'
import img2 from './images/iph/2_iphone13blue_portrait.png'
import img3 from './images/iph/3_iphone13blue_portrait.png'
import img4 from './images/iph/4_iphone13blue_portrait.png'
import iphone from './images/background-some.png'
import { useState, useEffect } from 'react'
const Iphone = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const img = [img1, img2, img3, img4]
  
useEffect(() => {
  const imgInterval = setInterval(() => {
    if(currentImg === img.length - 1) {
      setCurrentImg(0);
    } 
    else {
      setCurrentImg(currentImg + 1);
    }
}, 2000)
  return () => clearInterval(imgInterval);
}, [])

  return (
    <figcaption className='home-img-container'>

      <img id="top-img" src={img[currentImg]}/>
      </figcaption>
  )
}

export default Iphone