const {client} = require('../databaseClient')

function addProduct(product,filename){

    client
    .query(`insert into products(img,productname,price,description,stock,disabled) values
    ('${filename}','${product.productname}',${product.price},'${product.description}',${product.quantity},
    false
    )`,(err,data)=>{
        console.log(err)
    })
}



function editProduct(product,filename,callback){
    let resp;
    if(filename==null){
         resp = {
            text : `update products set productname='${product.productname}',price=${product.price},stock=${product.quantity},
            description='${product.description}' where productid=${product.productid}`
        }
    }
    else{

         resp = {
            text : `update products set productname='${product.productname}',price=${product.price},stock=${product.quantity},
            description='${product.description}',img='${filename}' where productid=${product.productid}`
        }

    }
    client
    .query(resp,(err)=>{
        callback();
    })


}



module.exports = {addProduct,editProduct};