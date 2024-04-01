const { get_data } = require("../services/get_data");
const fs = require("fs");
const cartFun = require('../services/database/cartFun')

const changeQuantity = (req, res) => {
    // let cartData = JSON.parse(get_data("/Users/adarshpandey/Desktop/Node/Assignment10/services/cartData.txt"));
    // let usertData = JSON.parse(get_data("/Users/adarshpandey/Desktop/Node/Assignment10/services/db.txt"));

    let id = req.body.id;
    let user_id = req.session.user.id


    if (req.body.value == 1) {
        const cartFun = require('../services/database/cartFun')

        // console.log(cartData[user_id],id)
        // cartData[user_id][id].quantity = cartData[user_id][id].quantity + 1;
        // fs.writeFileSync("/Users/adarshpandey/Desktop/Node/Assignment10/services/cartData.txt", JSON.stringify(cartData));
        // res.send(JSON.stringify(cartData[user_id][id].quantity));
        // cartFun.getById(user_id, (cart_data) => {
            // for (let i = 0; i < cart_data.length; i++) {
                // if (cart_data[i].productid == id) {
                    // console.log(cart_data[i].quantity)
                    cartFun.increaseQuantity(user_id, id, (err) => {
                        if(err){
                            console.log(err);
                        }
                        else{

                            res.send();
                           // console.log(err);
                            return;
                        }

                    })
                // }
            // }
        // })

    }
    else {
        // if (cartData[user_id][id].quantity > 1) {
        //     cartData[user_id][id].quantity = cartData[user_id][id].quantity - 1;
        //     fs.writeFileSync("/Users/adarshpandey/Desktop/Node/Assignment10/services/cartData.txt", JSON.stringify(cartData));
        // }
        // res.send(JSON.stringify(cartData[user_id][id].quantity));

        cartFun.decreasesQuantity(user_id,id,(dec)=>{
            res.send(dec);
        })
    }
}

function get(req,res){
    res.redirect('/home');
}

module.exports = { changeQuantity,get };
