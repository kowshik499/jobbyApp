import {Link} from 'react-router-dom'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="job-cont">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="job-cont-1">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <div className="job-cont-2">
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
          <div>
            <p className="job-title">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <p className="description-head">Description</p>
        <p className="description-para">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
