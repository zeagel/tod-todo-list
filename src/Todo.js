import Project from "./Project";
import DataStorageHandler from './DataStorageHandler';
import AddNoteForm from './AddNoteForm';
import NoteList from './NoteList';
import Notification from './Notification';

const Todo = ({ project, todo }) => {

  const handleDeleteOnClick = () => {
    try {
      // Disable all todo buttons to avoid unecessary error situations.
      document.getElementById('back-to-project-btn').disabled = true;
      document.getElementById('add-note-btn').disabled = true;
      document.getElementById('del-todo-btn').disabled = true;

      // Load latest project list from local storage
      const projects = DataStorageHandler.loadData();

      // Remove the todo from the project
      // - Find project to be modified
      // - Find todo index to be removed
      // - Remove todo pointed by the index
      // - Update project list by replacing the modified project
      const projectToBeUpdated = projects.find(p => p.id === project.id);
      const todoIndex = projectToBeUpdated.todoList.findIndex(t => t.id === todo.id);
      projectToBeUpdated.todoList.splice(todoIndex, 1);
      const updatedProjectList = projects.map(p => {
        if (p.id === projectToBeUpdated.id) {
          return projectToBeUpdated;
        } else {
          return p;
        }
      });

      // Save the updated project list on local storage
      DataStorageHandler.saveData(updatedProjectList);

      // Show message about successfull removal
      Notification({
        type: 'info',
        messsageText: `Todo '${todo.title}' removed successfully.`
      });

      // Redirect user back to updated project view after the timeout
      setTimeout(() => {
        const message = document.getElementById('message-container');
        message.innerHTML = '';
        Project({ project: projectToBeUpdated });
      }, 3500);      
 
    } catch (e) {
      console.log(e.message);
    }
  };
  
  const render = () => {

    // Clear main content
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    // Add container element for the todo to be displayed.
    const todoContainer = document.createElement('div');
    todoContainer.id = project.id;
    todoContainer.classList.add('todo-container');

    // Add button for returning project.
    const backButton = document.createElement('button');
    backButton.id = 'back-to-project-btn';
    const backButtonLabel = document.createTextNode('Back to project');
    backButton.appendChild(backButtonLabel);
    backButton.addEventListener("click", () => { Project({ project }) } );
    todoContainer.appendChild(backButton);

    // Add button for adding a new note-item in todo
    const addButton = document.createElement('button');
    addButton.id = 'add-note-btn';
    const addButtonLabel = document.createTextNode('New note');
    addButton.appendChild(addButtonLabel);
    addButton.addEventListener("click", () => { AddNoteForm({ project, todo }) } );
    todoContainer.appendChild(addButton);
    
    // Add button for removing the todo.
    const delButton = document.createElement('button');
    delButton.id = 'del-todo-btn';
    const delButtonLabel = document.createTextNode('Delete todo');
    delButton.appendChild(delButtonLabel);
    delButton.addEventListener("click", () => { handleDeleteOnClick() } );
    todoContainer.appendChild(delButton);

    // Add todo details container element
    const todoDetailsElem = document.createElement('div');
    todoDetailsElem.classList.add('todo-details');

    // Add todo title element in details
    const titleElem = document.createElement('div');
    titleElem.innerText = todo.title;
    todoDetailsElem.appendChild(titleElem);   
    
    // Add todo due date element in details
    const dueDateElem = document.createElement('div');
    dueDateElem.innerText = todo.dueDate ? todo.dueDate : 'no due date';
    todoDetailsElem.appendChild(dueDateElem);

    // Add todo priority element in details
    const priorityElem = document.createElement('div');
    priorityElem.innerText = todo.priority;
    todoDetailsElem.appendChild(priorityElem);

    // Add todo description element in details (if given)
    if (todo.description) {
      const descElem = document.createElement('div');
      descElem.innerText = todo.description;
      todoDetailsElem.appendChild(descElem);
    }

    // Add all todo's note-items (if any)
    const noteListElement = NoteList({ notes: todo.notes });
    if (noteListElement) {
      todoDetailsElem.appendChild(noteListElement);
    }

    // Add details element in project container.
    todoContainer.appendChild(todoDetailsElem);
    
    // Show project element on the screen.
    document.getElementById('main-content').appendChild(todoContainer);
  };

  return render();
};

export default Todo;