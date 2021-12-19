const slideContainers = document.querySelectorAll('.slide-container')

slideContainers.forEach((slideContainer) => {
  let isPressed = false
  let startMargin
  let startX
  let newX

  slideContainer.addEventListener('mousedown', (e) => {
    slideContainer.style.transition = 'none'
    isPressed = true
    startX = e.screenX
    startMargin = +slideContainer.style.marginLeft.slice(0, -2)
  })

  window.addEventListener('mousemove', (e) => {
    if (isPressed) {
      newX = e.screenX - startX
      slideContainer.style.marginLeft = startMargin + newX + 'px'
    }
  })

  window.addEventListener('mouseup', () => {
    slideContainer.style.transition = '0.5s'
    isPressed = false
    checkBounding()
  })

  function checkBounding() {
        const width = +getComputedStyle(slideContainer)
      .getPropertyValue('--width')
      .trim()
      .slice(0, -2)
    const margin = +getComputedStyle(slideContainer)
      .getPropertyValue('--marginRight')
      .trim()
      .slice(0, -2)
    const quantity = +getComputedStyle(slideContainer)
      .getPropertyValue('--quantity')
      .trim()
    const showQuantity = +getComputedStyle(slideContainer)
      .getPropertyValue('--showQuantity')
      .trim()
    const maxMargin = -(width + margin) * (quantity - showQuantity)
    if (+slideContainer.style.marginLeft.slice(0, -2) > 0) {
      slideContainer.style.marginLeft = '0px'
    } else if (+slideContainer.style.marginLeft.slice(0, -2) < maxMargin) {
      slideContainer.style.marginLeft = `${maxMargin}px`
    }
  }
})
