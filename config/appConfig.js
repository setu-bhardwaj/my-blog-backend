
let appConfig = {};
appConfig.port = 3000;
appConfig.allowedCrossOrigin = "*" //all domains are allowed, else put a site then only this site is allowed to access this application
appConfig.env = "dev";
appConfig.db = {
    uri : 'mongodb://@127.0.0.1:27017/blogAppDB'
   // test:test
}
appConfig.apiVersion = '/api/v1';

//for including in application and using require statement.
module.exports={
   port : appConfig.port,
   allowedCrossOrigin : appConfig.allowedCrossOrigin,
   env : appConfig.env,
   db : appConfig.db,
   apiVersion :appConfig.apiVersion
}//end module exports