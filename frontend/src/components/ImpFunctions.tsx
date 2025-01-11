import axiosInstance from "../axios/axiosInstance";

const uploadImage = async (imageFile:File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    console.log("image File:",formData)
    const res = await axiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/sendImage`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    if (res.data.success) {
        return res.data.data.secure_url;
    }
    throw new Error('Image upload failed');

    
};

// export const deleteImage = async(imageFile: File){
    
// }



export default uploadImage;