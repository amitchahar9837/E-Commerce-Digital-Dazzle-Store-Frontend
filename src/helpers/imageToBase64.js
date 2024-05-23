const imageToBase64 = async(image) =>{
    const Reader = new FileReader();
    Reader.readAsDataURL(image);

    const data = await new Promise((res,rej) =>{
        Reader.onload =() => res(Reader.result);

        Reader.onerror = (error) =>rej(error);
    })

    return data;
}

export default imageToBase64;

