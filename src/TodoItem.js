import { isValid, format } from 'date-fns';
import { isString } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

export default class TodoItem {

  // Public fields of the class
  title;
  id;
  isOpen;
  description;
  dueDate;
  priority;
  notes;
 
  // Constructor:
  // - title is only mandatory parameter
  // - description, due date and priority are optional parameters
  // - id is generated automatically
  // - new todo item is open by default
  // - notes array is empty by default
  constructor(
    { 
      title,
      id = '',
      isOpen = true,
      description = '',
      dueDate = '',
      priority = 'LOW',
      notes = []
    }
  ) {
    this.title = title;

    id !== ''
      ? this.id = id
      : this.id = uuidv4();
    
    this.isOpen = isOpen;

    this.description = description;
    
    dueDate === ''
      ? this.dueDate = dueDate
      : this.dueDate = format(new Date(this.validateDateValue(dueDate)), 'yyyy-MM-dd');
    
    priority === 'LOW'
      ? this.priority = priority
      : this.priority = this.validatePriorityValue(priority);
    
    notes.length > 0
      ? this.notes = this.validateNotes(notes)
      : this.notes = []; 
  };

  validateNotes (notes) {
    return notes;
  }

  validateDateValue (date) {
    if (!isValid(new Date(date))) {
      throw new Error('Type error: invalid date format.')
    }

    return date;
  }

  validatePriorityValue (priority) {
    if (priority !== 'LOW' && priority !== 'MEDIUM' && priority !== 'HIGH' ) {
      throw new Error('Type error: invalid priority value. Acceptable values: LOW, MEDIUM or HIGH.');
    }

    return priority;
  }

  setPriority ({ priority }) {
    try { 
      this.priority = this.validatePriorityValue(priority);
    } catch (e) {
      console.log(e.message);
    }
  };

  setDueDate ({ date }) {
    try {
      this.dueDate = format(new Date(this.validateDateValue(date)), 'yyyy-MM-dd');
    } catch (e) {
      console.log(e.message);
    }
  };

  addNote ({ text }) {
    try {
      if (!isString(text)) {
        throw new Error('Note creation error: note text is not a string.');
      }

      if (text.length > 50) {
        throw new Error('Note creation error: note text is too long.'); 
      }

      if (text.length === 50) {
        throw new Error('Note creation error: note text cannot be empty.'); 
      }

      const note = {
        id: uuidv4(),
        timestamp: format(new Date(), 'yyyy-MM-dd, HH:mm:ss'),
        text
      }

      this.notes.push(note);

    } catch(e) {
      console.log(e.message);
    }
  };

  deleteNote ({ id }) {
    try {
      const index = this.notes.findIndex(note => note.id === id);
      
      if (index < 0) {
        throw new Error('Note removal error: note not found.');
      }

      this.notes.splice(index, 1);

    } catch (e) {
      console.log(e.message);
    }
  };

  updateNote ({ id, text }) {
    try {
      const index = this.notes.findIndex(note => note.id === id);
      
      if (index < 0) {
        throw new Error('Note update error: note not found.');
      }

      if (!isString(text)) {
        throw new Error('Note update error: note text is not a string.');
      }

      if (text.length > 50) {
        throw new Error('Note update error: note text is too long.');
      }

      if (text.length === 0) {
        throw new Error('Note update error: note text cannot be empty.');
      }

      this.notes[index].text = text;

    } catch (e) {
      console.log(e.message);
    }
  };

  updateTitle ({ title }) {
    try {
      if (!isString(title)) {
        throw new Error('Todo title update error: title is not a string.');
      }

      if (title.length > 50) {
        throw new Error('Todo title update error: title is too long.');
      }

      if (title.length === 0) {
        throw new Error('Todo title update error: title cannot be empty.');
      }

      this.title = title;

    } catch(e) {
      console.log(e.message);
    }
  };

  updateDescription ({ description }) {
    try {
      if (!isString(description) || description.length > 500) {
        throw new Error('Todo description update error: description is not a string.');
      }

      if (description.length > 500) {
        throw new Error('Todo description update error: description is too long.');
      }

      this.description = description;

    } catch(e) {
      console.log(e.message);
    }
  };

  toggleOpenStatus () {
    this.isOpen === true
      ? this.isOpen = false
      : this.isOpen = true
  };
};