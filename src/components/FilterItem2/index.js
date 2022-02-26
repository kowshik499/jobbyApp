import './index.css'

const FilterItem2 = props => {
  const {onChangeCheckboxInput, itemDetails} = props
  const {label, salaryRangeId} = itemDetails
  const onClickCheckbox = event => {
    onChangeCheckboxInput(event.target.value)
  }
  return (
    <li className="filter-input-cont">
      <input
        type="radio"
        id={salaryRangeId}
        onChange={onClickCheckbox}
        value={salaryRangeId}
        name="salary"
      />
      <label htmlFor={salaryRangeId} className="filter-input-label">
        {label}
      </label>
    </li>
  )
}

export default FilterItem2
