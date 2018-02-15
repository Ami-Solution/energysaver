module.exports = function(app) {
    var configs = require('../configs/configs');

    var Sensores = app.models.sensores;
    var Usuarios = app.models.usuarios;
    var Dados = app.models.dados;

    var SensoresController = {
        index: function(req, res){
            var id_user = req.params.id_user;
            Usuarios.findOne({'_id':id_user},function(err, data){
                Sensores.find({'user': data.user}, function(err, sensores){
                    if (err) {
                        req.flash('erro','Erro ao buscar sensor: '+err);
                        res.redirect('/usuarios/user/'+req.params.id_user);
                    }else {
                        res.render('sensores/index',{sensor: sensores});  
                    }
                });
            });
        },
        adicionar: function(req, res){
            res.render('sensores/adicionar',{sensor: new Sensores()});
        },
        post: function(req,res){
            Sensores.findOne({'name_sensor':req.body.name_sensor, 'user':req.body.user}, function(err, sensor){
                if(err){
                    req.flash('erro','Erro ao buscar sensor: '+err);
                    res.render('sensores/adicionar', {sensor: req.body});
                }else if (sensor){
                    req.flash('erro','Este sensor já se encontra no banco de dados, tente outro.')
                    res.render('sensores/adicionar', {sensor: req.body});
                }else{
                    model = new Sensores(req.body);
                    model.save(function(err){
                        if (err){
                            req.flash('erro','Erro ao adicionar sensor');
                            res.render('sensores/adicionar', {sensor: req.body});
                        }else{
                            req.flash('info','Sensor adicionado com sucesso!');
                            res.redirect('/usuarios/user/'+req.params.id_user+'/sensores');
                        }
                    });
                }
            });
            
        },
        delete: function(req, res) {
            Sensores.remove({_id:req.params.id_sensor}, function(err, sensor){
                if (err){
                    req.flash('erro','Erro ao excluir sensor: '+err);
                    res.redirect('/usuarios/user/'+req.params.id_user+'/sensores/');
                } else{
                    req.flash('info','Sensor excluído!');
                    res.redirect('/usuarios/user/'+req.params.id_user+'/sensores/'); 
                }
            });
        },
        editar: function(req, res) {
            Sensores.findOne({_id: req.params.id_sensor}, function(err, sensor){
                if (err){
                    req.flash('erro', 'Erro ao buscar sensor: '+err);
                    res.redirect('/usuarios/user/'+req.params.id_user+'/sensores');
                }else {
                    res.render('sensores/editar', {sensor: sensor});
                }
            });
        },
        update: function(req, res){
            Sensores.findById({_id: req.params.id_sensor}, function(err, sensor){
                if (err){
                    req.flash('erro', 'Erro ao buscar sensor: '+err);
                    res.redirect('/usuarios/user/'+req.params.id_user+'/sensores');
                }else{
                    Sensores.findOne(req.body, function(err, data){
                        if (err){
                            req.flash('erro', 'Erro ao buscar sensor: '+err);
                            res.redirect('/usuarios/user/'+req.params.id_user+'/sensores');
                        }else if (data){
                            req.flash('erro','Este sensor já existe na sua lista, tente outro nome!');
                            res.render('sensores/editar',{sensor:req.body});
                        }else {
                            var model = sensor;
                            model.name_sensor = req.body.name_sensor;
                            model.type_sensor = req.body.type_sensor;
                            model.model_sensor = req.body.model_sensor;
                            model.device = req.body.device;
                            model.local = req.body.local;
                            model.save(function(err){
                                if (err){
                                    req.flash('erro', 'Erro ao atualizar dados do sensor!');
                                    res.render('sensores/editar', {sensor:data});
                                }else {
                                    req.flash('info', 'Dados do sensor atualizados!');
                                    res.redirect('/usuarios/user/'+req.params.id_user+'/sensores');
                                }
                            });
                        }
                    });
                }
            });
        },
        sensor: function(req, res){
            Sensores.findOne({'_id': req.params.id_sensor}, function(err, sensor){
                if (err){
                    req.flash('erro', 'Erro ao buscar sensor: '+err);
                    res.redirect('/usuarios/user/'+req.params.id_user+'/sensores');
                }else {
                    nome = sensor.name_sensor;
                    user = sensor.user;
                    modelo = sensor.model_sensor;
                    tipo = sensor.type_sensor;
                    local = sensor.local;
                    device = sensor.device;

                    var query = {'name_sensor':nome,'user':user,'type_sensor':tipo, 'model_sensor':modelo, 'local':local,'device': device};
                    Dados.find(query, function(err, data){
                        if (err){
                            req.flash('erro', 'Erro ao buscar sensor: '+err);
                            res.redirect('/usuarios/user/'+req.params.id_user+'/sensores');
                        }else {
                            configs.delete_old_data();
                            configs.all_data_csv_generator(data);
                            res.render('sensores/sensor', {sensor:sensor, dados:data});
                        }
                    });
                }
            });
        },
        grafico: function(req, res) {
            Sensores.findOne({'_id': req.params.id_sensor}, function(err, sensor){
                if (err){
                    req.flash('erro', 'Erro ao buscar sensor: '+err);
                    res.redirect('/usuarios/user/'+req.params.id_user+'/sensores');
                }else {
                    nome_sensor = sensor.name_sensor;
                    user = sensor.user;
                    modelo = sensor.model_sensor;
                    tipo = sensor.type_sensor;
                    local = sensor.local;
                    device = sensor.device;
                    var query = {'name_sensor':nome_sensor,'user':user,'type_sensor':tipo, 'model_sensor':modelo, 'local':local,'device': device};
                    Dados.find(query, function(err, data) {
                        if (err) {
                            req.flash('erro', 'Erro ao buscar sensor: '+err);
                            res.redirect('/usuarios/user/'+req.params.id_user+'/sensores/sensor/'+req.params.id_sensor);
                        } else {
                            configs.data_csv_generator(data);
                            var docs = configs.data_chart(data);
                            res.render('sensores/grafico', {sensor:sensor, dados: docs});
                        }
                    }).sort({$natural:-1}).limit(75);
                }
            });
        },
        locais: function(req, res){
            var id_user = req.params.id_user;
            Usuarios.findOne({'_id':id_user},function(err, data){
                Sensores.find({'user': data.user}, function(err, sensores){
                    if (err) {
                        req.flash('erro','Erro ao buscar sensor: '+err);
                        res.redirect('/usuarios/user/'+req.params.id_user);
                    }else {
                        var locais = [];
                        for (i=0;i<sensores.length;i++){
                            locais.push(sensores[i].local)
                        }
                        //elimina locais repetidos
                        var novo_local = [...new Set(locais)];
                        res.render('sensores/locais',{locais: novo_local});
                    }
                });
            });
        },
        local:function(req, res){
            var local = req.params.local;
            var id_user = req.params.id_user;
            console.log(local);
            Usuarios.findOne({'_id':id_user},function(err, data){
                Sensores.find({'user': data.user,local:local}, function(err, sensores){
                    console.log(sensores);
                    res.render('sensores/index',{sensor: sensores});
                });
            });
        }
    }
    return SensoresController;
}