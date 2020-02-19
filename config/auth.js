module.exports = {
    ensureAuthenticated: function(req,res,next) {
            if(req.isAuthenticated()) {
                return next()
            }
            req.flash('error_msg', "plase log in")
            res.redirect('/users/login')
    }   
}