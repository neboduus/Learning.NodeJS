/**
 * @brief rende visibile il form di inserimento Employee con i campi tutti vuoti se il form era nascosto, lo nasconde se era visibile
 * @return null
 */
function show_hide(){
    //recupero l'oggetto
    var table = document.getElementById("formTable");
    if (table.style.visibility == "hidden"){
        //rendo visibile quando é nascosto
        table.style.visibility = "visible"; 
        clear();
    }else{
        //rendo nascosto se era visibile
        table.style.visibility = "hidden";
    }
}

/**
 * @brief svuota il contenuto degli input
 * @return null
 */
function clear(){
    //recupero gli input e imposto che siano vuoti
        var input1 = document.getElementById("modifyId");
        var input2 = document.getElementById("modifyName");
        var input3 = document.getElementById("modifySurname");
        var input4 = document.getElementById("modifySalary");
        var input5 = document.getElementById("modifyLevel");
        input1.value = "";
        input2.value = "";
        input3.value = "";
        input4.value = "";
        input5.value = "";
}
/**
 * @brief rende visibile la tabella quando viene fatta una ricerca
 * @return null
 */
function show(){
    var table = document.getElementById("formTable");
    //recupero l'oggetto e controllo se é goà visibile
    if (table.style.visibility == "hidden"){
        //rendo visibile quando é nascosto
        table.style.visibility = "visible"; 
    }
}

/**
 * @brief send data to server to delete an Employee
 * @return nothing
 */
function send()
{   //cambio l'action del form poiché ho due bottoni nello stesso form
    var form = document.getElementById("searchForm");
    form.action = "/delete";
    form.submit();
    
};
/**
 * @brief send data to server to update or insert new Employees
 * @return nothing
 */
function up(){
    var Flag = false;
    //recupero gli elementi dal DOM
    var id = document.getElementById("modifyId");
    var name = document.getElementById("modifyName");
    var surname = document.getElementById("modifySurname");
    var level = document.getElementById("modifyLevel");
    var salary = document.getElementById("modifySalary");
    
    //controllo che non siano nulli e che certi siano numeri
    if ( (name.value == "") || (level.value == "") || (surname.value == "") || (salary.value == "")
      || isNaN(level.value) || isNaN(salary.value)){
        window.alert("Oups!!! C'è un errore!! Forse hai sbagliato qualcosa durante l'inserimento dei dati. Controlla bene, i campi ID, level e salary devono essere numeri e non lettere");
        Flag = true;
    }
    //controllo in caso di ID inserito che sia un numero
    if ( (id.value != "") && (isNaN(id.value)) ){
         window.alert("Oups!!! C'è un errore!! Forse hai sbagliato qualcosa durante l'inserimento dei dati. Controlla bene, i campi ID, level e salary devono essere numeri e non lettere");
        Flag = true;
    }
    //se non c'é nessun errore di inserimento
    if (Flag == false){
        //recupero il form 
        var form = document.getElementById("modifyForm");
        //e invio la richiesta
        form.submit();
    }
}












