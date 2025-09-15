import React from 'react'
import Hero from '../layout/Hero'
import GenderCollect from '../../products/GenderCollect'
import NewArrivals from '../../products/NewArrivals'

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollect/>
        <NewArrivals/>
    </div>
  )
}

export default Home