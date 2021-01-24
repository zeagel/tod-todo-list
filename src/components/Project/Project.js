import TodoList from '../TodoList/TodoList';
import DataStorageHandler from '../../utils/DataStorageHandler';
import Notification from '../Notification/Notification';
import ProjectList from '../ProjectList/ProjectList';

import './project.css';

const Project = ({ project }) => {

  const handleDeleteOnClick = () => {
    try {
      // Disable all project buttons to avoid unecessary error situations.
      document.getElementById('back-to-projects-btn').disabled = true;
      document.getElementById('add-todo-btn').disabled = true;
      document.getElementById('del-project-btn').disabled = true;

      // Load latest project list from local storage
      const projects = DataStorageHandler.loadData();

      // Remove the current project from the list
      const index = projects.findIndex(p => p.id === project.id);
      if (index < 0) {
        throw new Error ('Project removal error: project not found');
      }
      projects.splice(index, 1);

      // Save the updated project list on local storage
      DataStorageHandler.saveData(projects);

      // Show message about successfull removal
      Notification({
        type: 'info',
        messsageText: `Project '${project.title}' removed successfully.`
      });

      // Redirect user back to updated project list after the timeout
      setTimeout(() => {
        const message = document.getElementById('message-container');
        message.innerHTML = '';
        ProjectList({ projects });
      }, 3500);      
 
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleBackOnClick = () => {
    const projects = DataStorageHandler.loadData();
    ProjectList({ projects });
  };
  
  const render = () => {

    // Clear main content
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    // Add container element for the project to be displayed.
    const projectContainer = document.createElement('div');
    projectContainer.id = project.id;
    projectContainer.className = 'project-container';

    // Add wrapper element for buttons
    const buttonRow = document.createElement('div');
  
    // Add button for returning project list.
    const backButton = document.createElement('button');
    backButton.id = 'back-to-projects-btn';
    backButton.classList.add('secondary-btn');
    const backButtonLabel = document.createTextNode('Back');
    backButton.appendChild(backButtonLabel);
    backButton.addEventListener("click", () => { handleBackOnClick() } );
    buttonRow.appendChild(backButton);
   
    projectContainer.appendChild(buttonRow);

    // Add project details container element
    const projectDetailsElem = document.createElement('div');
    projectDetailsElem.className = 'project-details';

    // Add project heading row for title and delete-project button
    const projectHeadingRow = document.createElement('div');
    projectHeadingRow.classList.add('flex-dir-row');
    projectHeadingRow.classList.add('flex-justify-sb');

    // Title
    const titleElem = document.createElement('div');
    titleElem.classList.add('heading-2');
    titleElem.innerText = project.title;
    projectHeadingRow.appendChild(titleElem);
    
    // Button
    const delButton = document.createElement('button');
    delButton.id = 'del-project-btn';
    delButton.classList.add('warning-btn');
    const delButtonLabel = document.createTextNode('Delete project');
    delButton.appendChild(delButtonLabel);
    delButton.addEventListener("click", () => { handleDeleteOnClick() } );
    projectHeadingRow.appendChild(delButton);
   
    // Append title and button on the row
    projectDetailsElem.appendChild(projectHeadingRow);    

    // Add project description element in details
    const descElem = document.createElement('div');
    descElem.classList.add('project-description');
    descElem.innerText = project.description;
    projectDetailsElem.appendChild(descElem);

    // Add all project's todo-items (if any)
    const todoListElement = TodoList({ project, todos: project.todoList });
    if (todoListElement) {
      projectDetailsElem.appendChild(todoListElement);
    }

    // Add details element in project container.
    projectContainer.appendChild(projectDetailsElem);
    
    // Show project element on the screen.
    document.getElementById('main-content').appendChild(projectContainer);
  };

  return render();
};

export default Project;