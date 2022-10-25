let $box = document.getElementById('box')

$box.addEventListener('click', () => {
  let newRotate = Math.floor(Math.random() * 1080)
  $box.style.setProperty('--box-hue-rotate', `${newRotate}deg`)
})
