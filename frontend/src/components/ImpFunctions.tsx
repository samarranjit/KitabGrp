import axiosInstance from "../axios/axiosInstance";

export const uploadImage = async (imageFile:File, Folder: string) => {
    console.log("I am inside the upload Image function")
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append("Folder",Folder)
    console.log("image File:",formData)
    const res = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/sendImage`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    if (res.data.success) {
        console.log("Success inside upload image function")
        return res.data.data.secure_url;
    }
    throw new Error('Image upload failed');

    
};


export const deleteImage = async (imageUrls:string)=>{
    const response = await axiosInstance.post(`${import.meta.env.VITE_API_BASE_URL}/user/deleteImage`, {imageUrls});

    return (response);

}
