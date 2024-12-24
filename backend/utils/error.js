
//this is a utility function to create and return a custom error object
export const errorHandler =(statusCode,message)=>{
    const error = new Error(); 
    error.statusCode =statusCode; 
    error.message =message;
    return error;
}