const Notification = ({ type, messsageText }) => {
  const render = () => {
    // Get message container
    const container = document.getElementById('message-container');

    // Define message block    
    const message = document.createElement('div');
    message.className = type;
    message.innerText = messsageText;

    // Show message on the screen
    container.appendChild(message);
  };

  return render();
};

export default Notification;