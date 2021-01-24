import './prioritytag.css';

const PriorityTag = ({ priority }) => {
  
  const render = () => {
    const tagElement = document.createElement('div');
    tagElement.classList.add('prio-tag', priority.toLowerCase());
    tagElement.innerText = priority;
    
    return tagElement;
  };
  
  return render();
};

export default PriorityTag;