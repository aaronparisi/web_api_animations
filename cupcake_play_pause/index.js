// DOM
const $eatme = document.getElementById('eat-me_sprite'),
  $cupcake = document.getElementById('eat-me'),
  $drinkme = document.getElementById('liquid'),
  $bottle = document.getElementById('bottle'),
  $alice = document.getElementById('alice')

// ALICE
const aliceKeyframes = [
  {
    transform: 'translate(-50%, -50%) scale(0.5)'
  },
  {
    transform: 'translate(-50%, -50%) scale(2)'
  }
]
const aliceOptions = {
  duration: 8000,
  easing: 'ease-in-out',
  fill: 'both'
}
const aliceAnimation = $alice.animate(
  aliceKeyframes,
  aliceOptions
)
aliceAnimation.currentTime = aliceAnimation.effect.getComputedTiming().duration / 2
aliceAnimation.pause()

// EAT ME
const eatmeKeyframes = [
  {
    transform: 'translateY(0)'
  },
  {
    transform: 'translateY(-80%)'
  }
]
const eatmeOptions = {
  fill: 'forwards',
  easing: 'steps(4, end)',
  duration: aliceAnimation.effect.getComputedTiming().duration / 2
}
const eatmeAnimation = $eatme.animate(
  eatmeKeyframes,
  eatmeOptions
)
eatmeAnimation.pause()

// DRINK ME
const drinkmeKeyframes = [
  {
    height: '100%'
  },
  {
    height: '0'
  }
]
const drinkmeOptions = {
  fill: 'forwards',
  easing: 'linear',
  duration: aliceAnimation.effect.getComputedTiming().duration / 2
}
const drinkmeAnimation = $drinkme.animate(
  drinkmeKeyframes,
  drinkmeOptions
)
drinkmeAnimation.pause()

// GAME FNs
const eat = () => {
  aliceAnimation.playbackRate = 1
  aliceAnimation.play()
  eatmeAnimation.play()
}
const stopEating = () => {
  aliceAnimation.pause()
  eatmeAnimation.pause()
}
const drink = () => {
  aliceAnimation.playbackRate = -1
  aliceAnimation.play()
  drinkmeAnimation.play()
}
const stopDrinking = () => {
  aliceAnimation.pause()
  drinkmeAnimation.pause()
}

// LISTENERS
$cupcake.addEventListener('mousedown', eat, false)
$cupcake.addEventListener('mouseup', stopEating, false)
$bottle.addEventListener('mousedown', drink, false)
$bottle.addEventListener('mouseup', stopDrinking, false)
