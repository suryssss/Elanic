import React from 'react'
import Hero from '../layout/Hero'
import GenderCollect from '../../products/GenderCollect'
import NewArrivals from '../../products/NewArrivals'
import BestSeller from '../../products/BestSeller'
import ProductGrid from '../../products/ProductGrid'

const topWearsForWomen=[
  {
    _id:1,
    name:"Product 1",
    price:1000,
    images:[{
      url:"https://picsum.photos/500/500?random=4",
      altText:"Product 1"
    }]
  },
  {
    _id:2,
    name:"Product 2",
    price:2000,
    images:[{
      url:"https://picsum.photos/500/500?random=5",
      altText:"Product 2"
    }]
  },
  {
    _id:3,
    name:"Product 3",
    price:3000,
    images:[{
      url:"https://picsum.photos/500/500?random=9",
      altText:"Product 3"
    }]
  },
  {
    _id:4,
    name:"Product 4",
    price:4000,
    images:[{
      url:"https://picsum.photos/500/500?random=8",
      altText:"Product 4"
    }]
  },
  {
    _id:5,
    name:"Product 5",
    price:1000,
    images:[{
      url:"https://picsum.photos/500/500?random=4",
      altText:"Product 1"
    }]
  },
  {
    _id:6,
    name:"Product 6",
    price:2000,
    images:[{
      url:"https://picsum.photos/500/500?random=5",
      altText:"Product 2"
    }]
  },
  {
    _id:7,
    name:"Product 7",
    price:3000,
    images:[{
      url:"https://picsum.photos/500/500?random=6",
      altText:"Product 3"
    }]
  },
  {
    _id:8,
    name:"Product 8",
    price:4000,
    images:[{
      url:"https://picsum.photos/500/500?random=7",
      altText:"Product 4"
    }]
  },
]

const Home = () => {
  return (
    <div>
        <Hero/>
        <GenderCollect/>
        <NewArrivals/>
        <h2 className='text-3xl text-center font-bold mb-4'>Best Sellers</h2>
        <BestSeller/>
        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>Top Wear's for Women</h2>
          <ProductGrid products={topWearsForWomen}/>
        </div>
    </div>
  )
}

export default Home