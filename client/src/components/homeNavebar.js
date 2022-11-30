import React from 'react'
import { NavLink } from 'react-router-dom';
import { SiBookstack } from 'react-icons/si';
import { Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Keyboard, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

const Homenavebar = () => {
  return (
    <>
      <div className='bg-black text-white flex justify-between'>
        <div className='ml-9 p-2'>
          <h1 >Book's Lab</h1>
        </div>
        <div className='p-2 scale-110'>
          <SiBookstack className='text-yellow-400' />
        </div>
        <div className='mr-9'>
          <ul className='flex p-2'>
            <li className='mr-9'>
              <NavLink to="login"><h1>LogIn</h1></NavLink>
            </li>
            <li>
              <NavLink to="signup"><h1>SignUp</h1></NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className=''>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow, Keyboard, Autoplay]}


          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          slidesPerView={"auto"}
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          keyboard={{
            enabled: true,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className="w-[100%] max-w-screen-xl"
        >
           < SwiperSlide ></SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}


export default Homenavebar;