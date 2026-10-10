(function () {
  function toast(t) {
    try { Lampa.Noty.show(t); } catch (e) {}
  }

  function pip() {
    var v = document.querySelector('video');
    if (!v) return toast('No video found');
    v.removeAttribute('disablePictureInPicture');
    try {
      if (v.webkitSupportsPresentationMode && v.webkitSupportsPresentationMode('picture-in-picture')) {
        v.webkitSetPresentationMode(
          v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture'
        );
      } else if (document.pictureInPictureEnabled) {
        document.pictureInPictureElement ? document.exitPictureInPicture() : v.requestPictureInPicture();
      } else {
        toast('PiP not supported here');
      }
    } catch (e) {
      toast('PiP error: ' + e.message);
    }
  }

  var btn = document.createElement('div');
  btn.textContent = 'PiP';
  btn.style.cssText =
    'position:fixed;top:16px;right:16px;z-index:99999;padding:10px 16px;' +
    'background:rgba(0,0,0,.6);color:#fff;border-radius:8px;font:bold 16px sans-serif;display:none';
  btn.addEventListener('click', pip);
  btn.addEventListener('touchend', function (e) { e.preventDefault(); pip(); });
  document.body.appendChild(btn);

  setInterval(function () {
    btn.style.display = document.querySelector('video') ? 'block' : 'none';
  }, 1000);

  toast('PiP plugin loaded');
})();
