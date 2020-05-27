const TaskList = document.querySelector('#task-list');
const form = document.querySelector('#add-task-form');


function renderTask(doc){
    let li = document.createElement('li');
    let task = document.createElement('span');
    let deadline = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    task.textContent = doc.data().task;
    deadline.textContent = doc.data().deadline;
    cross.textContent = 'X';

    li.appendChild(task);
    li.appendChild(deadline);
    li.appendChild(cross);

    TaskList.appendChild(li);

    
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('tasks').doc(id).delete();
    });
}


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


db.collection('tasks').orderBy('deadline').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderTask(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            TaskList.removeChild(li);
        }
    });
});

