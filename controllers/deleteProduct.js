const {client} = require('../services/databaseClient')

function deleteProduct(req,res){
    client.query(`update products set disabled=true where productid = ${req.body.data}`,(err,data)=>{
        console.log(err);
    });
}

function get(req,res){
    res.redirect('/home');
}

module.exports = {deleteProduct,get}