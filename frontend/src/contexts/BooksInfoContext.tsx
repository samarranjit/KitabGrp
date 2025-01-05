import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axiosInstance";

export interface Reviewer {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  bio: string;
  birthDate: string;
  followers: string;
  __v: string;
}

export interface BookInfo {
  _id:string,
    title: string;
    author: string;
    review: string;
    genre: string[];
    coverImage?: string;
    publishedDate?: string;
    reviewerName: Reviewer;
    createdAt?: string;
    updatedAt?: string;
  }

  interface BooksInfoContextType {
    bookInfo: BookInfo[] | null;
    setBookInfo: React.Dispatch<React.SetStateAction<BookInfo[] | null>>;
  }

const BooksInfoContext = createContext<BooksInfoContextType | null >(null);


export const BookInfoProvider = ({children} : { children: React.ReactNode })=>{

    const [bookInfo, setBookInfo] = useState<BookInfo[] | null>(null);

    useEffect(() => {
      const getBookInfo = async()=>{
        const response = await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}/user/book/getBookInfo`);

        if(response.status === 200){
            setBookInfo(response.data);
        }
        else{
          console.log(response.data.message)
        }
      }

      getBookInfo();
    
    }, [])
    

    return(
        <BooksInfoContext.Provider value={{bookInfo, setBookInfo}}>
            {children}
        </BooksInfoContext.Provider>
    )
}

export const BooksContext= ()=>{
    const context = useContext(BooksInfoContext);

    if(!context){
        throw new Error("Error while using context")
    }

    return context;

}