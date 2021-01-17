import { head } from "lodash";

const Heading = () => {

  const render = () => {
    const container = document.getElementById('main-content');
  
    const headingElement = document.createElement('h1');
    
    headingElement.innerText = 'The Todo List App';
    
    container.appendChild(headingElement);
  }

  return render();
};

export default Heading;