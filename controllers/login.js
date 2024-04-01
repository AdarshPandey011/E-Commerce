const req = require("express/lib/request");
const { get_data } = require("../services/database/get_data");

const login = function (req, res) {

  console.log(req.body)

  get_data('*', 'users', 'email', req.body.email, (data) => {
    if (data.length == 0) {
      res.render("index", { error: "*User Doesn't Exist" })
    }

    else {


      if (data[0].email === req.body.email) {

        if (data[0].password === req.body.password) {
          if(data[0].email == 'admin@gmail.com'){
            req.session.admin_logged_in = true;
            req.session.user = data[0];
            req.session.adminVerified = true;
            res.render('admin',{user:`${data[0].name}`});
            return;
          }
          if (data[0].isverified) {
            req.session.is_logged_in = true;
            req.session.user = data[0];
            req.session.isVerified = true
            // res.render('home',{user:array[i].name});
            res.redirect('/home');

            return
          }
          else {
            res.render("index", { error: "*Email verification pending..." })
            return;
          }
        }
        else {
          res.render("index", { error: "*wrong password" })
          return
        }

      }

      res.render("index", { error: "*User Doesn't Exist" })
      // res.end("signup first")
    }


  })

}

function get(req,res){
  
  res.redirect('/home');
  
}

module.exports = { login,get };