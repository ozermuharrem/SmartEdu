// son kullanıcı yetkisi olmadığı linke ulaşmak isterse ana sayfara redirct edeceğiz 

module.exports = (req, res, next) => {
   if(req.session.userID){
        return res.redirect('/');
    }
    next();
}