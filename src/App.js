import DataStorageHandler from './DataStorageHandler';
import Heading from './Heading';
import ProjectList from './ProjectList';

import './styles.css';

const App = () => {

  // Load project list from local storage (if available)
  const projects = DataStorageHandler.loadData();
  console.log('project list:', projects);

  const render = () => {
    // Display heading of the application
    Heading();

    // Display project list
    ProjectList({ projects });

    // Display button for creating new project
  };

  return render();

};

export default App;