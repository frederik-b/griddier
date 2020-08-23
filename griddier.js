class gridCell extends HTMLElement {
  click() {
    console.log(`gridCell ${this.column} ${this.row} clicked`, this)
    if (this.classList.contains('phantom')) {
      this.classList.remove('phantom')
      // new cells, go clockwise
      gridCell.new(this.parentNode, Number(this.column)  , Number(this.row)-1)// top
      gridCell.new(this.parentNode, Number(this.column)+1, Number(this.row)-1+(this.column&1))// right top
      gridCell.new(this.parentNode, Number(this.column)+1, Number(this.row)+(this.column&1))// right bottom
      gridCell.new(this.parentNode, Number(this.column)  , Number(this.row)+1)// bottom
      gridCell.new(this.parentNode, Number(this.column)-1, Number(this.row)+(this.column&1))// left bottom
      gridCell.new(this.parentNode, Number(this.column)-1, Number(this.row)-1+(this.column&1))// left top
      return
    }
    this.classList.toggle('active')
  }
  static new(grid, column, row) {
    if (column < 0 || row < 0) return null
    
    const existingGridCell = grid.querySelector(`grid-cell[column="${column}"][row="${row}"]`)
    if (existingGridCell) return existingGridCell
    
    const newGridCell = document.createElement('grid-cell')
    newGridCell.setAttribute('column', column)
    newGridCell.setAttribute('row', row)
    newGridCell.classList.add('phantom')
    grid.appendChild(newGridCell)
    return newGridCell
  }
  
  static get observedAttributes() {return ['column', 'row']}

  get row() {
    return this.getAttribute('row')
  }
  get column() {
    return this.getAttribute('column')
  }
  
  constructor() {
    super()
  }
  
  connectedCallback() {
    this.style.left = (Number(this.column)* 0.75) * 115.47005 +'px'
    this.style.top = (Number(this.row)+(0.5*(this.column & 1))) * 100 +'px'
    console.log(`gridCell ${this.column} ${this.row} added`, this)
  }

  disconnectedCallback() {
    console.log(`gridCell ${this.column} ${this.row} removed`)
  }

  adoptedCallback() {
    console.log(`gridCell ${this.column} ${this.row} moved`)
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    // console.log('gridCell attributes changed.', name, oldValue, newValue)
  }
}
customElements.define('grid-cell', gridCell)

class gridBody extends HTMLElement {
  _clickCell({target}) {
    if (target instanceof gridCell) target.click()
  }
  
  constructor(config = {rows: 1, columns: 1, cells: [[{active:false, background: '', row: 0, column: 0}]]}) {
    super()
    const shadow = this.attachShadow({mode: 'open'})
    for (const cell of config.cells.flat()) {
      const gridCell = config.cells[cell.column][cell.row] = document.createElement('grid-cell')
      gridCell.setAttribute('column', cell.column)
      gridCell.setAttribute('row', cell.row)
      gridCell.classList.add('phantom')
      
      const linkElem = document.createElement('link')
      linkElem.setAttribute('rel', 'stylesheet')
      linkElem.setAttribute('href', 'griddier.css')

      // Attach the created element to the shadow dom
      shadow.appendChild(linkElem)
      shadow.appendChild(gridCell)
    }
    shadow.addEventListener('click', this._clickCell)
  }
}
customElements.define('grid-body', gridBody)