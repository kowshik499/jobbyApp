import './index.css'

const FilterItem = props => {
  const {onChangeCheckboxInput, itemDetails} = props
  const {label, employmentTypeId} = itemDetails
  const onClickCheckbox = event => {
    onChangeCheckboxInput(event.target.value)
  }
  return (
    <li className="filter-input-cont">
      <input
        type="checkbox"
        id={employmentTypeId}
        onChange={onClickCheckbox}
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId} className="filter-input-label">
        {label}
      </label>
    </li>
  )
}

export default FilterItem
