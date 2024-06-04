const domain = 'https://e-commerce-digital-dazzle-store-backend.onrender.com';

const summaryApi = {
    signup:{
        url:`${domain}/signup`,
        method:'post',
    },
    signin:{
        url:`${domain}/signin`,
        method:'post',
    },
    allUsers:{
        url:`${domain}/allusers`,
        method:'get',
    },
    updateUser:{
        url:`${domain}/updateUser`,
        method:'put',
    },
    uploadProduct:{
        url:`${domain}/uploadProduct`,
        method:'post',
    },
    allProduct:{
        url:`${domain}/allProduct`,
        method:'get',
    },
    productDetail:{
        url:`${domain}/productDetail`,
        method:'post',
    },
    updateProduct:{
        url:`${domain}/updateProduct`,
        method:'put'
    },
    categoryProduct:{
        url : `${domain}/getCategoryProduct`,
        method:'get',
    },
    categoryWiseProduct:{
        url:`${domain}/categoryWiseProduct`,
        method:'post',
    },
    addToCart : {
        url:`${domain}/addToCart`,
        method:'post',
    },
    countItem :{
        url:`${domain}/itemCount`,
        method:'post',
    },
    allCartItem :{
        url:`${domain}/allCartItem`,
        method:'get',
    },
    updateCartItem:{
        url:`${domain}/updateCartItem`,
        method:'put',
    },
    deleteCartItem:{
        url:`${domain}/deleteCartItem`,
        method:'put',
    },
    searchProduct:{
        url:`${domain}/search`,
        method:'get',
    },
    filterProduct:{
        url:`${domain}/filterProduct`,
        method:'post',
    },
    forgotPassword:{
        url:`${domain}/forgot-passsword`,
        method:'post',
    },
    resetPassword:{
        url:`${domain}/reset-password`,
        method:'post',
    },
    totalProduct:{
        url:`${domain}/productCount`,
        method:'get',
    },
    totalUser:{
        url:`${domain}/userCount`,
        method:'get',
    },
    deleteProduct: {
        url:`${domain}/deleteProduct`,
        method:'delete',
    }
}

export default summaryApi