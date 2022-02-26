import './index.css'

const SkillItem = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skill-item">
      <img src={imageUrl} alt={name} className="skill-img" />
      <div>
        <p className="skill-name">{name}</p>
      </div>
    </li>
  )
}

export default SkillItem
