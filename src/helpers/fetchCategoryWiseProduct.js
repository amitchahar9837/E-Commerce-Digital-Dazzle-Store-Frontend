const { default: summaryApi } = require("common")

const fetchCategoryWiseProduct = async(category) =>{
    const fetchApi = await fetch(summaryApi.categoryWiseProduct.url,{
        method:summaryApi.categoryWiseProduct.method,
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({category})
    })

    const dataResponse = await fetchApi.json();

    return dataResponse;
}

export default fetchCategoryWiseProduct;