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

window.electronAPI.onRefreshSettings((_event, settings) => {
  const direction = settings.tool_bar_direction;
  const orientation = ['up', 'down'].includes(direction) ? 'vertical' : 'horizontal';
  toolbar.classList.remove('toolbar--up', 'toolbar--down', 'toolbar--left', 'toolbar--right', 'toolbar-orient--vertical', 'toolbar-orient--horizontal');
  toolbar.classList.add(`toolbar--${direction}`, `toolbar-orient--${orientation}`);
});
