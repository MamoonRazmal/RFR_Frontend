import Layout from "../components/layout/Layout"
import { useAuth } from "../context/Buth"

const Home = () => {
  const[auth,setAuth]=useAuth()
  return (
    <Layout>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth,null,4)}</pre>
    </Layout>
  )
}

export default Home
