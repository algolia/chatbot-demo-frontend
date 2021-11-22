import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite'
import appStyles from './App.module.css'

const App = () => {
  const [products, setProducts] = useState(null)
  const [accessories, setAccessories] = useState(null)

  const searchClient = algoliasearch(
    '853MYZ81KY',
    '1bc06bbf6de499f6b826a8a0e6902568'
  )
  const index = searchClient.initIndex('chatbot-demo')

  useEffect(() => {
    const fetchProducts = async () => {
      const { hits: productsResponse } = await index.search('shirt')
      setProducts(productsResponse)

      const { hits: accessoriesResponse } = await index.search('', {
        filters: `category:${productsResponse[0].accessories}`,
      })

      setAccessories(accessoriesResponse)
    }

    fetchProducts()
  }, [])

  const router = useRouter()

  const Hits = ({ hits }) => {
    return (
      <div className={appStyles.carouselContainer}>
        {hits.map((hit) => (
          <div className={appStyles.productContainer} key={hit.objectID}>
            <img src={hit.image} alt="no-img" style={{ height: '150px' }} />
            {hit.name}
            {hit.price}
            <a className={appStyles.buybutton}>buy it</a>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={appStyles.outercontainer}>
      <div className={appStyles.banner}>
        <img src="Simple.svg" height="100" className={appStyles.bannerimage} />
        <h2>Welcome, Ben!</h2>
      </div>
      <div id="container" className={appStyles.container}>
        <div id="buy-together" className={appStyles.buytogethercontainer}>
          <h2>Our recommendation</h2>
          <div className={appStyles.carouselContainer}>
            <div className={appStyles.productContainer}>
              {products && products.length && (
                <div>
                  <img src={products[0].image} style={{ height: '150px' }} />
                  <p>{products[0].name}</p>
                </div>
              )}
              <a className={appStyles.buybutton}>buy it</a>
            </div>
            <div className={appStyles.buybothcontainer}>
              <a className={appStyles.buybutton}>
                Buy both together and save 10%
              </a>
            </div>
          </div>
        </div>
        <div id="main-product" className={appStyles.mainproductcontainer}>
          <h2>Your product</h2>
          {products && products.length && <Hits hits={products} />}
        </div>
        <div id="upsell-product" className={appStyles.upsellproductcontainer}>
          <h2>Your accessories</h2>
          {accessories && accessories.length && <Hits hits={accessories} />}
        </div>
      </div>
    </div>
  )
}
export default App
