console.log('[DRAWPEN]: Extended toolbar page loading...');

const toolbar = document.getElementById('toolbar');
const closeAppButton = toolbar.querySelector('.toolbar__close');
const switchToDrawButtons = toolbar.querySelectorAll('.toolbar__main-button button');

closeAppButton.addEventListener('click', () => {
  window.electronAPI.invokeCloseApp();
});

switchToDrawButtons.forEach(button => {
  button.addEventListener('click', () => {
    window.electronAPI.invokeDrawMode();
  });
});
