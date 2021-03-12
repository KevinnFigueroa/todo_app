let event1 = document.getElementById("createTask").addEventListener("click",crudTask);

function redirectToFinishedTasks(){
    fetch("http://localhost:5000/redirect_to_finished_tasks",{
        method:"GET",
        
    }
    ).then(function (response){
    }).then(function(data){
        console.log("Respuesta del sv : ",data)
    }).catch(function(error){
        console.log("error :"+ error);
    })
    }


function saveTask(task){
fetch("http://localhost:5000/save_task",{
    method:"POST",
    body: JSON.stringify(task)
}
).then(function (response){
    document.location.reload();
}).then(function(data){
    console.log("Respuesta del sv : ",data)
}).catch(function(error){
    console.log("error :"+ error);
})
}

function deleteTask(task){
    console.log(task);
    fetch("http://localhost:5000/delete_task",{
    method:"DELETE",
    body: JSON.stringify(task)
}
).then(function (response){
    document.location.reload();
}).then(function(data){
    console.log("Respuesta del sv : ",data)
}).catch(function(error){
    console.log("error :"+ error);
})

}
function finishTask(task){
    console.log(task);
    fetch("http://localhost:5000/finish_task",{
        method:"POST",
        body: JSON.stringify(task)
    }
    ).then(function (response){
    document.location.reload();
    }).then(function(data){
        console.log("Respuesta del sv : ",data)
    }).catch(function(error){
        console.log("error :"+ error);
    })
}

function listTask(){
    fetch("http://localhost:5000/list_tasks",{
        method:"GET",
    }
    ).then(function (response){
        document.location.reload();
    }).then(function(data){
        console.log("Respuesta del sv : ",data)
    }).catch(function(error){
        console.log("error :"+ error);
    })
}

/*function editTask(){
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
}*/

function crudTask(){
   let proyect = document.getElementById("inputProyect").value;
   let title = document.getElementById("inputTitle").value;
   let task = document.getElementById("inputTask").value;
   let maxDate = document.getElementById("inputMaxDate").value;
   let maxTime = document.getElementById("inputMaxTime").value;

   if(proyect == "" || title =="" || task == ""){
   }
   let newTask = {
       "proyect" :proyect,
       "title":title,
       "task":task,
       "maxData":maxDate,
       "maxTime":maxTime,
    }
    saveTask(newTask);
    
}

