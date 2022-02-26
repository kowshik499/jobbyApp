import './index.css'

const FilterItem2 = props => {
  const {onChangeCheckboxInput, children, value} = props
  const onClickCheckbox = event => {
    onChangeCheckboxInput(event.target.value)
  }
  return (
    <li className="filter-input-cont">
      <input
        type="radio"
        id={value}
        onChange={onClickCheckbox}
        value={value}
        name="salary"
      />
      <label htmlFor={value} className="filter-input-label">
        {children}
      </label>
    </li>
  )
}

export default FilterItem2
