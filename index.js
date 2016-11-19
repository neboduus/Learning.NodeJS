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

/*
*Parte Visualizzazione Employee quando ricevo un GET a ROOT non faccio altro che visualizzare il TEMPLATE senza niente
*/
app.get('/', function(req, res) 
{   
    //bind to template
	bind.toFile('tpl/home.tpl', 
    {
        //don't bind nothing, only show the home page 
    }, 
    function(data) 
    {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
});

/*
* Intercetto tutte le richieste GET a /ROOT/search, 
* cioé le richieste di ricerca di un Employee
* e quindi raccolgo i dati su quel 
* determinato Employee e gli invio al client
*/
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
        e = employee.search(id,Emp);
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
            FLAG:true
        }, function(data) {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }else{
        //bind to the empty template
        bind.toFile('tpl/home.tpl', 
        {   
            FLAG:true
            //don't bind nothing, only show the home page 
        }, 
        function(data) {
            //write response
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
});


/*
*
*/
app.get("/delete", function(req,res){
     //get GET
    var url_parts = url.parse(req.url, true);
    var getVar = url_parts.query; //aggancio un nuovo attributo
    //recupero l'id inserito
    var id = parseInt(req.query.searchId);
    //controllo se c'é già solo se l'id é stato inserito
    if (id != null){
        var e = employee.search(id,Emp);
    }
    //se l'elemento esiste
    if (e != null){
        //lo cancello
        Emp = employee.del(e, Emp);
    }
    
    //bind to the empty template
    bind.toFile('tpl/home.tpl', 
    {
        //don't bind nothing, only show the home page 
    }, 
    function(data) {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
    
})


//check status
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});