import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {Link} from 'react-router-dom'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
    id,
  } = jobDetails
  return (
    <li className="similar-job-cont">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="job-cont-1">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="job-cont-1">
              <BsFillStarFill className="job-icon star" />
              <p className="job-title">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="description-head">Description</h1>
        <p className="description-para">{jobDescription}</p>
        <div className="job-cont-1">
          <div className="job-cont-3">
            <MdLocationOn className="job-icon location" />
            <p className="location-text">{location}</p>
          </div>
          <div className="job-cont-3">
            <BsFillBriefcaseFill className="job-icon location" />
            <p className="location-text">{employmentType}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobItem
