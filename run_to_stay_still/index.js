// DOM
const $bg1 = document.getElementById('background1')
const $bg2 = document.getElementById('background2')
const $fg1 = document.getElementById('foreground1')
const $fg2 = document.getElementById('foreground2')
const $alice = document.getElementById('red-queen_and_alice_sprite')

// KEYFRAMES + OPTIONS
const sceneryKeyframes = [
  {
    transform: 'translateX(100%)'
  },
  {
    transform: 'translateX(-100%)'
  }
]
const sceneryBgOptions = {
  duration: 360000,
  iterations: 1000000
}
const sceneryFgOptions = {
  duration: 10000,
  iterations: Infinity,
}
const aliceKeyframes = [
  {
    transform: 'translateY(0)'
  },
  {
    transform: 'translateY(-100%)'
  }
]
const aliceOptions = {
  easing: 'steps(7, end)',
  direction: "reverse",
  duration: 600,
  playbackRate: 1,
  iterations: Infinity
}

// ANIMATION
const bg1Animation = $bg1.animate(
  sceneryKeyframes,
  sceneryBgOptions
)
bg1Animation.startTime = -86400000
bg1Animation.currentTime = 86400000 + (bg1Animation.effect.getComputedTiming().duration / 2)
const bg2Animation = $bg2.animate(
  sceneryKeyframes,
  sceneryBgOptions
)
bg2Animation.startTime = -86400000
const fg1Animation = $fg1.animate(
  sceneryKeyframes,
  sceneryFgOptions
)
fg1Animation.currentTime = 86400000 + (fg1Animation.effect.getComputedTiming().duration / 2)
fg1Animation.startTime = -86400000
const fg2Animation = $fg2.animate(
  sceneryKeyframes,
  sceneryFgOptions
)
fg2Animation.startTime = -86400000
const aliceAnimation = $alice.animate(
  aliceKeyframes,
  aliceOptions
)

// GAME FUNCTIONALITY
// // VARS
const sceneries = [fg1Animation, fg2Animation, bg1Animation, bg2Animation];

// // functions
const adjustSceneryPlayback = () => {
  if (aliceAnimation.playbackRate < .8) {
    sceneries.forEach(anim => {
      anim.updatePlaybackRate((1.9/aliceAnimation.playbackRate) * -1);
    });
  } else if (aliceAnimation.playbackRate > 1.2) {
    sceneries.forEach(anim => {
      anim.updatePlaybackRate(aliceAnimation.playbackRate/1.2);
    });
  } else {
    sceneries.forEach(anim => {
      anim.playbackRate = 0;
    });
  }
}
const slowDown = () => {
  if (aliceAnimation.playbackRate > .2) {
    aliceAnimation.updatePlaybackRate(aliceAnimation.playbackRate * .9)
    adjustSceneryPlayback()
    if (sceneries.some(sc => sc.playState === 'finished')) console.log('somebody is \'finished\'')
  }
}
const speedUp = () => {
  if (aliceAnimation.playbackRate < 4) {
    aliceAnimation.updatePlaybackRate(aliceAnimation.playbackRate * 1.1)
    adjustSceneryPlayback()
  }
}

// // listeners, timers, etc.
setInterval(() => {
  slowDown()
}, 1000);
document.addEventListener('click', speedUp)
