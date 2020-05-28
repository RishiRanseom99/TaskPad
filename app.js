const TaskList = document.querySelector('#task-list');
const form = document.querySelector('#add-task-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(form.task.value=="" || form.deadline.value==""){
        document.getElementById("alert").style.visibility = "visible";}
    else{
        document.getElementById("alert").style.visibility = "hidden";
        db.collection('tasks').add({
            task: form.task.value,
            deadline: form.deadline.value
        });
        form.task.value = '';
        form.deadline.value = '';
    
    }
    

    
});



