import TodoItem from './TodoItem';

import { v4 as uuidv4 } from 'uuid';

export default class ProjectItem {

  // Public fields of the class
  title;
  id;
  description;
  todoList;

  constructor (
    {
      title,
      id = '',
      description = '',
      todoList = []
    }
  ) {
    
    this.title = title;

    id === ''
      ? this.id = uuidv4()
      : this.id = id; 
    
    this.description = description;
    this.todoList = todoList;
  };

  updateTitle ({ title }) {
    try {
      if (!isString(title)) {
        throw new Error('Project title update error: title is not a string.');
      }

      if (title.length > 50) {
        throw new Error('Project title update error: title is too long.');
      }

      if (title.length === 0) {
        throw new Error('Project title update error: title cannot be empty.');
      }

      this.title = title;

    } catch(e) {
      console.log(e.message);
    }
  };

  updateDescription ({ description }) {
    try {
      if (!isString(description) || description.length > 500) {
        throw new Error('Project description update error: description is not a string.');
      }

      if (description.length > 500) {
        throw new Error('Project description update error: description is too long.');
      }

      this.description = description;

    } catch(e) {
      console.log(e.message);
    }
  };

  addTodoItem (todoItemDetails) {
    try {
      const todoItem = new TodoItem(todoItemDetails);
      this.todoList.push(todoItem);
    } catch (e) {
      console.log(e.message);
    }
  };

  removeTodoItem (id) {
    try {
      const index = this.todoList.findIndex(
        todoItem => todoItem.id === id
      );

      this.todoList.splice(index, 1);

    } catch (e) {
      console.log(e.message);
    }
  };
};