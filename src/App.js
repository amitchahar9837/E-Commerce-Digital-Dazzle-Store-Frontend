import Footer from "components/Footer";
import Header from "components/Header";
import fetchUserCartItem from "helpers/fetchUserCartItemCount";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCartItem } from "store/slices/userCartItemCount";

export default function App() {

  const dispatch = useDispatch();

  const cartItemCount = async () =>{
    const fetchCartItemCount = await fetchUserCartItem();
    if(!fetchCartItemCount.err){
      dispatch(setCartItem(fetchCartItemCount.data));
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      cartItemCount();
    }
  })
  return (
    <>
      <Header />
      <main className="h-full min-h-[calc(100vh-90px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}