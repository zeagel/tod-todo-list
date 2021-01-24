import Todo from '../Todo/Todo';
import AddTodoForm from '../AddTodoForm/AddTodoForm';

import './todolist.css';

const TodoList = ({ project, todos }) => {
  const render = () => {
    
    if (todos.length === 0) {
      return null;
    
    } else {
      const todoContainer = document.createElement('div');
      todoContainer.className = 'todo-container';

      // Todo heading rowo element for title and add-todo button
      const todoHeadingRow = document.createElement('div');
      todoHeadingRow.classList.add('todo-heading-row');
      todoHeadingRow.classList.add('flex-dir-row');
      todoHeadingRow.classList.add('flex-justify-sb');

      // Title
      const todoListTitle = document.createElement('div');
      todoListTitle.classList.add('heading-3');
      todoListTitle.innerText = 'Todos:';
      todoHeadingRow.appendChild(todoListTitle);

      // Button
      const addButton = document.createElement('button');
      addButton.id = 'add-todo-btn';
      addButton.classList.add('primary-btn');
      const addButtonLabel = document.createTextNode('Add todo');
      addButton.appendChild(addButtonLabel);
      addButton.addEventListener("click", () => { AddTodoForm({ project }) } );
      todoHeadingRow.appendChild(addButton);
      
      // Append title and button on the row
      todoContainer.appendChild(todoHeadingRow);

      // Todo list header row
      const todoListHeader = document.createElement('div');
      todoListHeader.classList.add('todo-list-grid-container');
      todoListHeader.classList.add('todo-list-header');
      todoListHeader.innerHTML = `
        <div>Title</div>
        <div>Priority</div>
        <div>Due date</div>
      `;
      todoContainer.appendChild(todoListHeader);

      todos.forEach(todo => {
        const todoRow = document.createElement('div');
        todoRow.classList.add('todo-list-grid-container');
        todoRow.classList.add('todo-row');
        

        const rowItem1 = document.createElement('div');
        rowItem1.classList.add('custom-checkbox');
        rowItem1.innerHTML = `
          <label class="todo-checkbox-container">
            <input type="checkbox">
            <span class="checkmark"></span>
          </label>
        `;
        todoRow.appendChild(rowItem1);

        const rowItem2 = document.createElement('div');
        rowItem2.classList.add('todo-title');
        rowItem2.addEventListener("click", () => { Todo({ project, todo }) } );
        rowItem2.innerText = todo.title;
        todoRow.appendChild(rowItem2);

        const rowItem3 = document.createElement('div');
        rowItem3.innerText = todo.priority;
        todoRow.appendChild(rowItem3);

        const rowItem4 = document.createElement('div');
        rowItem4.innerText = todo.dueDate;
        todoRow.appendChild(rowItem4);

        todoContainer.appendChild(todoRow);
      });

      return todoContainer;
    }
  };

  return render();
};

export default TodoList;