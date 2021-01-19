import DataStorageHandler from './DataStorageHandler';
import Todo from './Todo';

const AddNoteForm = ({ project, todo }) => {
  console.log('Add Note clicked, todo:', todo);

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

      console.log(projects[projectIndex].todoList);

      console.log('before:', projects[projectIndex].todoList[todoIndex]);

      projects[projectIndex].todoList[todoIndex].addNote({ text: noteText });

      console.log('after:', projects[projectIndex].todoList[todoIndex].notes);

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
    const title = document.createElement('h2');
    title.innerText = 'Create new note';
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

    // Add submit button
    const submitButton = document.createElement('button');
    const submitButtonLabel = document.createTextNode('Save');
    submitButton.appendChild(submitButtonLabel);
    submitButton.addEventListener("click", () => { handleOnSubmit() });
    buttonContainer.appendChild(submitButton);
    
    // Add cancel button
    const cancelButton = document.createElement('button');
    const cancelButtonLabel = document.createTextNode('Cancel');
    cancelButton.appendChild(cancelButtonLabel);
    cancelButton.addEventListener("click", () => Todo({ project, todo }) );
    buttonContainer.appendChild(cancelButton);

    // Add button container on the form element
    formElem.appendChild(buttonContainer);

    // Append form element on the page
    mainContainer.appendChild(formElem);
  };

  return render();
};

export default AddNoteForm;