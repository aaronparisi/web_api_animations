$square = document.getElementById('square')
$button = document.getElementById('button')

const onClick = () => {
  $square.style.setProperty('--squareTX', '200px')
  $square.style.setProperty('--squareScaleX', '3')
  $square.style.setProperty('--squareScaleY', '3')
}

$button.addEventListener('click', onClick)
