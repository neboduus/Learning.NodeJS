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
 * @brief gives the bigger ID from the Employees
 * @return an Integer that rappresents the ID
 */
function getBig(employee){
    max = 0; 
    //ciclo su tutti gli elementi
    for (i=0; i<=employee.length; i++){
        if (employee[i].id > max){
            max = employee[i];  
        }
    }
    return max;
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
    Emplo.forEach(function(e){
        //se lo trovo
         if (e.id == id){
             console.log(e.id);
             console.log(e.name);
             console.log(e.surname);
             console.log(e.salary);
             console.log(e.level);
             return e; //lo restituisco
         }
    });
    //altrimenti
    return null;
}


//esporto tutte le funzioni implementate in questo modulo
exports.init = init;
exports.Employee = Employee;
exports.check = check;
exports.getBig = getBig;
exports.search = search;




















