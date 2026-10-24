// Native dialogs keep every product on this collection page.
(() => {
  const dialogs = [...document.querySelectorAll('dialog')];
  if (typeof HTMLDialogElement === 'undefined' || !('showModal' in HTMLDialogElement.prototype)) {
    document.documentElement.classList.add('dialog-fallback');
    return;
  }
  let opener;
  function openDialog(dialog, trigger) {
    if (!dialog || dialog.open) return;
    opener = trigger || document.activeElement;
    document.body.classList.add('dialog-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('[data-close]').focus({ preventScroll: true });
    if (dialog.dataset.product) {
      window.dispatchEvent(new CustomEvent('innoxone:product-view', {
        detail: { product: dialog.dataset.product }
      }));
    }
  }
  document.querySelectorAll('[data-open]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      const dialog = document.getElementById(trigger.dataset.open);
      if (!dialog) return;
      event.preventDefault();
      openDialog(dialog, trigger);
    });
  });
  dialogs.forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('a[href],button:not([disabled]),summary,[tabindex="0"]')]
        .filter(element => element.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    });
    let startedOutside = false;
    const outside = event => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    };
    dialog.addEventListener('pointerdown', event => { startedOutside = event.target === dialog && outside(event); });
    dialog.addEventListener('click', event => {
      if (startedOutside && event.target === dialog && outside(event)) dialog.close();
      startedOutside = false;
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      document.querySelector('[data-open="site-menu"]')?.setAttribute('aria-expanded', 'false');
      opener?.focus({ preventScroll: true });
    });
  });
  const menuButton = document.querySelector('[data-open="site-menu"]');
  menuButton?.addEventListener('click', () => menuButton.setAttribute('aria-expanded', 'true'));
  document.querySelectorAll('#site-menu a').forEach(link => link.addEventListener('click', () => {
    document.getElementById('site-menu').close();
  }));
  // Product anchors are shareable; they open a card, never a separate product page.
  function openHash() {
    const id = location.hash.slice(1);
    const dialog = document.getElementById(id);
    if (dialog?.matches('.product-dialog') && !document.querySelector('dialog[open]')) openDialog(dialog);
  }
  openHash();
  window.addEventListener('hashchange', openHash);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-inquiry]');
    if (!link) return;
    window.dispatchEvent(new CustomEvent('innoxone:conversion', {
      detail: { action: link.protocol === 'tel:' ? 'phone' : link.protocol === 'mailto:' ? 'email' : 'inquiry', product: link.dataset.inquiry, section: 'products' }
    }));
  });
})();
