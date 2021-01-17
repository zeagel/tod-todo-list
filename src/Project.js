const Project = ({ project }) => {
  
  const render = () => {
    const container = document.getElementById(project.id);
    let projectDetailsElem = document.getElementsByClassName('project-details');
  
    console.log(projectDetailsElem);
  
    if (projectDetailsElem.length !== 0) {
      projectDetailsElem[0].remove();
    } else {
      projectDetailsElem = document.createElement('div');
      projectDetailsElem.className = 'project-details';
      
      const descElem = document.createElement('div');
      descElem.innerText = project.description;
      projectDetailsElem.appendChild(descElem);
  
      if (project.todoList.length > 0) {
        project.todoList.forEach(todo => {
          const todoRow = document.createElement('div');
          todoRow.innerText = `${todo.title}, ${todo.priority}, ${todo.dueDate}`;
          projectDetailsElem.appendChild(todoRow);
        });
      }
      
      container.appendChild(projectDetailsElem);
    }
  };

  return render();
};

export default Project;