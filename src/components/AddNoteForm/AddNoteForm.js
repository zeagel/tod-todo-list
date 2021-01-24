import DataStorageHandler from '../../utils/DataStorageHandler';
import Todo from '../Todo/Todo';

import './addnoteform.css';

const AddNoteForm = ({ project, todo }) => {

  const handleOnSubmit = () => {
    const noteText = document.getElementById('note-text').value;

    try {
      if (noteText === '') {
        throw new Error ('Input error: note text cannot be empty.')
      }
  
      if (noteText.length > 50) {
        throw new Error ('Input error: note text is too long.')
      }

      // Load latest project data from the local storage
      const projects = DataStorageHandler.loadData();

      const projectIndex = projects.findIndex(p => p.id === project.id);
      const todoIndex = projects[projectIndex].todoList.findIndex(t => t.id === todo.id);

      projects[projectIndex].todoList[todoIndex].addNote({ text: noteText });

      // Save updated projects back to local storage
      DataStorageHandler.saveData(projects);

      // Redirect user back to todo view
      Todo({ project: projects[projectIndex], todo:  projects[projectIndex].todoList[todoIndex]});

    } catch (e) {
      console.log(e.message);
    }    
  };

  const render = () => {
    // Clear earlier content from main-content
    const mainContainer = document.getElementById('main-content');
    mainContainer.innerHTML = '';

    // Add div element for create note 'form'
    const formElem = document.createElement('div');
    formElem.id = 'add-note-form'
    formElem.classList.add('flex-dir-col');

    // Add form title
    const title = document.createElement('div');
    title.classList.add('heading-2');
    title.innerText = 'Create new note:';
    formElem.appendChild(title);
    
    // Add note text input field
    const titleInputLabel = document.createElement('label');
    titleInputLabel.setAttribute('for', 'note-text');
    titleInputLabel.innerText = 'Note:';
    formElem.appendChild(titleInputLabel);
    const titleInput = document.createElement('input');
    titleInput.name = 'note-text';
    titleInput.id = 'note-text';
    formElem.appendChild(titleInput);

    // Add row container for the action buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('flex-dir-row');
    buttonContainer.classList.add('flex-justify-sb');
   
    // Add cancel button
    const cancelButton = document.createElement('button');
    cancelButton.classList.add('secondary-btn');
    const cancelButtonLabel = document.createTextNode('Cancel');
    cancelButton.appendChild(cancelButtonLabel);
    cancelButton.addEventListener("click", () => Todo({ project, todo }) );
    buttonContainer.appendChild(cancelButton);

     // Add submit button
     const submitButton = document.createElement('button');
     submitButton.classList.add('primary-btn');
     const submitButtonLabel = document.createTextNode('Save');
     submitButton.appendChild(submitButtonLabel);
     submitButton.addEventListener("click", () => { handleOnSubmit() });
     buttonContainer.appendChild(submitButton); 

    // Add button container on the form element
    formElem.appendChild(buttonContainer);

    // Append form element on the page
    mainContainer.appendChild(formElem);
  };

  return render();
};

export default AddNoteForm;