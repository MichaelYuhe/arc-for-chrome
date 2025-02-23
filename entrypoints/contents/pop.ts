import { registerShortcut } from '../../libs/shortcut';

(function () {
  let autoPopupEnabled = true;

  chrome.storage.sync.get(['autoPopup'], (data) => {
    autoPopupEnabled = data.autoPopup || true;
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync') {
      if (changes.autoPopup) {
        autoPopupEnabled = changes.autoPopup.newValue;
      }
    }
  });

  function findLinkElement(element: any) {
    while (element && element !== document.body) {
      if (element.tagName?.toLowerCase() === 'a') return element;
      element = element.parentElement;
    }
    return null;
  }

  function handleLinkClick(e: MouseEvent) {
    const link = e.target as HTMLElement;
    const anchor = link.closest('a');

    if (!anchor?.href) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    try {
      chrome.runtime.sendMessage({ type: 'openPopup', url: anchor.href });
    } catch (error) {
      console.log('Extension error:', error);
    }
  }

  document.addEventListener('click', handleLinkClick, true);
  document.addEventListener('auxclick', handleLinkClick, true);

  registerShortcut({
    key: 'o',
    ctrl: true,
    meta: true,
    handler: () => {
      try {
        chrome.runtime.sendMessage({ type: 'openInMainWindow' });
      } catch (error) {
        console.log('Extension error:', error);
      }
    },
  });
})();
