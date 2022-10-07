// DOM
const $ball = document.getElementById('ball')
const $floor = document.getElementById('floor')
const ballStyle = getComputedStyle($ball)
const viewWidth = document.documentElement.clientWidth
let numRotations = viewWidth / (2 * Math.PI * parseFloat(ballStyle.height))
let prevPlaybackRate = 1

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
const ballAnim = $ball.animate(
  ballKeyframes,
  ballOptions
)
$ball.addEventListener('click', () => {
  console.log(`current playback: ${ballAnim.playbackRate}`)
  console.log(`prev playback: ${prevPlaybackRate}`)
  if (ballAnim.playbackRate === 0) {
    ballAnim.updatePlaybackRate(prevPlaybackRate)
    prevPlaybackRate = 0
  } else {
    prevPlaybackRate = ballAnim.playbackRate
    ballAnim.updatePlaybackRate(0)
  }
})
$floor.addEventListener('click', () => {
  if (ballAnim.playbackRate === 0) return
  
  ballAnim.updatePlaybackRate(ballAnim.playbackRate * -1)
  prevPlaybackRate = ballAnim.playbackRate
})
