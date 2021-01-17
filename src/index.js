import App from './App';

App();

/*
import TodoItem from './TodoItem';

import ProjectItem from './ProjectItem';

import './styles.css';

const container = document.getElementById('main-content');
const heading = document.createElement('h1');
heading.innerText = 'The Todo List App';
container.appendChild(heading);

const myProject = new ProjectItem({
  title: 'Test project #1'
})

myProject.addTodoItem({
  title: 'Test todo-item #1'
});

myProject.todoList[0].setPriority({priority: 'MEDIUM'});

myProject.addTodoItem({
  title: 'Test todo-item #2',
  description: 'Foobar Barfoo'
});

myProject.todoList[1].setDueDate({date: '17-Oct-2023'});

myProject.addTodoItem({
  title: 'Test todo-item #3',
  priority: 'HIGH',
});

myProject.addTodoItem({
  title: 'Test todo-item #4',
  dueDate: '2021-03-15'
});

const idToBeRemoved = myProject.todoList[1].id;
myProject.removeTodoItem(idToBeRemoved);

console.log(myProject);

/*
const myTodo = new TodoItem(
  {
    title: 'My first todo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  }
)
console.log(myTodo);

myTodo.toggleOpenStatus();
console.log(myTodo);

myTodo.toggleOpenStatus();
console.log(myTodo);

myTodo.setPriority({ priority: 'MEDIUM' });
console.log(myTodo);

myTodo.setDueDate({ date: '16-Jan-2021' });
console.log(myTodo);

myTodo.addNote({ text: 'Test note #1' });
myTodo.addNote({ text: 'Test note #2' });
myTodo.addNote({ text: 'Test note #3' });
console.log(myTodo);

const idToBeUpdated = myTodo.notes[1].id;
myTodo.updateNote({ id: idToBeUpdated, text: 'bbbbbbbbbb-bbbbbbbbbb-bbbbbbbbbb-bbbbbbbbbb-bbbbbbb' })

const idToBeRemoved = myTodo.notes[1].id;
myTodo.deleteNote({ id: idToBeRemoved });
console.log(myTodo);

myTodo.deleteNote({ id: idToBeRemoved });
console.log(myTodo);
*/
