let $colorBox = document.getElementById('color-box')
let $smallBand = document.getElementById('small-band')
let $mediumBand = document.getElementById('medium-band')
let $largeBand = document.getElementById('large-band')
let $reset = document.getElementById('reset')

$smallBand.addEventListener('click', () => {
  $colorBox.style.setProperty('--bg-translate', '-40%')
})
$mediumBand.addEventListener('click', () => {
  $colorBox.style.setProperty('--bg-translate', '-20%')
})
$largeBand.addEventListener('click', () => {
  $colorBox.style.setProperty('--bg-translate', '0%')
})
$reset.addEventListener('click', () => {
  $colorBox.style.setProperty('--bg-translate', '-50%')
})
