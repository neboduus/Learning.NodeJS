//express lib
var express = require('express');
//parse URL
var url = require('url');
//inspect
var util = require('util');
//for binding in the template
var bind = require('bind');
//import Employee module
var employee = require('./dataManager/employee.js')
//instantiate express
var app = express();

//////////////////////////////////////////////////////
//il vettore di Employee
var Emp = null;
//lo inizializzo
Emp = employee.init(Emp);

//POST
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
//imposto sul local host con porta 
app.set('port', (process.env.PORT || 5000));
//imposto del contenuto statico
app.use(express.static(__dirname+"/scripts"));
app.use(express.static(__dirname+"/css"));

//Parte Visualizzazione Employee
//use: for both POST and GET
app.get('/', function(req, res) 
{   
    //bind to template
	bind.toFile('tpl/home.tpl', 
    {
        FLAG: false
        //don't bind nothing, only show the home page 
    }, 
    function(data) 
    {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

app.get('/search', function(req, res) 
{  
    //get GET
    var url_parts = url.parse(req.url, true);
    var getVar = url_parts.query; //aggancio un nuovo attributo
    //recupero l'id inserito
    var id = parseInt(req.query.searchId);
    //provo a cercarlo nel vettore principale solo se é stato inserito un id valido
    var e = null;
    if(id != null){
        e = search(id,Emp);
    }
    
    //controllo i risultati del search
    if (e != null){
        //mostro la tabella sulla pagina
        
        //bind to template
        bind.toFile('tpl/home.tpl', 
        {   //imposto i dati per il Template
            id: e.id,
            name: e.name,
            surname: e.surname,
            level: e.level,
            salary: e.salary,
            FLAG: true
        }, function(data) {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }else{
        //bind to template
        bind.toFile('tpl/home.tpl', 
        {
            FLAG: false
            //don't bind nothing, only show the home page 
        }, 
        function(data) 
        {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
        }

});
/**
 * @brief cerca in un vettore di Employee, l'oggetto corrispondente all'id preso in input
 * @param [in] Integer id identificativo univoco
 * @param [in] Employee[] employee elenco degli Employee nei quali cercare la corrispondenza di id
 * @return l'oggetto Employee corrispondente a quel quel id se questo esiste, null altrimenti
 */
function search(id, Emplo){
    //ciclo su tutti gli elementi di Emplo
    for(i=0; i<Emplo.length; i++){
        //se lo trovo
        var e = Emplo[i];
         if (e.id == id){
             return e; //lo restituisco
         }
    };
    //altrimenti
    return null;
}



//check status
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});