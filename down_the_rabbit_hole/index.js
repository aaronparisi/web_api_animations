const $alice = document.getElementById('alice'),
  $tunnel = document.getElementById('tunnel')

const aliceTumbling = [
  {
    transform: 'rotate(0) translate3D(-50%, -50%, 0)',
    color: '#000000' 
  },
  {
    color: '#431236',
    offset: 0.3
  },
  {
    transform: 'rotate(360deg) translate3D(-50%, -50%, 0)',
    color: '#000000' 
  }
]
const aliceTiming = {
  duration: 3000,
  iterations: Infinity,
  easing: 'linear' // linear is the default FYI
}
const tunnelTunneling = [
  {
    transform: 'translate3D(0, 0, 0)'
  },
  {
    transform: 'translate3D(0, -300px, 0)'
  }
]
const tunnelTiming = {
    duration: 3000,
    iterations: Infinity
}

$alice.animate(aliceTumbling, aliceTiming)
$tunnel.animate(tunnelTunneling, tunnelTiming)
