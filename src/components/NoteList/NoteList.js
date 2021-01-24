import DataStorageHandler from "../../utils/DataStorageHandler";
import Todo from "../Todo/Todo";

import './notelist.css';

const NoteList = ({ notes }) => {

  const handleDeleteNoteOnClick = ({ id }) => {
 
    // Get latest project list from local storage
    const projects = DataStorageHandler.loadData();

    // Find in which project and in which todo item the
    // note desired to be removed locates. 
    let projectIndex;
    let todoIndex;
    let noteIndex;

    ProjectLoop:
    for (let p = 0; p < projects.length; p++) {
      projectIndex = p;
      TodoLoop:
      for (let t = 0; t < projects[p].todoList.length; t++) {
        todoIndex = t;
        NoteLoop:
        for (let n = 0; n < projects[p].todoList[t].notes.length; n++) {
          noteIndex = n;
          if (projects[p].todoList[t].notes[n].id === id) {
            break ProjectLoop;
          }
        }
      }
    }

    // Delete note
    projects[projectIndex].todoList[todoIndex].deleteNote({ id });

    // Save updated project list back to local storage
    DataStorageHandler.saveData(projects);

    // Redirect user back to todo view
    Todo({ project: projects[projectIndex], todo: projects[projectIndex].todoList[todoIndex] });
  };

  const render = () => {
    
    // Clear note-list container if it exists.
    let notesContainer = document.getElementById('note-list');
    if (notesContainer) {
      notesContainer.innerHTML = '';

    } else {
      // Create container for todo notes
      notesContainer = document.createElement('div');
      notesContainer.id = 'note-list';
    }

    if (notes.length > 0) {
      notesContainer.classList.add('note-grid');

      // Loop through all notes and generate note rows element
      notes.forEach(n => {
        const textElem = document.createElement('div');
        textElem.classList.add('note-text');
        textElem.innerHTML = n.text;
        notesContainer.appendChild(textElem);

        const timestampElem = document.createElement('div');
        timestampElem.classList.add('timestamp');
        timestampElem.innerText = n.timestamp;
        notesContainer.appendChild(timestampElem);
        
        const delIcon = document.createElement('div');
        delIcon.classList.add('del-icon');
        delIcon.addEventListener("click", () => { handleDeleteNoteOnClick({ id: n.id }) } );
        delIcon.innerHTML = '<i class="fas fa-trash-alt"></i>';
        notesContainer.appendChild(delIcon);
      });

    } else {
      const noNotesElem = document.createElement('div');
      noNotesElem.classList.add('no-notes-info');
      noNotesElem.innerText = 'No notes yet';
      notesContainer.appendChild(noNotesElem);
    }

    return notesContainer;
  };
  
  return render();
};

export default NoteList;