import {Component} from 'react'
import {BsFillStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {ImNewTab} from 'react-icons/im'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Head from '../Head'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getUpdatedData = data => {
    const jobData = {
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      id: data.job_details.id,
      jobDescription: data.job_details.job_description,
      location: data.job_details.location,
      packagePerAnnum: data.job_details.package_per_annum,
      rating: data.job_details.rating,
      title: data.job_details.title,
      lifeAtCompany: {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      },
      skills: data.job_details.skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      })),
    }
    const similarJobs = data.similar_jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      location: eachJob.location,
      title: eachJob.title,
      rating: eachJob.rating,
      jobDescription: eachJob.job_description,
    }))
    return {jobData, similarJobs}
  }

  getJobDetails = async () => {
    this.setState({apiStatus: statusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getUpdatedData(data)
      console.log(updatedData)
      this.setState({
        jobData: updatedData.jobData,
        similarJobsData: updatedData.similarJobs,
        apiStatus: statusConstants.success,
      })
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  renderFailureView = () => (
    <div className="jobs-failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-head">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.getJobDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
    } = jobData
    return (
      <>
        <div className="job-cont">
          <div className="job-cont-1">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="job-cont-2">
            <div>
              <h1 className="description-head">Description</h1>
            </div>
            <div className="visit-cont">
              <div>
                <a href={companyWebsiteUrl} className="visit-text">
                  Visit
                </a>
              </div>
              <div>
                <ImNewTab className="visit-icon" />
              </div>
            </div>
          </div>
          <p className="description-para">{jobDescription}</p>
          <h1 className="description-head">Skills</h1>
          <ul className="skills-cont">
            {skills.map(skill => (
              <SkillItem skillDetails={skill} key={skill.name} />
            ))}
          </ul>
          <div className="life-at-company-cont">
            <div className="life-at-company-data">
              <h1 className="description-head">Life at Company</h1>
              <p className="description-para">{lifeAtCompany.description}</p>
            </div>
            <img
              src={lifeAtCompany.imageUrl}
              alt="life at company"
              className="life-at-company-img"
            />
          </div>
        </div>
        <div className="similar-jobs-head-cont">
          <h1 className="similar-jobs-head">Similar Jobs</h1>
        </div>
        <ul className="similar-jobs-cont">
          {similarJobsData.map(job => (
            <SimilarJobItem jobDetails={job} key={job.id} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstants.success:
        return this.renderSuccessView()
      case statusConstants.inProgress:
        return this.renderLoadingView()
      case statusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Head />
        <div className="app-cont">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobDetails
