import Project from './Project';
import AddProjectForm from './AddProjectForm';

const ProjectList = ({ projects }) => {

  const render = () => {
    const mainContainer = document.getElementById('main-content');
    
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
      projectRow.className = 'project-row';
      projectRow.id = project.id;
      const projectTitle = document.createElement('div')
      projectTitle.innerText = `${project.title} (${project.todoList.length})`;
      projectTitle.addEventListener("click", () => { Project({ project }) });
      projectRow.appendChild(projectTitle);
      projectListContainer.appendChild(projectRow)
    });
    
    mainContainer.appendChild(projectListContainer);
  };

  return render();
};

export default ProjectList;