import React from 'react'
import Header from './../Header/Header'
import Routers from '../../router/Routers'
import Footer from './../Footer/Footer'
import TranslationApp from '../../shared/TranslationApp'
import ConversionComponent from '../../shared/ConversionComponent'

const Layout = () => {
   return (
      <>
         <Header />
         <Routers />
         <TranslationApp />
         <ConversionComponent />
         <Footer />      
      </>
   )
}

export default Layout