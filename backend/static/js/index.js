let event = document.getElementById("createTask").addEventListener("click",crudTask);
//let even2 = document.getElementById("staticBackdrop").addEventListener("click")

function saveTask(task){
fetch("http://localhost:5000/save_task",{
    method:"POST",
    body: JSON.stringify(task)
}
).then(function (response){
    return response.json()
}).then(function(data){
    console.log("Respuesta del sv : ",data)
}).catch(function(error){
    console.log("error :"+ error);
})
}

function deleteTask(){

}
function finishTask(){

}

function editTask(){

}
function crudTask(){
   let proyect = document.getElementById("inputProyect").value;
   let title = document.getElementById("inputTitle").value;
   let task = document.getElementById("inputTask").value;
   let maxDate = document.getElementById("inputMaxDate").value;
   let maxTime = document.getElementById("inputMaxTime").value;

   if(proyect == "" || title =="" || task == ""){
    // FALTA AGREGAR VERIFICACION
    //$('#staticBackdrop').modal("toggle"); // abrir
    console.log("asdf")
   }
   let newTask = {
       "proyect" :proyect,
       "title":title,
       "task":task,
       "maxData":maxDate,
       "maxTime":maxTime,
    }
    saveTask(newTask);
    
    console.log(proyect);
   console.log(title);
   console.log(task);
   console.log(maxDate);
   console.log(maxTime);
}

