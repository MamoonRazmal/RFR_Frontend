import Footer from "./Footer"
import Header from "./Header"
import {Helmet} from "react-helmet";


  import  { Toaster } from 'react-hot-toast';
const Layout=({children,title,description,keywords,author})=>{
    return(
        <div>
            <Helmet>
                <meta charSet="utf-8" />
               <div>
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="Author" content={author} />
</div>

                <title>{title}</title>
                
            </Helmet>
            <Header/>
            <main style={{minHeight:"70vh"}}>

            <Toaster />

            {children}
            </main>
            <Footer  />
        </div>
    )
}
Layout.defaultProps={
    title:'RFR New solution for e-commerce',
    description:"this application is build in MERN Stack",
    keywords:'merm,react,mongodb,html css tailwaind node',
    author:"Nita and Mamoon"
}
export default Layout