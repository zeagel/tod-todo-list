import ProjectItem from './ProjectItem';
import DataStorageHandler from './DataStorageHandler';

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
    // Clear project-list element
    const projectListElem = document.getElementById('project-list');
    projectListElem.remove();

    // Add div for create project 'form'
    const formElem = document.createElement('form');

    // Add form title
    const title = document.createElement('h2');
    title.innerText = 'Create new project';
    formElem.appendChild(title);
    
    // Add required input fields
    const titleInputLabel = document.createElement('label');
    titleInputLabel.setAttribute('for', 'project-title');
    titleInputLabel.innerText = 'Title:';
    formElem.appendChild(titleInputLabel);
    const titleInput = document.createElement('input');
    titleInput.name = 'project-title';
    titleInput.id = 'project-title';
    formElem.appendChild(titleInput);

    const descriptionInputLabel = document.createElement('label');
    descriptionInputLabel.setAttribute('for', 'project-desc');
    descriptionInputLabel.innerText = 'Description:';
    formElem.appendChild(descriptionInputLabel);
    const descInput = document.createElement('input');
    descInput.name = 'project-desc';
    descInput.id = 'project-desc';
    formElem.appendChild(descInput);

    // Add submit button
    const button = document.createElement('button');
    const buttonLabel = document.createTextNode('Save');
    button.appendChild(buttonLabel);
    button.addEventListener("click", (e) => { handleOnSubmit(e) });
    formElem.appendChild(button);

    // Append form element on the page
    const mainContainer = document.getElementById('main-content');
    mainContainer.appendChild(formElem);
  };

  return render();
};

export default AddProjectForm;