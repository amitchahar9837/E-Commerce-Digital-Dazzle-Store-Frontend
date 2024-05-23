import summaryApi from "common";
import { toast } from "react-toastify";

const addToCart = async (e,id) =>{
    e.preventDefault();

    const Request = await fetch(summaryApi.addToCart.url,{
        method:summaryApi.addToCart.method,
        headers:{
            "Content-Type":'application/json',
            "Authorization" : "Bearer "+localStorage.getItem('token')
        },
        body:JSON.stringify({
            productId:id,
        })
    })

    const Response = await Request.json();
    if(Response.msg){
        toast.success(Response.msg)
    }else{
        toast.error(Response.err);
    }
}

export default addToCart;