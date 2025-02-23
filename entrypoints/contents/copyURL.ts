import { showNotification } from '../../libs/notification';
import { registerShortcut } from '../../libs/shortcut';

function copyURL() {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      showNotification('URL copied to clipboard');
    })
    .catch((error) => {
      showNotification('Failed to copy, please try again', 2000);
    });
}

registerShortcut({
  key: 'c',
  shift: true,
  meta: true,
  handler: copyURL,
});
