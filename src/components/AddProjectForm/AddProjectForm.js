import ProjectItem from '../../classes/ProjectItem';
import DataStorageHandler from '../../utils/DataStorageHandler';

import './addprojectform.css';

const AddProjectForm = () => {

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('project-title').value;
    const description = document.getElementById('project-desc').value;

    try {
      if (title === '' || title.length > 50) {
        throw new Error ('Input error: invalid project name.')
      }
  
      if (description.length > 500) {
        throw new Error ('Input error: invalid project description.')
      }

      const newProject = new ProjectItem({ title, description });

      const projects = DataStorageHandler.loadData();
      projects.push(newProject);
      DataStorageHandler.saveData(projects);

      location.reload();

    } catch (e) {
      console.log(e.message);
    }    
  };

  const render = () => {
    // Clear earlier content from the main-content element
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = '';

    // Add div element for create project 'form'
    const formElem = document.createElement('div');
    formElem.id = 'add-project-form'
    formElem.classList.add('flex-dir-col');

    // Add form title
    const title = document.createElement('div');
    title.classList.add('heading-2')
    title.innerText = 'Create new project:';
    formElem.appendChild(title);
    
    // Add project title input field
    const titleInputLabel = document.createElement('label');
    titleInputLabel.setAttribute('for', 'project-title');
    titleInputLabel.innerText = 'Title:';
    formElem.appendChild(titleInputLabel);
    const titleInput = document.createElement('input');
    titleInput.name = 'project-title';
    titleInput.id = 'project-title';
    formElem.appendChild(titleInput);

    // Add project description input field
    const descriptionInputLabel = document.createElement('label');
    descriptionInputLabel.setAttribute('for', 'project-desc');
    descriptionInputLabel.innerText = 'Description:';
    formElem.appendChild(descriptionInputLabel);
    const descInput = document.createElement('input');
    descInput.name = 'project-desc';
    descInput.id = 'project-desc';
    formElem.appendChild(descInput);

    // Add row container for the action buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex-dir-row');
    buttonContainer.classList.add('flex-justify-sb');
    
    // Add cancel button
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('secondary-btn');
    const cancelButtonLabel = document.createTextNode('Cancel');
    cancelButton.appendChild(cancelButtonLabel);
    cancelButton.addEventListener("click", () => location.reload() );
    buttonContainer.appendChild(cancelButton);

    // Add submit button
    const submitButton = document.createElement('button');
    submitButton.classList.add('primary-btn');
    const submitButtonLabel = document.createTextNode('Save');
    submitButton.appendChild(submitButtonLabel);
    submitButton.addEventListener("click", (e) => { handleOnSubmit(e) });
    buttonContainer.appendChild(submitButton);

    // Add button container on the form element
    formElem.appendChild(buttonContainer);

    // Append form element on the page
    mainContainer.appendChild(formElem);
  };

  return render();
};

export default AddProjectForm;