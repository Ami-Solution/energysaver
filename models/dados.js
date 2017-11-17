var mongoose = require('mongoose');

module.exports = function() {
    DadosSchema = mongoose.Schema({
        user: { type: String, trim: true },
        local: { type: String, trim: true },
        device: { type: String, trim: true },
        name_sensor: { type: String, trim: true },
        id_sensor: { type: String, trim: true },
        day: { type: String, trim: true },
        hour: { type: String, trim: true },
        type_sensor: { type: String, trim: true },
        model_sensor: { type: String, trim: true },
        value: { type: String, trim: true },
    }, {
        versionKey: false
    });
    return mongoose.model("Dados", DadosSchema);
}