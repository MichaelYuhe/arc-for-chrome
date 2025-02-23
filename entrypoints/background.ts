export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.get(['autoPopup'], (result) => {
      if (result.autoPopup === undefined) {
        chrome.storage.sync.set({ autoPopup: true });
      }
    });
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'openPopup' && message.url) {
      openLinkInPopup(message.url);
    } else if (message.type === 'openInMainWindow' && sender.tab?.id) {
      chrome.windows.get(sender.tab.windowId, (popupWindow) => {
        chrome.windows.getAll({ windowTypes: ['normal'] }, (windows) => {
          const mainWindow = windows.find((w) => w.type === 'normal');
          if (mainWindow?.id) {
            chrome.tabs.create({
              url: sender.tab?.url,
              windowId: mainWindow.id,
            });
            if (popupWindow.id) {
              chrome.windows.remove(popupWindow.id);
            }
          }
        });
      });
    }
  });
});

function openLinkInPopup(url: string) {
  chrome.windows.create({
    url: url,
    type: 'popup',
    width: 800,
    height: 600,
  });
}
