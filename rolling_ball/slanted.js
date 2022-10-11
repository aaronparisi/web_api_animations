// DOM
const $ball = document.getElementById('ball')
const $ballOffsetSlider = document.getElementById('ball-offset')
const $floor = document.getElementById('floor')
const $floorAngleSlider = document.getElementById('floor-angle')
const ballStyle = getComputedStyle($ball)
const floorStyle = getComputedStyle($floor)
const viewWidth = document.documentElement.clientWidth
let floorAngle,
  ballOffset

// HELPERS
const getFloorTransformVals = () => {
  let floorTransform = floorStyle.getPropertyValue('transform')
  return floorTransform.split('(')[1].split(')')[0].split(',');
}
const calcFloorAngle = () => {
  let floorTransformVals = getFloorTransformVals()
  let floorAngle = Math.round(Math.atan2(floorTransformVals[1],floorTransformVals[0]) * (180/Math.PI))

  return floorAngle
}
const calcBallOffsets = () => {
  let floorAngleRadians = (Math.PI * floorAngle) / 180
  let newBallOffsetX = Math.cos(floorAngleRadians) * ballOffset
  let newBallOffsetY = Math.sin(floorAngleRadians) * ballOffset

  return [newBallOffsetX, newBallOffsetY]
}
const adjustBall = () => {
  ballOffset = $ballOffsetSlider.value

  let ballOffsets = calcBallOffsets()
  $ball.style.setProperty('--ball-angle', `${floorAngle}deg`)
  $ball.style.setProperty('--ball-dx', `${ballOffsets[0]}px`)
  $ball.style.setProperty('--ball-dy', `${ballOffsets[1]}px`)
}
const onFloorTilt = () => {
  floorAngle = Number($floorAngleSlider.value)
  $floor.style.setProperty('--floor-angle', `${floorAngle}deg`)

  adjustBall()
}
const onBallOffset = () => {
  adjustBall()
}

// SETUP
onBallOffset()
onFloorTilt()

// LISTENERS
$ballOffsetSlider.addEventListener('input', onBallOffset)
$floorAngleSlider.addEventListener('input', onFloorTilt)
