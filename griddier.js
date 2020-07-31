const adjustCellTotals = (cellColumns = document.querySelector('#cellColumns').value, cellRows = document.querySelector('#cellRows').value) => {
  let difference = cellColumns*cellRows - document.querySelector('main').childElementCount
  if(difference>0) while (difference--) document.querySelector('main').appendChild(document.createElement("div"))
  else if(difference<0) while (difference++) document.querySelector('main').removeChild(document.querySelector('main').lastElementChild)
}

const adjustCellRows = ({target: {value}}) => {
  document.documentElement.style.setProperty("--cellRows", value)
  adjustCellTotals(undefined, value)
}
document.querySelector('#cellRows').addEventListener('change', adjustCellRows)

const adjustCellColumns = ({target: {value}}) => {
  document.documentElement.style.setProperty("--cellColumns", value)
  adjustCellTotals(value, undefined)
}
document.querySelector('#cellColumns').addEventListener('change', adjustCellColumns)
