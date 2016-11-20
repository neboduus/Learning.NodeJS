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
        //bind to the empty template
       bindToEmpty(req,res);
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
        bindToEmplyee(req, res, e.id, e.name, e.surname, e.level, e.salary);
    }else{
        //bind to the empty template and showing the form
       bindToEmpty_Flag(req, res);
    }
});
/*
*Gestisco le chiamate di tipo GET per l'eliminazione di un Employee
*/
app.get("/delete", function(req,res){
     //get GET
    var url_parts = url.parse(req.url, true);
    var getVar = url_parts.query; //aggancio un nuovo attributo
    //recupero l'id inserito
    var id = parseInt(req.query.searchId);
    //controllo se il campo id era vuoto
    if (id != null){
        //se non era vuoto recupero l'Employee corrispondente a quel id
        var e = employee.search(id,Emp);
    }
    //se sono riuscito a trovare un Employee con quel id
    if (e != null){
        //lo cancello
        Emp = employee.del(e, Emp);
    }
    //svuoto il form se c'era qualcosa
    bindToEmpty(req,res);
});
/*
* Gestisco le chiamate di tipo POST a /ROOT/update per l'aggiornamento o l inserimento di un nuovo dato
*/
app.use('/update', function(request, response) 
{
	if ( typeof request.body !== 'undefined' && request.body)
	{   //content of the post
		var id;
		var name;
        var surname;
        var level;
        var salary;
		
		//if query is defined and not null get all the parameters of the request
		if ( typeof request.body.modifyId !== 'undefined' && request.body.modifyId){
            //save content of id
			id = request.body.modifyId;
        }
		if ( typeof request.body.modifyName !== 'undefined' && request.body.modifyName){
            //save content of name
    		name = request.body.modifyName;
        }
        if ( typeof request.body.modifySurname !== 'undefined' && request.body.modifySurname){
            //save content of surname
    		surname = request.body.modifySurname;
        }
        if ( typeof request.body.modifyLevel !== 'undefined' && request.body.modifyLevel){
            //save content of level
    		level = request.body.modifyLevel;
        }
        if ( typeof request.body.modifySalary !== 'undefined' && request.body.modifySalary){
            //save content of name
    		salary = request.body.modifySalary;
        }
        //aggiungo un nuovo Employee o agiorno i dati
        Emp = employee.ins_upd(Emp, id, name, surname, level, salary);
	}
	else
	{
		bindToEmpty_Flag(request,response);
	}
    bindToEmplyee(request,response, id, name, surname, level, salary);
    

});

/**
 * @brief inoltra la risposta su un nuovo template vuoto che mostra il FORM
 * @param [in] HTTP_request req - richiesta - serve quando servono i parametri
 * @param [in] HTTP_response res - risposta - per inoltrare la risposta
 * @return null
 */
function bindToEmpty_Flag(req,res){
    //bind to the empty template
    bind.toFile('tpl/home.tpl', 
    {
        //don't bind nothing, only show the home page 
        //and set the FLAG for viewing the form
        FLAG: true
    }, 
    function(data) {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
};
/**
 * @brief inoltra la risposta su un nuovo template vuoto che non mostra il FORM
 * @param [in] HTTP_request req - richiesta - serve quando servono i parametri
 * @param [in] HTTP_response res - risposta - per inoltrare la risposta
 * @return null
 */
function bindToEmpty(req,res){
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
};
/**
 * @brief inoltro la risposta su un template, compilato con i vari parametri che mi vengono passati
 * @param [in] HTTP_request  req        - richiesta - serve quando servono i parametri
 * @param [in] HTTP_response res        - risposta - per inoltrare la risposta
 * @param [in] Integer       id         - identificatore dell'Employee da passare al template
 * @param [in] String        name       - nome dell Employee
 * @param [in] String        surname    -cognome dell'Employee
 * @param [in] Integer       level      -livello
 * @param [in] Integer       salary     -salario
 * @return null
 */
function bindToEmplyee(req, res, id, name, surname, level, salary){
    //bind to template
    bind.toFile('tpl/home.tpl', 
    {   //imposto i dati per il Template
        id: id,
        name: name,
        surname: surname,
        level: level,
        salary: salary,
        FLAG:true
    }, function(data) {
        //write response
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
};

//check status
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});