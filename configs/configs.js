
var fs = require('graceful-fs');
var name_file = '/data', extension='.csv';
var file = __dirname + name_file + extension;

function file_path(){
    return file;
}

function data_csv_generator(data) {
    fs.appendFile(file, "id,name_sensor, user,local,device,day,hour,type,model,value\n", function(err) {
        if (err) throw err;
    });
    for (var i = data.length - 1; i >= 0; i--) {
        var id = JSON.stringify(data[i]._id);
        var user = JSON.stringify(data[i].user);
        var local = JSON.stringify(data[i].local);
        var device = JSON.stringify(data[i].device);
        var day = JSON.stringify(data[i].day);
        var hour = JSON.stringify(data[i].hour);
        var type = JSON.stringify(data[i].type_sensor);
        var model = JSON.stringify(data[i].model_sensor);
        var value = JSON.stringify(data[i].value);

        fs.appendFile(file, id + ',' + user + ',' + local + ',' + device + ',' + day + ',' + hour + ',' + type + ',' + model + ',' + value + '\n', function(err) {
            if (err) throw err;
        });

    }
}

function delete_old_data(){
    fs.unlink(file, function(err) {});
}

function all_data_csv_generator(data) {
    fs.appendFile(file, "id,name_sensor,user,local,device,day,hour,type,model,value\n", function(err) {
        if (err) throw err;
    });
    for (var i = 0; i < data.length; i++) {
        var name_sensor = JSON.stringify(data[i].name_sensor);
        var id = JSON.stringify(data[i]._id);
        var user = JSON.stringify(data[i].user);
        var local = JSON.stringify(data[i].local);
        var device = JSON.stringify(data[i].device);
        var day = JSON.stringify(data[i].day);
        var hour = JSON.stringify(data[i].hour);
        var type = JSON.stringify(data[i].type_sensor);
        var model = JSON.stringify(data[i].model_sensor);
        var value = JSON.stringify(data[i].value);

        fs.appendFile(file, id+','+name_sensor+','+user+','+local+','+device+','+day+','+hour+','+type+','+model+','+value+'\n', function(err) {
            if (err) throw err;
        });
    }
}

// funcao que pega os dados da pesquisa e gera um array com os dados e as labels para o chart.js
function data_chart(data) {
    var values = [];
    var hours = [];
    for (var i = data.length - 1; i >= 0; i--) {
        values.push(parseFloat(data[i].value));
        hours.push(data[i].hour);
    }
    return { data: values, labels: hours };
}

module.exports = {
    delete_old_data,
    data_csv_generator,
    all_data_csv_generator,
    data_chart,
    file_path
}