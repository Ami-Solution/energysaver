module.exports =function(app){
    var usuarios = app.controllers.usuarios;
    var autenticar = require('../middleware/autenticar');

    app.route('/usuarios').get(autenticar, usuarios.index);

    app.route('/cadastrar')
        .get(usuarios.cadastrar)
        .post(usuarios.post);
    
    app.route('/usuarios/user/:id').get(autenticar, usuarios.user);

    app.route('/usuarios/delete/:id').post(autenticar, usuarios.delete);

    app.route('/usuarios/editar/:id')
        .get(autenticar, usuarios.edit)  
        .post(autenticar, usuarios.update);

}
