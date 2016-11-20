 //*Script che gestisce la creazione di un nuovo oggetto di tipo Employee
 //*e le varie funzioni per gestirlo

/**
 * @brief costruttore per un nuovo oggetto di tipo Employee
 * @param [in] Integer id identificatore univoco per un Emplyee
 * @param [in] String name nome dell'Employee
 * @param [in] String surname cognome dell'Employee
 * @param [in] Integer level livello in azienda dell'Employee
 * @param [in] Integer salary Parameter description.
 * @return un istanze dell'oggetto Employee con gli attributi indicati nel costruttore se gli attributi rispettano i tipi richiesti, null altrimenti
 */
function Employee(id, name, surname, level, salary){
    if ( (check(id)) && check(level) && check(salary) ){
        this.id = id;
        this.salary = salary;
        this.level = level;
        this.name = name;
        this.surname = surname;
    }else{
        return null;
    }
}


/**
 * @brief controlla se il parametro é intero
 * @param [in] String data la stringa da controllare
 * @return True se é un intero, False altrimenti
 */
function check(data){
    if (data === parseInt(data, 10)){
        return true;
    }else{
        return false;
    }
}

/**
 * @brief inizializza un vettore di 5 dipendenti con il loro ID
 * @return un Vettore di oggetti di tipo Employee
 */
function init(E){
    //vettore
    E = [     new Employee(1, "Giorgio", "Azzurro", 3, 3000),
              new Employee(2, "Mario", "Marzo", 3, 3000),
              new Employee(3, "Giuseppe", "Febbraio", 3, 3000),
              new Employee(4, "Gigi", "Natale", 3, 3000),
              new Employee(5, "Carlo", "Giugno", 3, 3000)    ];
    return E;
}

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
/**
 * @brief gives the bigger ID from the Employees
 * @param [in] Employee[] Emplo il vettore di Employee
 * @return an Integer that rappresents the ID
 */
function getBig(Emplo){
    max = 0; 
    //ciclo su tutti gli elementi
    for (i=0; i<Emplo.length; i++){
        var id = Emplo[i].id;
        if (id > max){
            max = id;  
        }
    }
    return max;
}
/**
 * @brief cancella da un vettore dato, l'elemento indicato
 * @param [in] Employee l'oggetto da eliminare
 * @param [in] Employee[] employee elenco degli Employee nei quali cercare la corrispondenza di id
 * @return un array Employees[] senza l'elemento che si voleva eliminare
 */
function del(e, Emplo){
    for (i=0; i<Emplo.length; i++){
        var id = Emplo[i].id;
        //quando lo trovo lo cancello
        if (id == e.id){
            Emplo.splice(i, 1);
        }
    }
    return Emplo;
}
/**
 * @brief aggiunge un nuovo Employee nel vettore indicato
 * @param [in] Employee e l'oggetto da inserire
 * @param [in] Employee[] Emplo vettore nel quale inserire
 * @return Employee[] il nuovo vettore di Employee
 */
function add(e, Emp){
    //verifico 
    if ((e != null) || (Emp != null)){
        //inserisco
        Emp.push(e);
        //ritorno il nuovo vettore
        return Emp;
    }else{
        return null;
    }
}

/**
 * @brief cerco un determinato Employee che ha quel id, se esiste aggiorno i suoi dati con i nuovi dati, 
 * se non c'é ne creo un'altro e lo aggiungo alla lista di Employee
 * @param [in] Employee[]    Emp        -il vettore di Employee nel quale cercare e aggiornare e/o inserire
 * @param [in] Integer       id         -identificatore univoco
 * @param [in] String        name       - nome dell Employee
 * @param [in] String        surname    -cognome dell'Employee
 * @param [in] Integer       level      -livello
 * @param [in] Integer       salary     -salario
 * @return un vettore Employee[] con i dati aggiornati
 */
function ins_upd(Emp, id, name, surname, level, salary){
    //nuovo identificatore
    var newId = -1;
    //se il vettore passato oppure uno degli attributi di un employee sono nulli non faccio nulla
    if ( (Emp == null) || (name == null) || (surname == null)
        || (level == null) || (salary == null)){
        return Emp;
    }
    //se l'id é null oppure vuoto ne genero uno nuovo
    if( (id == null) || (id == "") ){
        newId = getBig(Emp) + 1;
    }else{
        //altrimenti prendo quello passato attraverso la funzione
        newId = id;
    }
    //controllo se esiste già un Employee con quel id
    var e = search(newId, Emp);
    if (e != null){
        //se esisteva già, aggiorno i suoi dati
        var emp = new Employee(parseInt(newId), name, surname, parseInt(level), parseInt(salary)); //creo un nuovo Employee
        //cancello quello vecchio
        Emp = del(e, Emp);
        //aggiungo quello nuovo
        Emp = add(emp, Emp);        
    }else{
        //se non esisteva già ne inserisco uno nuovo
        var emp = new Employee(parseInt(newId), name, surname, parseInt(level), parseInt(salary)); //creo un nuovo Employee
        //lo aggiungo
        Emp = add(emp, Emp);
    }
    //ritorno il nuovo vettore
    return Emp; 
}

//esporto tutte le funzioni implementate in questo modulo
exports.init = init;
exports.Employee = Employee;
exports.check = check;
exports.getBig = getBig;
exports.search = search;
exports.del = del;
exports.ins_upd = ins_upd;



















