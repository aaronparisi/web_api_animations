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
  iterations: Infinity
}
const sceneryFgOptions = {
  duration: 5000,
  iterations: Infinity
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
bg1Animation.currentTime = bg1Animation.effect.getComputedTiming().duration / 2
const bg2Animation = $bg2.animate(
  sceneryKeyframes,
  sceneryBgOptions
)
const fg1Animation = $fg1.animate(
  sceneryKeyframes,
  sceneryFgOptions
)
fg1Animation.currentTime = fg1Animation.effect.getComputedTiming().duration / 2
const fg2Animation = $fg2.animate(
  sceneryKeyframes,
  sceneryFgOptions
)
const aliceAnimation = $alice.animate(
  aliceKeyframes,
  aliceOptions
)

// GAME FUNCTIONALITY
const sceneries = [fg1Animation, fg2Animation, bg1Animation, bg2Animation];
sceneries.forEach(sc => {
  sc.addEventListener('finish', () => {
    console.log('animation "finished"')
    sc.play()
  })
})

var adjustSceneryPlayback = function() {
  if (aliceAnimation.playbackRate < .8) {
    sceneries.forEach(function(anim) {
      anim.updatePlaybackRate((2/aliceAnimation.playbackRate) * -1);
      // anim.updatePlaybackRate(2/aliceAnimation.playbackRate);
    });
  } else if (aliceAnimation.playbackRate > 1.2) {
    sceneries.forEach(function(anim) {
      anim.updatePlaybackRate(2/aliceAnimation.playbackRate);
    });
  } else {
    sceneries.forEach(function(anim) {
      anim.playbackRate = 0;
    });
  }
}
setInterval(() => {
  if (aliceAnimation.playbackRate > .1) {
    aliceAnimation.updatePlaybackRate(aliceAnimation.playbackRate * .9)
    adjustSceneryPlayback()
    // if (sceneries.some(sc => sc.playState === 'finished')) console.log(sceneries.map(sc => sc.id))
  }
}, 1000);

