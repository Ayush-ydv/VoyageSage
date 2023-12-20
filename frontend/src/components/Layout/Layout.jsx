import React from 'react'
import Header from './../Header/Header'
import Routers from '../../router/Routers'
import Footer from './../Footer/Footer'
import TranslationApp from '../../shared/TranslationApp'
import ConversionComponent from '../../shared/ConversionComponent'
import WeatherCard from '../../shared/WeatherCard'

const Layout = () => {
   return (
      <>
         <ConversionComponent />
         <Header />
         <Routers />
         <TranslationApp />
         <WeatherCard />
         <Footer />      
      </>
   )
}

export default Layout