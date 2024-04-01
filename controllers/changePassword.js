const changePassword = (req, res) => {
    // res.render("changePassword");

    if (req.session.isVerified || req.session.adminVerified ) {
        res.render("changePassword");
    }
    else {
        res.redirect('/')
    }

}

const post = (req, res) => {
    const { get_data } = require("../services/database/get_data");
    const { modify } = require("../services/database/modify");
    get_data('*', 'users', 'email', req.session.user.email, (data) => {
        // console.log(data,req.session.user,req.body);
        if (data[0].id == req.session.user.id) {
            //data[0].password = req.body.password;
            modify('users', 'password', `${req.body.password}`, 'id', req.session.user.id, () => {

                res.redirect('/home');
            });
        }
    })

}
module.exports = { changePassword, post }