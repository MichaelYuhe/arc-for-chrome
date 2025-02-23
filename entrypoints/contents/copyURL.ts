import { showNotification } from '../../libs/notification';
import { registerShortcut } from '../../libs/shortcut';

function copyURL() {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      showNotification('URL已复制到剪贴板');
    })
    .catch((error) => {
      showNotification('复制失败，请重试', 2000);
    });
}

registerShortcut({
  key: 'c',
  shift: true,
  meta: true,
  handler: copyURL,
});
