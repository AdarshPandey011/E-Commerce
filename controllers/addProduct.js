
const multer = require('multer');
const upload = multer({dest:'uploads'})
const Product = require('../services/database/addProduct');
const post = (req,res)=>{
   if(req.file==undefined){
        Product.addProduct(req.body,null);

   }
   else{
   Product.addProduct(req.body,req.file.filename);
   }
    res.redirect('/home');
}

// post('/addProduct',upload.single('file'),(req,res)=>{
//     console.log(req.file.path);
//     //res.end('file success');
//     writeFile(req.file.path,function(){
//         res.send('success')
//     }) 

//     readFile(function(data){
//         temp = data;
//     })
// })

// function addProduct(req,res){
//     const upload = multer({dest:'uploads/'});

   

//     console.log(req.body);

// }

module.exports = {post}