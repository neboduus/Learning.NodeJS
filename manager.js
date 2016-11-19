 //*Script che gestisce la creazione di un nuovo oggetto di tipo Employee

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