import Project from "../Project/Project";
import DataStorageHandler from '../../utils/DataStorageHandler';
import AddNoteForm from '../AddNoteForm/AddNoteForm';
import NoteList from '../NoteList/NoteList';
import Notification from '../Notification/Notification';
import PriorityTag from '../PriorityTag/PriorityTag';
import DueDateTag from '../DueDateTag/DueDateTag';

import './todo.css';

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

    // Add button for returning project.
    const backButton = document.createElement('button');
    backButton.id = 'back-to-project-btn';
    backButton.classList.add('secondary-btn');
    const backButtonLabel = document.createTextNode('Back');
    backButton.appendChild(backButtonLabel);
    backButton.addEventListener("click", () => { Project({ project }) } );
    mainContent.appendChild(backButton);

    // Add container element for the todo to be displayed.
    const todoContainer = document.createElement('div');
    todoContainer.id = project.id;
    todoContainer.classList.add('todo-container');

    // Add todo heading row for title and delete-todo button
    const todoHeadingRow = document.createElement('div');
    todoHeadingRow.classList.add('flex-dir-row');
    todoHeadingRow.classList.add('flex-justify-sb');

    // Title
    const titleElem = document.createElement('div');
    const title = document.createElement('div');
    title.classList.add('heading-2');
    title.innerText = todo.title;
    titleElem.appendChild(title);
    const subTitle = document.createElement('div');
    subTitle.classList.add('flex-dir-row', 'tag-row');
    console.log(PriorityTag({ priority: todo.priority }));
    subTitle.appendChild(PriorityTag({ priority: todo.priority }));
    if (todo.dueDate) {
      subTitle.appendChild(DueDateTag({ date: todo.dueDate })); 
    }
    titleElem.appendChild(subTitle);
    todoHeadingRow.appendChild(titleElem);

    // Button
    const delButton = document.createElement('button');
    delButton.id = 'del-todo-btn';
    const delButtonLabel = document.createTextNode('Delete todo');
    delButton.appendChild(delButtonLabel);
    delButton.addEventListener("click", () => { handleDeleteOnClick() } );
    todoHeadingRow.appendChild(delButton);
    
    // Append title and button on the row
    todoContainer.appendChild(todoHeadingRow);

    // Row for todo description
    if (todo.description) {
      const descElem = document.createElement('div');
      descElem.classList.add('todo-description');
      descElem.innerText = todo.description;
      todoContainer.appendChild(descElem);
    }
    
    const notesContainer = document.createElement('div');
    notesContainer.classList.add('notes-container');
    
    // Add todo notes heading row (title and add-note button)
    const notesHeadingRow = document.createElement('div');
    notesHeadingRow.classList.add('flex-dir-row');
    notesHeadingRow.classList.add('flex-justify-sb');

    // Title
    const noteTitle = document.createElement('div');
    noteTitle.classList.add('heading-2');
    noteTitle.innerText = 'Notes:';
    notesHeadingRow.appendChild(noteTitle);

    // Button
    const addButton = document.createElement('button');
    addButton.id = 'add-note-btn';
    addButton.classList.add('primary-btn');
    const addButtonLabel = document.createTextNode('New note');
    addButton.appendChild(addButtonLabel);
    addButton.addEventListener("click", () => { AddNoteForm({ project, todo }) } );
    notesHeadingRow.appendChild(addButton);
    
    // Append title and button on the row
    notesContainer.appendChild(notesHeadingRow);

    // Add all todo's note-items (if any)
    const noteListElement = NoteList({ notes: todo.notes });
    if (noteListElement) {
      notesContainer.appendChild(noteListElement);
    }
    
    todoContainer.appendChild(notesContainer);
    
    // Show project element on the screen.
    document.getElementById('main-content').appendChild(todoContainer);
  };

  return render();
};

export default Todo;