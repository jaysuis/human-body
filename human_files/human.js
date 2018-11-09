let svg = document.getElementById('svg')

let points = []
let addBtn = document.getElementById('add-line-btn')
let colorBodyBtn = document.getElementById('color-body-btn')

let currentColor = 'green'
let currentColorDisplay = document.getElementById('current-color')
let colorBtns = document.getElementsByClassName('color-select-btn')

const SHAPE_OPACITY = 0.9

function makePolygonClickHandler(polygon) {
  return function(e) {
    e.stopPropagation()
    if (polygon.style.fill != currentColor) {
      polygon.style.fill = currentColor
      polygon.setAttribute('fill-opacity', SHAPE_OPACITY)
    }
    else {
      let opacity = polygon.getAttribute('fill-opacity') == SHAPE_OPACITY ? 0 : SHAPE_OPACITY
      polygon.setAttribute('fill-opacity', opacity)
    }
  }
}

let pregeneratedShapes = document.querySelectorAll('polygon')
for (shape of pregeneratedShapes) {
  shape.onclick = makePolygonClickHandler(shape)
}

for (let colorBtn of colorBtns) {
  colorBtn.onclick = function(e) {
    currentColor = e.target.getAttribute('id')
    currentColorDisplay.style['background-color'] = currentColor
  }
}

let bodyColored = false
colorBodyBtn.onclick = function(e) {
  let img_body = document.getElementById('body')
  body.style.filter = bodyColored ? 'grayscale(100%)' : 'grayscale(0)'
  bodyColored = !bodyColored
}

if (addBtn) {
  addBtn.onclick = function(e) {
    let shape = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
    //let shape = document.createElement('polygon')
    let polygonPoints = points.join(' ')
    shape.setAttribute('points', polygonPoints)
    shape.setAttribute('fill-opacity', SHAPE_OPACITY)
    shape.setAttribute('filter', 'url(#blur)')
    shape.style.fill = 'green'

    shape.onclick = makePolygonClickHandler(shape)

    svg.appendChild(shape)
    points = []
    let circles = document.querySelectorAll('circle')
    for (circle of circles) {
      svg.removeChild(circle)
    }
  }

  svg.onclick = function(e) {
    let xpnt = e.layerX
    let ypnt = e.layerY

    let point = `${xpnt},${ypnt}`
    points.push(point)

    let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', xpnt)
    circle.setAttribute('cy', ypnt)
    circle.setAttribute('r', 5)
    circle.setAttribute('fill', 'black')

    svg.appendChild(circle)
  }
}

