import Project from '../Project/Project';
import AddProjectForm from '../AddProjectForm/AddProjectForm';
import './projectlist.css';

const ProjectList = ({ projects }) => {

  const render = () => {
    // Get main-content element and clear it.
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = '';

    //mainContainer.appendChild(buttonRow);    

    // Add container element for project list
    const projectListContainer = document.createElement('div');
    projectListContainer.id = 'project-list';

    // Add row element for title and add-project button
    const titleRow = document.createElement('div');
    titleRow.classList.add('flex-dir-row');
    titleRow.classList.add('flex-justify-sb');

    // Title element
    const titleElem = document.createElement('div');
    titleElem.classList.add('heading-2');
    titleElem.innerText = 'Projects:';
    titleRow.appendChild(titleElem);
    
    // Button element
    const buttonRow = document.createElement('div');
    buttonRow.id = 'add-project-button';
    const button = document.createElement('button');
    button.classList.add('primary-btn');
    button.addEventListener("click", () => { AddProjectForm() });
    const label = document.createTextNode('Add project');
    button.appendChild(label);
    buttonRow.appendChild(button);
    titleRow.appendChild(buttonRow);

    // Add title and button on the row
    projectListContainer.appendChild(titleRow);

    if (projects.length > 0) {
      
      // Add project list header row
      const headerRow = document.createElement('div');
      headerRow.classList.add('project-row-heading');
      headerRow.innerHTML = `<div>Todos:</div><div>Project name:</div>`;
      projectListContainer.appendChild(headerRow);
      
      
      // Loop through all projects and generate project rows
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

    } else {
      const noProjectInfo = document.createElement('div');
      noProjectInfo.innerText = 'No projects yet';
      projectListContainer.appendChild(noProjectInfo);
    }
    
    mainContainer.appendChild(projectListContainer);
  };

  return render();
};

export default ProjectList;