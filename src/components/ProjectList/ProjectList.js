import Project from '../Project/Project';
import AddProjectForm from '../AddProjectForm/AddProjectForm';

const ProjectList = ({ projects }) => {

  const render = () => {
    // Get main-content element and clear it.
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = '';
    
    const projectListContainer = document.createElement('div');
    projectListContainer.id = 'project-list';
  
    const div = document.createElement('div');
    const button = document.createElement('button');
    button.addEventListener("click", () => { AddProjectForm() });
    const label = document.createTextNode('New project');
    button.appendChild(label);
    div.appendChild(button);
    projectListContainer.appendChild(div);
    
    projects.forEach(project => {
      const projectRow = document.createElement('div');
      projectRow.classList.add('project-row');
      projectRow.id = project.id;
      projectRow.addEventListener("click", () => { Project({ project }) });
      
      const todoCountElem = document.createElement('div')
      todoCountElem.innerText = `( ${project.todoList.length} )`;
      projectRow.appendChild(todoCountElem);

      const projectTitle = document.createElement('div')
      projectTitle.innerText = project.title;
      projectRow.appendChild(projectTitle);
      
      projectListContainer.appendChild(projectRow);
    });
    
    mainContainer.appendChild(projectListContainer);
  };

  return render();
};

export default ProjectList;