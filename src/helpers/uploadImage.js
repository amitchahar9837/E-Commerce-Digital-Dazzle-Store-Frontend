const CLOUD_NAME = 'ascoder';
const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
const uploadImage = async (image) =>{
    const formData = new FormData();
    formData.append("file",image)
    formData.append("upload_preset","MERN E-Commerce Products")
    const dataresponse = await fetch(url,{
        method : 'post',
        body:formData,
    });

    return dataresponse.json();
}

export default uploadImage;