import { differenceInCalendarDays, format } from 'date-fns';

import './duedatetag.css';

const DueDateTag = ({ date }) => {

  if (!date) {
    return null;
  }
  
  const daysBetween = differenceInCalendarDays(new Date(date), new Date());
  let dueDatePrio = '';

  if (daysBetween <= 3) {
    dueDatePrio = 'high';
  } else if (daysBetween > 3 && daysBetween <= 7) {
    dueDatePrio = 'medium';
  } else {
    dueDatePrio = 'low';
  }

  const render = () => {
    const tagElement = document.createElement('div');
    tagElement.classList.add('duedate-tag', dueDatePrio);
    tagElement.innerText = format(new Date(date), 'dd-MMM-yyyy');
    
    return tagElement;
  };
  
  return render();
};

export default DueDateTag;