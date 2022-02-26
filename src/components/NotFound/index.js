import Head from '../Head'

import './index.css'

const NotFound = () => (
  <>
    <Head />
    <div className="not-found-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="jobs-failure-head">Page Not Found</h1>
      <p className="jobs-failure-para">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </>
)

export default NotFound
