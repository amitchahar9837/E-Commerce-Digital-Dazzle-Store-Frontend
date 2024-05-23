import React, { useEffect, useState } from 'react'

//desktop sliding images 
import img1Desktop from 'assets/banner/img1.webp';
import img2Desktop from 'assets/banner/img2.webp';
import img3Desktop from 'assets/banner/img3.jpg';
import img4Desktop from 'assets/banner/img4.jpg';
import img5Desktop from 'assets/banner/img5.webp';

//mobile sliding images 
import img1Mobile from 'assets/banner/img1_mobile.jpg'
import img2Mobile from 'assets/banner/img2_mobile.webp'
import img3Mobile from 'assets/banner/img3_mobile.jpg'
import img4Mobile from 'assets/banner/img4_mobile.jpg'
import img5Mobile from 'assets/banner/img5_mobile.png'


//icons
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const SlidingProduct = () => {

    const desktopSlidingImages = [
        img1Desktop,
        img2Desktop,
        img3Desktop,
        img4Desktop,
        img5Desktop
    ];
    const mobileSlidinImages = [
        img1Mobile,
        img2Mobile,
        img3Mobile,
        img4Mobile,
        img5Mobile,
    ]

    const [currentImage,setCurrentImage] = useState(0);

    const nextImage = () =>{
        if(desktopSlidingImages.length -1 > currentImage){
            setCurrentImage(prev =>prev+1);
        }else{
            setCurrentImage(0);
        }
    }

    const prevImage = () =>{
        if(currentImage > 0){
            setCurrentImage(prev =>prev-1);
        }else{
            setCurrentImage(desktopSlidingImages.length-1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopSlidingImages.length - 1 > currentImage){
                nextImage();
            }else{
                setCurrentImage(0);
            }
        },4000)

        return ()=>clearInterval(interval);
    },[currentImage]);
  return (
    <div className='container mx-auto px-4 rounded overflow-hidden py-2'>
        <div className='h-80 w-full bg-slate-200 relative'>

            <div className='absolute z-10 h-full w-full hidden md:flex items-center'>
                <div className='h-full flex justify-between items-center w-full text-2xl'>
                    <button className='h-[50%] bg-slate-200 bg-opacity-50' onClick={prevImage}><FaAngleLeft /></button>
                    <button className='h-[50%] bg-slate-200 bg-opacity-50' onClick={nextImage}><FaAngleRight /></button>
                </div>
            </div>
            
            {/*Desktop Sliding images*/}
            <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                    desktopSlidingImages?.map((imgUrl,index) =>(
                        <div className='w-full h-full min-h-full min-w-full transition-all' key={imgUrl + index} style={{transform:`translateX(-${currentImage * 100}%)`}}>
                            <img src={imgUrl} className='w-full h-full'/>
                        </div>
                    ))
                }
            </div>

            {/* Mobile Sliding Images */}
            <div className='flex md:hidden h-full w-full overflow-hidden'>
                {
                    mobileSlidinImages?.map((imgUrl,index) =>(
                        <div className='w-full h-full min-h-full min-w-full transition-all' key={imgUrl + index} style={{transform:`translateX(-${currentImage * 100}%)`}}>
                            <img src={imgUrl} className='w-full h-full'/>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default SlidingProduct