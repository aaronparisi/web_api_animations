// DOM
const $ball = document.getElementById('ball')
const $ballOffsetSlider = document.getElementById('ball-offset')
const $floor = document.getElementById('floor')
const $floorAngleSlider = document.getElementById('floor-angle')
const ballStyle = getComputedStyle($ball)
const floorStyle = getComputedStyle($floor)
const viewWidth = document.documentElement.clientWidth
let floorAngle,
  ballOffset,
  ballAnimation

// HELPERS
const calcNumRotations = () => {
  let ret = (viewWidth / Math.cos(floorAngle)) / (2 * Math.PI * parseFloat(ballStyle.height))
  if (floorAngle < 0) ret *= -1

  return ret
}
const getFloorTransformVals = () => {
  let floorTransform = floorStyle.getPropertyValue('transform')
  return floorTransform.split('(')[1].split(')')[0].split(',');
}
const calcFloorAngle = () => {
  let floorTransformVals = getFloorTransformVals()
  let floorAngle = Math.round(Math.atan2(floorTransformVals[1],floorTransformVals[0]) * (180/Math.PI))

  return floorAngle
}
const calcFloorAngleRadians = () => {
  return (Math.PI * floorAngle) / 180
}
const calcBallOffsets = (offset = ballOffset) => {
  let floorAngleRadians = calcFloorAngleRadians()
  let newBallOffsetX = Math.cos(floorAngleRadians) * offset
  let newBallOffsetY = Math.sin(floorAngleRadians) * offset

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

  // adjustBall()
  ballAnimation?.cancel()
  ballAnimation = animateBall()
}
const onBallOffset = () => {
  adjustBall()
}

// LISTENERS
$ballOffsetSlider.addEventListener('input', onBallOffset)
$floorAngleSlider.addEventListener('input', onFloorTilt)

// ANIMATION
const genBallKeyframes = () => {
  let numRotations = calcNumRotations()
  if (floorAngle <= 1) numRotations *= -1
  const ballOffsets = calcBallOffsets(-viewWidth/2)
  console.log(ballOffsets)

  return [
    {
      transform: `translateX(${2*ballOffsets[0]}px) translateY(${ballOffsets[1]}px) rotate(${numRotations*360}deg)`
    },
    {
      transform: `translateX(${-2*ballOffsets[0]}px) translateY(${-ballOffsets[1]}px) rotate(${numRotations*-360}deg)`
    }
  ]
}
const genBallOptions = () => {
  return {
      duration: 10000 / Math.abs(floorAngle),
      iterations: Infinity
  }
}
const animateBall = () => {
  return $ball.animate(genBallKeyframes(), genBallOptions())
}

// SETUP
onBallOffset()
onFloorTilt()
