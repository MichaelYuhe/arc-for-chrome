import './contents/copyURL';
import './contents/pop';

export default defineContentScript({
  matches: ['<all_urls>'],
  main() {
    const container = document.createElement('div');
    container.id = 'extension-notification-container';
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
    `;
    document.body.appendChild(container);
  },
});
