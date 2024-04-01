const { get_data } = require("../services/database/get_data");
const { set_data } = require("../services/database/set_data");
const { client } = require('../services/databaseClient');
const cartFun = require('../services/database/cartFun')

const addToCart = (req, res) => {
    let productid = req.body.id;
    let user = req.session.user;
    cartFun.getById(user.id, (data) => {

        for (let i = 0; i < data.length; i++) {
            if (data[i].productid == productid) {
                cartFun.delById(user.id,productid);
                res.end();
                return;
            }
        }

        cartFun.newEntry(`${user.id},${productid},1`,(err)=>{
            res.end();
        })


    })
    // client.query(`select * from cart where id=${user.id} and productid=${id}`, (err, data) => {
    //     console.log(err);
    //     if (data.rows.length == 0) {
    //         console.log('saf', user)
    //         set_data('id,productid,quantity', 'cart', `${user.id},${id},${1}`, (e, d) => {

    //             console.log(e, 'dsa')
    //             res.end();

    //         })

    //     }
    //     else {
    //         client.query(`delete from cart where id=${user.id} and productid=${id}`,(e,d)=>{
    //             console.log()
    //             res.end()

    //         })

    //     }
    // })



}

function get(req,res){
    res.redirect('/home');
}

module.exports = { addToCart,get }