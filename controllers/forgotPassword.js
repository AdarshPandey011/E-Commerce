const { send } = require("express/lib/response");
const { get_data } = require("../services/database/get_data");

const {send_mail} = require("../services/send_mail")
const forgotPassword = (req,res)=>{
  
    if(req.session.is_logged_in || req.session.admin_logged_in){
        res.redirect('/home');
        return
    }
    res.render("forgotPassword.ejs",{error:null});
}

const post = (req,res)=>{
    
    get_data('*', 'users', 'email', req.body.email, (data) => {

        if(data[0].email === req.body.email){
        //    req.session.isVerified = true;
           req.session.user = data[0];
           let html = `<a href=http://localhost:3002/verify/${data[0].id}/changePassword>click here to verify</a>`;
           send_mail(data[0],data[0].id,html)
           res.render('forgotPassword', {error:"*verification email sent"});
           return
        } else {
            res.render("forgotPassword",{error:"*Email Doesn't exist"});
            return
          //  res.redirect('/');
            res.end()
        }
    

    })
    

}

module.exports = {forgotPassword,post}