const baseSize = 16;
function setRem () {
  
  const scale = document.documentElement.clientWidth / 1920;
  if (document.documentElement.clientWidth < 750) {
    document.documentElement.style.fontSize  = document.documentElement.clientWidth*16/750 + 'px'
  } else {
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
  }
}

window.onresize = function () {
    setRem();
}
window.addEventListener('load', setRem, false);
document.addEventListener('DOMContentLoaded', setRem, false);