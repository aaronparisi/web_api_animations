// DOM
const $ball = document.getElementById('ball')
const $floor = document.getElementById('floor')
const ballStyle = getComputedStyle($ball)
const floorStyle = getComputedStyle($floor)
const viewWidth = document.documentElement.clientWidth
let numRotations = viewWidth / (2 * Math.PI * parseFloat(ballStyle.height))
let prevPlaybackRate = 1
let floorTransformAngle

// HELPERS
const calcFloorAngle = () => {
  let floorTransform = floorStyle.getPropertyValue('transform')
  let floorTransformVals = floorTransform.split('(')[1].split(')')[0].split(',');
  let floorTransformAngle = Math.round(Math.atan2(floorTransformVals[1],floorTransformVals[0]) * (180/Math.PI))

  return floorTransformAngle
}
const onFloorTilt = () => {
  floorTransformAngle = calcFloorAngle()  // in case it's changed
  
  // figure out ball offsets now

  // redo ball animations
}

// SETUP
onFloorTilt()

// KEYFRAMES
const ballKeyframes = [
  {
    transform: `translateX(100vw) rotate(${numRotations*360}deg)`
  },
  {
    transform: `translateX(-100vw) rotate(-${numRotations*360}deg)`
  }
]
const ballOptions = {
  duration: 15000,
  iterations: Infinity,
  playbackRate: prevPlaybackRate
}

// ANIMATIONS
// const ballAnim = $ball.animate(
//   ballKeyframes,
//   ballOptions
// )
// $ball.addEventListener('click', () => {
//   console.log(`current playback: ${ballAnim.playbackRate}`)
//   console.log(`prev playback: ${prevPlaybackRate}`)
//   if (ballAnim.playbackRate === 0) {
//     ballAnim.updatePlaybackRate(prevPlaybackRate)
//     prevPlaybackRate = 0
//   } else {
//     prevPlaybackRate = ballAnim.playbackRate
//     ballAnim.updatePlaybackRate(0)
//   }
// })
// $floor.addEventListener('click', () => {
//   if (ballAnim.playbackRate === 0) return
  
//   ballAnim.updatePlaybackRate(ballAnim.playbackRate * -1)
//   prevPlaybackRate = ballAnim.playbackRate
// })
