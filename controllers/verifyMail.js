// const {get_data} = require("../services/get_data")
// const {set_data} = require("../services/set_data")

const { get_data } = require("../services/database/get_data")
const { set_data } = require("../services/database/set_data")
const { client } = require('../services/databaseClient');

const verifyMail = (req, res) => {

    const { token } = req.params;
    let user = get_data('*', 'users', 'id', `${token}`, (data) => {
        const redirectPage = req.params.redirectPage;
        if (data[0].id == token) {
            data[0].isVerified = true;

            client.query(`update users set isverified = true where id=${token}`, (err, data) => {
                req.session.is_logged_in = true;
                req.session.isVerified = true;
                // res.redirect("/home");
                if (redirectPage) {
                    req.session.is_logged_in = false;
                    res.redirect('/' + redirectPage);
    
                } else {
                    // req.session.isVerified = true;
    
                    res.redirect('/home');
                }
            })
        }
    })





}


module.exports = { verifyMail };