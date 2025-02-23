let currentNotification: HTMLElement | null = null;

function ensureContainer() {
  const containerId = 'extension-notification-container';
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 10000;
    `;
    document.body.appendChild(container);
  }

  return container;
}

export function showNotification(message: string, duration = 3000) {
  const container = ensureContainer();

  // 如果已经有通知在显示，先移除它
  if (currentNotification) {
    container.removeChild(currentNotification);
  }

  // 创建新的通知元素
  const notification = document.createElement('div');
  notification.style.cssText = `
    background: #4CAF50;
    color: white;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    transition: all 0.3s ease-in-out;
  `;

  notification.textContent = message;
  container.appendChild(notification);
  currentNotification = notification;

  // 淡出动画并移除元素
  setTimeout(() => {
    if (notification.parentElement) {
      // 确保元素还在DOM中
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentElement) {
          // 再次确保元素还在DOM中
          container.removeChild(notification);
          if (currentNotification === notification) {
            currentNotification = null;
          }
        }
      }, 300);
    }
  }, duration);
}
