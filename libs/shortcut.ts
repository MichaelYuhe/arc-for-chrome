type ShortcutKey = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  handler: () => void;
};

export function registerShortcut(shortcut: ShortcutKey) {
  document.addEventListener('keydown', (event) => {
    const matchKey = event.key.toLowerCase() === shortcut.key.toLowerCase();
    const matchCtrl = !!shortcut.ctrl === event.ctrlKey;
    const matchShift = !!shortcut.shift === event.shiftKey;
    const matchAlt = !!shortcut.alt === event.altKey;
    const matchMeta = !!shortcut.meta === event.metaKey;

    if (matchKey && matchCtrl && matchShift && matchAlt && matchMeta) {
      event.preventDefault();
      event.stopPropagation();
      shortcut.handler();
    }
  });
}
