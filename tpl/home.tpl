<!DOCTYPE html>
<html>
    <head>
          <!-- Here goes the metadata -->  
          <meta charset="utf-8">
          <link rel="stylesheet" href="/myStyle.css">
          <title> HTML5 basics </title>
    </head>

    <body >  

        <h1>Manage your Employee </h1>     

        <form onsubmit="show" action="/search" method="get" name="searchForm" id="searchForm">
            ID:
            <input name="searchId" id="searchId" />
            <button name="searchBtn" id="searchBtn" type="button" onclick="submit()" >Search by ID</button>
            <button name="deleteBtn" id="deleteBtn" type="button" onclick="send()">Delete by ID</button>
        </form>

        <br><br>
        
        <button name="showForm" id="showForm" type="button" onclick="show_hide()">Insert a new Employee</button>
        <form action="" method="post" name="modifyForm" id="modifyForm">
            <table id="formTable" style="visibility:visible">
                <tr>
                    <td>
                        ID: 
                    </td>
                    <td>
                        <input name="modifyId" id="modifyId" value="(:id:)" /><br>
                    </td>
                </tr>             
                <tr>
                    <td>
                        Name:
                    </td>
                    <td>
                        <input name="modifyName" id="modifyName" value="(:name:)"/>
                    </td>
                </tr>           
                <tr>
                    <td>
                        Surname:
                    </td>
                    <td>
                        <input name="modifySurname" id="modifySurname" value="(:surname:)" />
                    </td>
                </tr>
                <tr>
                    <td>
                        Level:
                    </td>
                    <td>
                        <input name="modifyLevel" id="modifyLevel" value="(:level:)"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Salary:
                    </td>
                    <td>                        
                        <input name="modifySalary" id="modifySalary" value="(:salary:)"/>
                    </td>
                </tr>  
                <tr>
                    <td>
                        <button name="modifyBtn" id="modifyBtn" type="button" onclick="">Save Changes</button>
                    </td>
                </tr>
            </table>
        </form>
        
        <script src="/script.js"></script> 
    </body>

</html>
