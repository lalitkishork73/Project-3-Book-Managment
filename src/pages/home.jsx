import React, { useContext } from 'react'
import Swipertag from '../components/swiper'
import Homecontent from '../components/homecontent';
import { AppContext } from '../context';


const Home = () => {
  const name = useContext(AppContext)
  return (
    <>
      <Swipertag />
      <p>{name}</p>
      <Homecontent />

    </>
  )
}

export default Home