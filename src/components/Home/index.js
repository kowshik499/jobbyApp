import {Link} from 'react-router-dom'

import Head from '../Head'

import './index.css'

const Home = () => (
  <>
    <Head />
    <div className="home-cont">
      <div className="home-content">
        <h1 className="home-content-head">Find The Job That Fits Your Life</h1>
        <p className="home-content-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs" className="job-link">
          <button type="button" className="find-jobs-btn">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
