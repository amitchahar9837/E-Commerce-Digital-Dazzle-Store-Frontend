import summaryApi from "common";

const fetchUserCartItem = async() =>{
    const request = await fetch(summaryApi.countItem.url,{
      method:summaryApi.countItem.method,
      headers:{
        'Authorization': "Bearer "+localStorage.getItem('token'),
      }
    })

    const response = await request.json();
    return response;
}
export default fetchUserCartItem;