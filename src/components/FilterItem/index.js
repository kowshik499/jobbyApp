import './index.css'

const FilterItem = props => {
  const {onChangeCheckboxInput, children, value} = props
  const onClickCheckbox = event => {
    onChangeCheckboxInput(event.target.value)
  }
  return (
    <li className="filter-input-cont">
      <input
        type="checkbox"
        id={value}
        onChange={onClickCheckbox}
        value={value}
      />
      <label htmlFor={value} className="filter-input-label">
        {children}
      </label>
    </li>
  )
}

export default FilterItem
