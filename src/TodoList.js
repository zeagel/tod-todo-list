const TodoList = ({ todos }) => {
  const render = () => {
    
    if (todos.length === 0) {
      return null;
    
    } else {
      const todoContainer = document.createElement('div');
      todoContainer.className = 'todo-container';

      todos.forEach(todo => {
        const todoRow = document.createElement('div');
        todoRow.innerText = `${todo.title}, ${todo.priority}, ${todo.dueDate}`;
        todoContainer.appendChild(todoRow);
      });

      return todoContainer;
    }
  };

  return render();
};

export default TodoList;