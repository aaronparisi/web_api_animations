// variables
let $ghost = document.getElementById('ghost')
let bezierNumbers = [.48, .09, .52, 1.14]

// helpers
let calcP = t => {
  return (1-t)**3 * bezierNumbers[0] + t*bezierNumbers[1]*(3*(1-t)**2) + bezierNumbers[2]*(3*(1-t)*t**2) + bezierNumbers[3]*t**3
}

// callbacks
let onMouseMove = event => {
  for (let i = 0; i < 100; i++) {
    $ghost.style.setProperty('--ghost-translate-x', `${event.screenX}px`)
    $ghost.style.setProperty('--ghost-translate-y', `${event.screenY}px`)
  }
}

// listeners
document.addEventListener('mousemove', onMouseMove)

// we need the illusion of "maintainence" of speed
// i.e. any time we generate a new set of values,
// the initial speed should not be 0 (ease-in), rather,
// something close to (slightly >, slightly <) the previous speed
