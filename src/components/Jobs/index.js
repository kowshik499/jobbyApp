import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import FilterItem from '../FilterItem'
import FilterItem2 from '../FilterItem2'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const statusConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Jobs extends Component {
  state = {
    userProfileDetails: [],
    userProfileStatus: statusConstants.initial,
    jobsListStatus: statusConstants.initial,
    activeEmploymentFilters: [],
    activeSalaryFilter: '',
    searchInput: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsDetails()
  }

  renderUserProfileView = () => {
    const {userProfileStatus} = this.state
    switch (userProfileStatus) {
      case statusConstants.success:
        return this.renderUserProfileSuccessView()
      case statusConstants.loading:
        return this.renderLoadingView()
      case statusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderUserProfileSuccessView = () => {
    const {userProfileDetails} = this.state
    const {name, profileImageUrl, shortBio} = userProfileDetails
    return (
      <div className="profile-success-cont">
        <img src={profileImageUrl} alt={name} className="profile-img" />
        <p className="profile-name">{name}</p>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickProfileRetry = () => {
    this.getProfileDetails()
  }

  renderProfileFailureView = () => (
    <div className="loader-container">
      <button
        className="retry-btn"
        type="button"
        onClick={this.onClickProfileRetry}
      >
        Retry
      </button>
    </div>
  )

  getProfileDetails = async () => {
    this.setState({userProfileStatus: statusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userProfileDetails: updatedData,
        userProfileStatus: statusConstants.success,
      })
    } else {
      this.setState({
        userProfileDetails: [],
        userProfileStatus: statusConstants.failure,
      })
    }
  }

  onChangeEmploymentFilter = filterValue => {
    const {activeEmploymentFilters} = this.state
    const isIncludes = activeEmploymentFilters.includes(filterValue)
    this.setState(prevState => {
      if (isIncludes === true) {
        return {
          activeEmploymentFilters: prevState.activeEmploymentFilters.filter(
            each => each !== filterValue,
          ),
        }
      }
      return {
        activeEmploymentFilters: [
          ...prevState.activeEmploymentFilters,
          filterValue,
        ],
      }
    }, this.getJobsDetails)
  }

  renderEmploymentFilterView = () => (
    <>
      <h1 className="filter-head">Type of Employment</h1>
      <ul className="filters-list">
        {employmentTypesList.map(eachItem => (
          <FilterItem
            onChangeCheckboxInput={this.onChangeEmploymentFilter}
            key={eachItem.employmentTypeId}
            value={eachItem.employmentTypeId}
          >
            {eachItem.label}
          </FilterItem>
        ))}
      </ul>
    </>
  )

  onChangeSalaryFilter = filterValue => {
    this.setState({activeSalaryFilter: filterValue}, this.getJobsDetails)
  }

  renderSalaryRangeFilterView = () => (
    <>
      <h1 className="filter-head">Salary Range</h1>
      <ul className="filters-list">
        {salaryRangesList.map(eachItem => (
          <FilterItem2
            onChangeCheckboxInput={this.onChangeSalaryFilter}
            key={eachItem.salaryRangeId}
            value={eachItem.salaryRangeId}
          >
            {eachItem.label}
          </FilterItem2>
        ))}
      </ul>
    </>
  )

  renderJobsListFailureView = () => (
    <div className="jobs-list-failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="jobs-failure-head">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.getJobsDetails}>
        Retry
      </button>
    </div>
  )

  renderJobsListSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return (
        <div className="jobs-list-failure-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1 className="jobs-failure-head">No Jobs Found</h1>
          <p className="jobs-failure-para">
            We could not find any jobs. Try another filter.
          </p>
        </div>
      )
    }
    return (
      <ul className="job-list-cont">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderJobsListView = () => {
    const {jobsListStatus} = this.state
    switch (jobsListStatus) {
      case statusConstants.success:
        return this.renderJobsListSuccessView()
      case statusConstants.loading:
        return this.renderLoadingView()
      case statusConstants.failure:
        return this.renderJobsListFailureView()
      default:
        return null
    }
  }

  getJobsDetails = async () => {
    this.setState({jobsListStatus: statusConstants.loading})
    const {
      activeEmploymentFilters,
      activeSalaryFilter,
      searchInput,
    } = this.state
    const employmentFiltersString = activeEmploymentFilters.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentFiltersString}&minimum_package=${activeSalaryFilter}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsListStatus: statusConstants.success,
      })
    } else {
      this.setState({jobsList: [], jobsListStatus: statusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchBtn = () => {
    this.getJobsDetails()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="main-cont">
          <div className="jobs-and-filters-cont">
            <div className="filters-cont">
              {this.renderUserProfileView()}
              <hr className="line" />
              {this.renderEmploymentFilterView()}
              <hr className="line" />
              {this.renderSalaryRangeFilterView()}
            </div>
            <div className="jobs-cont">
              <div className="search-input-cont">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  value={searchInput}
                />
                <button
                  type="button"
                  testid="searchButton"
                  className="search-btn"
                  onClick={this.onClickSearchBtn}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobsListView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
