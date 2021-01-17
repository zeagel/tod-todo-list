import ProjectItem from './ProjectItem';
import TodoItem from './TodoItem';

const DataStorageHandler = (() => {
  
  const saveData = (data) => {
    localStorage.setItem(
      'MHoTodoListApp', JSON.stringify(data)
    );
  };
  
  const loadData = () => {

    const projectList = [];

    if (localStorage.getItem('MHoTodoListApp')) {
      
      const data = JSON.parse(localStorage.getItem('MHoTodoListApp'));
      
      data.forEach(d => {
        
        const projectItem = new ProjectItem({
          title: d.title,
          id: d.id,
          description: d.description,
          todoList: d.todoList
        })

        projectList.push(projectItem);

      });
  
    } else {
      // Add some initial test data.
      const todoItem = new TodoItem({
        title: 'Test todo item #1',
        description: 'Description for test todo item #1',
        priority: 'HIGH',
        dueDate: '24-Dec-2023'
      });

      todoItem.addNote({
        text: 'Test note #1 for test todo item #1'
      });

      const projectItem = new ProjectItem({
        title: 'Test project #1',
        description: 'Description for test project #1',
        todoList: [todoItem]
      });
  
      projectList.push(projectItem);

      saveData([projectItem]);
    }

    return projectList;
  };
  
  const resetStorage = () => {
    localStorage.removeItem('MHoTodoListApp');
  };

  return {
    saveData,
    loadData,
    resetStorage
  };

})();

export default DataStorageHandler;