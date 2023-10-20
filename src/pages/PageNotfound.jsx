import { Link } from "react-router-dom"
import Layout from "../components/layout/Layout"

const PageNotfound = () => {
  return (
    <Layout title={"PAGE NOT FOUND"}>
      <div className="pnf"> 
      <h1 className="pnf-title">404</h1>
      <h2 className="pnf-heading">OOPS !page not found</h2>
      <Link to='/' className="pnf-btn">Go Back</Link>
      <h1>Page not found</h1>
      </div>
    </Layout>
  )
}

export default PageNotfound
