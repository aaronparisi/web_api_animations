const $floor = document.getElementById('floor')
const $ball = document.getElementById('ball')
const $floorSlider = document.getElementById('floor-angle')
const $ballSlider = document.getElementById('ball-offset')
const ballStyle = getComputedStyle($ball)
const $animate = document.getElementById('animate')
let floorAngle = $floorSlider.value
let ballOffset = $ballSlider.value
let ballDx = 0
let ballDy = 0
let ballRadius = parseFloat(ballStyle.getPropertyValue('--ball-radius'))
let bigRadius = window.innerWidth * 0.6

const floorAngleRadians = () => {
  return floorAngle * (Math.PI / 180)
}
const calcBallDy = () => {
  return Math.sin(floorAngleRadians()) * ballOffset
}
const calcBallDx = () => {
  return Math.cos(floorAngleRadians()) * ballOffset
}
const calcNumRotations = () => {
  return (Math.PI * ballRadius) / bigRadius
}

const genBallKeyframes = () => {
  const numRotations = calcNumRotations()
  return [
    {
      transform: `translateX() translateY() rotate(${numRotations*360}deg)`
    },
    {
      // 'ending' location
    },
    {
      // 'starting location'
    }
  ]
}

const onFloorTilt = () => {
  floorAngle = $floorSlider.value
  $floor.style.setProperty('--floor-angle', `${floorAngle}deg`)

  onBallOffset()
}
const onBallOffset = () => {
  ballOffset = $ballSlider.value
  $ball.style.setProperty('--ball-angle', `${floorAngle}deg`)
  $ball.style.setProperty('--ball-dx', `${calcBallDx()}px`)
  $ball.style.setProperty('--ball-dy', `${calcBallDy()}px`)
}
const onAnimate = () => {

}

$floorSlider.addEventListener('input', onFloorTilt)
$ballSlider.addEventListener('input', onBallOffset)
$animate.addEventListener('click', onAnimate)
