import DataStorageHandler from '../../utils/DataStorageHandler';
import ProjectList from '../ProjectList/ProjectList';

import './app.css';

const App = () => {

  // Load project list from local storage (if available)
  const projects = DataStorageHandler.loadData();

  const render = () => {
    // Display project list
    ProjectList({ projects });
  };

  return render();

};

export default App;