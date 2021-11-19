const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
popoutAction()
bannerShow()

$$('.slide-track .btn').forEach((btn, key) => {
  btn.onclick = function (e) {
    const slideContainer = btn
      .closest('.slide-track')
      .querySelector('.slide-container')
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
    const oldMargin = +slideContainer.style.marginLeft.slice(0, -2)
    if (btn.classList.contains('forward')) {
      // 765 ? (width + margin) * (Tổng số lượng - số lượng hiển thị trên màn hình)
      if (oldMargin > -(width + margin) * (quantity - showQuantity)) {
        const newMargin = oldMargin - width - margin
        slideContainer.style.marginLeft = `${newMargin}` + 'px'
      }
    } else {
      if (oldMargin < 0) {
        const newMargin = oldMargin + width + margin
        slideContainer.style.marginLeft = `${newMargin}` + 'px'
      }
    }
  }
})

document.onclick = function (e) {
  if (!e.target.closest('.popout-container')) {
    if (!e.target.classList.contains('control-btn')) {
      $$('.popout-box').forEach(box => box.classList.remove('show'))
    }
  }
}

function popoutAction() {
  const popoutContainers = $$('.popout-container')
  popoutContainers.forEach(container => {
    container.onclick = function (e) {
      const box = e.target.closest('.popout-container').lastElementChild
      if (box.classList.contains('popout-box')) {
        box.classList.add('show')
      }
    }
  })
}

function bannerShow() {
  const controlBtns = $$('.control-btn')
  const bannerContainer = $('.banner-container')
  if (bannerContainer) {
    const bannerWidth = $('.top-banner').clientWidth

    bannerContainer.style.width = `${bannerWidth * controlBtns.length}` + 'px'

    controlBtns.forEach((btn, key) => {
      btn.onclick = function (e) {
        bannerContainer.style.transform = `translateX(${
          key * bannerWidth * -1
        }px)`
        controlBtns.forEach(btn => btn.classList.remove('active'))
        e.target.classList.add('active')
      }
    })

    let i = 1

    setInterval(function () {
      controlBtns[i++].click()

      if (i >= controlBtns.length) i = 0
    }, 5000)
  }
}
