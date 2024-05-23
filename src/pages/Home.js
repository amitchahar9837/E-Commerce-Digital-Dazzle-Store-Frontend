import CategoryList from 'components/CategoryList'
import HorizontalCategoryProduct from 'components/HorizontalCategoryProduct'
import SlidingProduct from 'components/SlidingProduct'
import VerticalCategoryProduct from 'components/VerticalCategoryProduct'
import React, { useEffect } from 'react'

const Home = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  return (
    <div>
      <CategoryList/>
      <SlidingProduct/>
      <HorizontalCategoryProduct category={'airpods'} heading={'Top Airpods'}/>
      <HorizontalCategoryProduct category={'watches'} heading={'Popular Watches'}/>
      <VerticalCategoryProduct category={'mobile'} heading={'Best Quality Mobiles'} />
      <VerticalCategoryProduct category={'mouse'} heading={'Best Mouse'} />
      <VerticalCategoryProduct category={'camera'} heading={'High Quality Camera'} />
      <VerticalCategoryProduct category={'trimmers'} heading={'Trimmers'} />
      <VerticalCategoryProduct category={'earphones'} heading={'Popular Earphones'} />
      <VerticalCategoryProduct category={'printers'} heading={'Top Printers'} />
      <VerticalCategoryProduct category={'processor'} heading={'High Quality Processors'} />
      <VerticalCategoryProduct category={'refrigerator'} heading={'Best Refrigerators'} />
      <VerticalCategoryProduct category={'speakers'} heading={'Best Sound Speakers'} />
      <VerticalCategoryProduct category={'television'} heading={'High Picture Quality Televisions'} />
    </div>
  )
}

export default Home