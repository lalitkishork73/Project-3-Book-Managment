import React from 'react'
import { A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import data from '../data/imgdata';

const Swipertag = () => {

    return (
        <>
            <div className='relative'>
                <Swiper
                    modules={[A11y, Autoplay]}

                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                    }}

                    className="w-[100%] h-[60%]"
                >
                    {
                        data.map((item) => <>
                            <SwiperSlide key={item.id}>
                                <img src={item.img} className='object-cover bg-center w-full h-80'/></SwiperSlide>
                        </>)

                    }
                </Swiper>
            </div>
            <div className="z-10 w-full h-[37%] absolute flex justify-center items-center text-gray-100 top-0">
            <div className="flex flex-col p-5">
              <h1 className="font-bold text-4xl text-center mb-6">
                <span className="text-yellow-500 font-extrabold ">W</span>elcome To Your Library 
              </h1>
              <div className="flex justify-center">
               <p className="text-center">Here you will find your life changing books!</p>
              </div>
            </div>
          </div>

        </>
    )
}

export default Swipertag