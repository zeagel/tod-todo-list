import { isValid } from 'date-fns';
import Project from '../Project/Project';
import TodoItem from '../../classes/TodoItem';
import DataStorageHandler from '../../utils/DataStorageHandler';

import './addtodoform.css';

const AddTodoForm = ({ project }) => {
  
  const handleOnSubmit = () => {
    const title = document.getElementById('todo-title').value;
    const description = document.getElementById('todo-desc').value;
    const dueDate = document.getElementById('todo-duedate').value;
    const priority = document.getElementById('todo-priority').value;

    try {
      if (title === '' || title.length > 50) {
        throw new Error ('Input error: invalid todo title.')
      }
  
      if (description.length > 500) {
        throw new Error ('Input error: invalid todo description.')
      }

      if (dueDate !== '' && !isValid(new Date(dueDate))) {
        throw new Error ('Input error: invalid due date.')
      }

      if (
        priority !== '' &&
        priority.toLowerCase() !== 'low' &&
        priority.toLowerCase() !== 'medium' &&
        priority.toLowerCase() !== 'high'
      ) {
        throw new Error ('Input error: invalid priority value.')
      }

      // Set properties to todoObject dynamically based.
      // on what user has given. Only title is mandatory.
      // All other parameters in the constructor of TodoItem
      // class are optional (with default values).
      const todoObject = { title };
      
      if (description !== '') {
        todoObject.description = description;
      }

      if (dueDate !== '') {
        todoObject.dueDate = dueDate;
      }

      if (priority !== '') {
        todoObject.priority = priority;
      }

      // Create new todo-item
      const newTodo = new TodoItem(todoObject);

      // Load project data from the local storage
      const projects = DataStorageHandler.loadData();
      
      // Find correct project and push the new todo in the list
      const index = projects.findIndex(p => p.id === project.id);
      projects[index].todoList.push(newTodo);

      // Save updated data to local storage
      DataStorageHandler.saveData(projects);

      // Redirect user back to updated project view
      Project({ project: projects[index] });

    } catch (e) {
      console.log(e.message);
    }  
  };
  
  const render = () => {
   // Clear earlier content from the project container
   document.getElementById(project.id).remove();
 
   // Add div element for create new todo 'form'
   const formElem = document.createElement('div');
   formElem.id = 'add-todo-form'
   formElem.classList.add('flex-dir-col');

   // Add form title
   const title = document.createElement('div');
   title.classList.add('heading-2');
   title.innerText = 'Create new todo:';
   formElem.appendChild(title);
   
   // Add todo title input field
   const titleInputLabel = document.createElement('label');
   titleInputLabel.setAttribute('for', 'todo-title');
   titleInputLabel.innerText = 'Title:';
   formElem.appendChild(titleInputLabel);
   const titleInput = document.createElement('input');
   titleInput.name = 'todo-title';
   titleInput.id = 'todo-title';
   formElem.appendChild(titleInput);

   // Add todo description input field
   const descriptionInputLabel = document.createElement('label');
   descriptionInputLabel.setAttribute('for', 'todo-desc');
   descriptionInputLabel.innerText = 'Description:';
   formElem.appendChild(descriptionInputLabel);
   const descInput = document.createElement('input');
   descInput.name = 'todo-desc';
   descInput.id = 'todo-desc';
   formElem.appendChild(descInput);

    // Add todo due date input field
    const dueDateInputLabel = document.createElement('label');
    dueDateInputLabel.setAttribute('for', 'todo-duedate');
    dueDateInputLabel.innerText = 'Due date:';
    formElem.appendChild(dueDateInputLabel);
    const dueDateInput = document.createElement('input');
    dueDateInput.name = 'todo-duedate';
    dueDateInput.id = 'todo-duedate';
    formElem.appendChild(dueDateInput);

    // Add todo priority input field
    const priorityInputLabel = document.createElement('label');
    priorityInputLabel.setAttribute('for', 'todo-priority');
    priorityInputLabel.innerText = 'Priority:';
    formElem.appendChild(priorityInputLabel);
    const priorityInput = document.createElement('input');
    priorityInput.name = 'todo-priority';
    priorityInput.id = 'todo-priority';
    formElem.appendChild(priorityInput);

   // Add row container for the action buttons
   const buttonContainer = document.createElement('div');
   buttonContainer.classList.add('flex-dir-row');
   buttonContainer.classList.add('flex-justify-sb');

   // Add cancel button
   const cancelButton = document.createElement('button');
   cancelButton.classList.add('secondary-btn');
   const cancelButtonLabel = document.createTextNode('Cancel');
   cancelButton.appendChild(cancelButtonLabel);
   cancelButton.addEventListener("click", () => Project({ project }) );
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
   const mainContainer = document.getElementById('main-content');
   mainContainer.appendChild(formElem);
  };

  return render();
};

export default AddTodoForm;