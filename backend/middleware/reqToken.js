const jwt = require('jsonwebtoken');


// Middleware to verify Token


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }

  const token = authHeader.split(' ')[1];
  console.log(token)
  try {
    const decoded = jwt.verify(token, "pak");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};



    
module.exports = authenticateToken;
    
    
    
    
// Client interceptors

// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api', 
// });

// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('authToken');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;  
    



    
    
    // const authtoken = async(req,res,next) => {
    //     console.log(req.headers["authorization"]);
    //    try {
    //        if(req.headers["authorization"]){
    //            const token = req.headers["authorization"].split(" ");
    //            console.log(token);
    
    //            const isVerify = jwt.verify(token, "pak");
    //            console.log("isVerify", isVerify);
               
    //            if(!isVerify) return res.redirect("/register")
    
    //            else if(isVerify){
    //             next()
    //            }
    //        }else{
    //            res.json({
    //                message: "UNAUTH"
    //            });
              
    //        }
    //    } catch (error) {
    //        res.json({
    //            message: "UNAUTH"
    //        });
    //     }
    



// const authenticateToken = (req, res, next) => {
//   const token = req.headers["authorization"].split(" ")[1]
//   console.log(token)
//   if(!token){
//            return res.status(401).json("Invaild token");
//       }
//       jwt.verify(token,"pak",async (err, decoded) => {
//           if(err){
//               return res.status(403).json("Token Expired")
//           }
//           next()   
//         });
// };
    
    
    
    
    
    
    
    
    
    
    
    