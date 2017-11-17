module.exports = function(app) {
    var Usuario = app.models.usuarios;

    HomeController = {
        index: function(req, res) {
            res.render('home/index');
        },
        login: function(req, res) {
            res.render('login/index');
        },
        autenticacao: function(req, res){
            var usuario = new Usuario();
            var user = req.body.user;
            var senha = req.body.senha;
            Usuario.findOne({'user': user}, function(err, data){
                if (err){
                    req.flash('erro','Ops, ocorreu um erro ao entrar no sistema!');
                    res.redirect('/');
                }else if (!data){
                    req.flash('erro','Nome de usuário não encontrado, tente outro!');
                    res.redirect('/');
                }else if (!usuario.validPassword(senha, data.senha)){
                    req.flash('erro','Senha incorreta!');
                    res.render('login/index',{user:req.body});
                }else{
                    req.session.usuario = data;
                    res.redirect('/home');
                }
            });
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect("/");
        }
    }
    return HomeController;
}