

//example middleware function

let exampleMiddleware = (req,res,next)=>{
//settig user variable in request
    req.user = {'firstName' : 'Setu', 'secondName' : 'Bhardwaj'}
    next();
   

}//exampleMiddleware

module.exports = {
    exampleMiddleware:exampleMiddleware
}