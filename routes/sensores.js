module.exports = function(app) {
    var sensores = app.controllers.sensores;
    var autenticar = require('../middleware/autenticar');

    app.route('/usuarios/user/:id_user/sensores').get(autenticar, sensores.index);
    
    app.route('/usuarios/user/:id_user/sensores/adicionar')
        .get(autenticar, sensores.adicionar)
        .post(autenticar, sensores.post);

    app.route('/usuarios/user/:id_user/sensores/sensor/:id_sensor').get(autenticar, sensores.sensor);

    app.route('/usuarios/user/:id_user/sensores/editar/:id_sensor')
        .get(autenticar, sensores.editar)
        .post(autenticar, sensores.update);

    app.route('/usuarios/user/:id_user/sensores/delete/:id_sensor').post(autenticar, sensores.delete);

    app.route('/usuarios/user/:id_user/sensores/sensor/:id_sensor/grafico').get(autenticar, sensores.grafico);

}