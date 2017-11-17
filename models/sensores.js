var mongoose = require('mongoose');

module.exports = function(){
    sensoresSchema = mongoose.Schema({
        user : { type: String, trim: true, index: true},
        name_sensor : { type: String, trim: true },
        model_sensor : { type: String, trim: true },
        type_sensor  : { type: String, trim: true },
        local: { type: String, trim: true },
        device: { type: String, trim: true }
    },{
        versionKey: false
    });
    return mongoose.model('Sensores', sensoresSchema);
}