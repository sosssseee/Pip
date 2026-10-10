(function () {
  function pip() {
    var v = document.querySelector('video');
    if (!v) return;
    if (v.webkitSetPresentationMode) {
      v.webkitSetPresentationMode(
        v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture'
      );
    } else if (v.requestPictureInPicture) {
      document.pictureInPictureElement ? document.exitPictureInPicture() : v.requestPictureInPicture();
    }
  }

  function inject() {
    var panel = document.querySelector('.player-panel__right');
    if (!panel || panel.querySelector('.pip-btn')) return;
    var b = document.createElement('div');
    b.className = 'player-panel__item selector pip-btn';
    b.textContent = 'PiP';
    b.style.cssText = 'padding:0 1em;font-weight:bold';
    b.addEventListener('click', pip);
    panel.prepend(b);
  }

  new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
})();
