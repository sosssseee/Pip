(function () {
  function pip() {
    var v = document.querySelector('video');
    if (!v) return alert('No video element found');

    var info = [
      'webkitSupports: ' + (v.webkitSupportsPresentationMode ? v.webkitSupportsPresentationMode('picture-in-picture') : 'n/a'),
      'pipEnabled: ' + document.pictureInPictureEnabled,
      'standalone: ' + navigator.standalone,
      'readyState: ' + v.readyState
    ].join('\n');

    v.removeAttribute('disablePictureInPicture');
    try {
      if (v.webkitSetPresentationMode) {
        v.webkitSetPresentationMode(
          v.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture'
        );
        setTimeout(function () {
          alert(info + '\nmode now: ' + v.webkitPresentationMode);
        }, 500);
      } else if (v.requestPictureInPicture) {
        v.requestPictureInPicture().catch(function (e) { alert(info + '\nerror: ' + e.message); });
      } else {
        alert(info + '\nNo PiP API');
      }
    } catch (e) {
      alert(info + '\nerror: ' + e.message);
    }
  }

  var btn = document.createElement('div');
  btn.textContent = 'PiP';
  btn.style.cssText =
    'position:fixed;top:16px;right:16px;z-index:99999;padding:10px 16px;' +
    'background:rgba(0,0,0,.6);color:#fff;border-radius:8px;font:bold 16px sans-serif;display:none';
  btn.addEventListener('click', pip);
  document.body.appendChild(btn);

  setInterval(function () {
    btn.style.display = document.querySelector('video') ? 'block' : 'none';
  }, 1000);
})();
