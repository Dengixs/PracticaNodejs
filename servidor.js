const net = require('net');
var mysql = require('mysql');
var puerto=7000;

var conexion = mysql.createConnection({
  host: "localhost",
  database: "dbnodejs",
  user: 'root',
  password: ''
  
});

conexion.connect(function(error) {
    if (error){
      throw error;
    }else{
      console.log('Conexion establecida!!!');
    } 
  

});

const server = net.createServer(function (connection) {
    connection.on('data', function(data){
        
        var position= data.indexOf("/");
        if(position<0)
        {
          connection.write('Ingrese un usuario y contraseña con formato valido.'); 
        }else{
          var usr=data.subarray(0,position);
          var psw=data.subarray(position+1,data.length);
          
          conexion.query("SELECT nombre FROM dbnodejs WHERE usuario="+"'"+usr+"'", function (error, result, fields) {
            if (error) throw error;
            if(result=="")
            {
                connection.write("No existe el usuario : "+usr);        
            }else{
              conexion.query("SELECT apellido FROM dbnodejs WHERE password="+"'"+psw+"'", function (error, result1, fields) {
                    if (error) throw error;
                    if(result1=="")
                    {
                      connection.write("La contraseña para "+usr+" es incorrecta.");
                    }else
                    {
                        connection.write("Bienvenido "+result[0].nombre+" "+result1[0].apellido+"!!!!!");
                        console.log(data+"Se conecto exitosamente.");
                        connection.end();
                    }
                });
            }
          });
        }
        if(data=='salir'){
          connection.end();
        }
    });
    connection.on('end', function (data) {
    });
});

server.listen(puerto, function () {
    console.log('servidor esta corriendo en el puerto : '+puerto);
});