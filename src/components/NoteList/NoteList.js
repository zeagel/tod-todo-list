import DataStorageHandler from "../../utils/DataStorageHandler";
import Todo from "../Todo/Todo";

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

    // Loop through all notes and generate note rows element
    notes.forEach(n => {
      const row = document.createElement('div');
      
      const timestampElem = document.createElement('div');
      timestampElem.innerText = n.timestamp;
      row.appendChild(timestampElem);

      const textElem = document.createElement('div');
      textElem.innerText = n.text;
      row.appendChild(textElem);

      const delButton = document.createElement('button');
      delButton.classList.add('del-note-btn');
      const delButtonLabel = document.createTextNode('Delete note');
      delButton.appendChild(delButtonLabel);
      delButton.addEventListener("click", () => { handleDeleteNoteOnClick({ id: n.id }) } );
      row.appendChild(delButton);

      notesContainer.appendChild(row);
    });

    return notesContainer;
  };
  
  return render();
};

export default NoteList;