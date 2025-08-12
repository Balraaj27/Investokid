// common request for get
import axios from "axios";
const hostname = window.location.hostname;
const baseURL =
  hostname == "localhost"
    ? "http://localhost/api/v1"
    : hostname == "devadmin.skart-express.com"
    ? "https://devapiv2.skart-express.com/api/v1"
    : "https://apiv2.skart-express.com/api/v1";
export const commongetrequest=async(endpoint?:string,params?:any)=>{
    if(params){
  try {
    const response = await axios.get(baseURL + `/${endpoint}`,params);
    return response;
  } catch (err: any) {
   if (err?.response?.status == 401 && endpoint !== "auth/verify/1") {
     window.location.href = "/";
   }
   return err;
  }
    }else{
      try {
        const response = await axios.get(baseURL + `/${endpoint}`);
        return response;
      } catch (err: any) {
         if (err?.response?.status == 401 && endpoint !== "auth/verify/1") {
           window.location.href = "/";
         }
         return err;
      }
    }
    
  }
  export const commonputrequest=async(endpoint?:string,obj?:any)=>{
    try{
  const response=await axios.put(baseURL+`/${endpoint}`,obj)
  return response
    }catch(err:any){
     if (err?.response?.status == 401 && endpoint !== "auth/verify/1") {
       window.location.href = "/";
     }
     return err
    }
  }
  export const commonpatchrequest = async (endpoint?: string, obj?: any) => {
    if(obj){
    try {
      const response = await axios.patch(baseURL + `/${endpoint}`, obj);
      return response;
    } catch (err: any) {
      if (err?.response?.status == 401 && endpoint !== "auth/verify/1") {
        window.location.href = "/";
      }
      return err;
    }
    }else{
        try {
          const response = await axios.patch(baseURL + `/${endpoint}`);
          return response;
        } catch (err: any) {
          if (err?.response?.status == 401 && endpoint !== "/auth/verify/1") {
            window.location.href = "/";
          }
          return err;
        }
    }
  
  };
  
  
  export const universalpost=async(port:number=4000,endpoint?:string,data?:any)=>{
    // console.log(data,"data")
    try {
      const response = await axios.post(
        `http://localhost:${port}/${endpoint}`,data
      );
      return response;
    } catch (err: any) {
      return err;
    }  
  }
  export const universalget = async (
    port: number=4000,
    endpoint?: string,
    params?:any
  
  ) => {
    // console.log(data,"data")
    try {
      const response = await axios.get(
        `http://localhost:${port}/${endpoint}`,params?params:"");
      return response;
    } catch (err: any) {
      return err;
    }
  };
  export const universalpatch = async (
    port: number=4000,
    endpoint?: string,
    data?: any
  ) => {
    // console.log(data,"data")
    try {
      const response = await axios.patch(
        `http://localhost:${port}/${endpoint}`,
        data
      );
      return response;
    } catch (err: any) {
      return err;
    }
  };
  export const universalput = async (
    port:number=4000,
    endpoint?: string,
    data?: any
  ) => {
    // console.log(data,"data")
    try {
      const response = await axios.put(
        `http://localhost:${port}/${endpoint}`,
        data
      );
      return response;
    } catch (err: any) {
      return err;
    }
  };
  export const universaldelete = async (
    id?:any,
    port:number=400,
    endpoint?: string,
    data?: any
  ) => {
    // console.log(data,"data")
    try {
      const response = await axios.delete(
        `http://localhost:${port}/${endpoint}${id?`/${id}`:""}`,
        data
      );
      return response;
    } catch (err: any) {
      return err;
    }
  };