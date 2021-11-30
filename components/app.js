import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite'
import appStyles from './App.module.css'

const App = () => {
  const [products, setProducts] = useState(null)
  const [accessories, setAccessories] = useState(null)
  
  const router = useRouter()
  
  const searchClient = algoliasearch(
    '853MYZ81KY',
    '1bc06bbf6de499f6b826a8a0e6902568'
    )
    const index = searchClient.initIndex('chatbot-demo')
    
    useEffect(() => {
      
      console.log('QUERY', router.query);

    const fetchProducts = async () => {
      // this if statement prevents the code from running before the query params are populated
      if (router.query?.product) {
        const { hits: productsResponse } = await index.search(`${router.query.product}`)
        console.log(productsResponse)
        setProducts(productsResponse)

        const { hits: accessoriesResponse } = await index.search('', {
          filters: `category:${productsResponse[0].accessories}`,
        })

        setAccessories(accessoriesResponse)
      }
    }

    fetchProducts()
    // run this above block when the router query is updated
  }, [router.query])


  const Hits = ({ hits }) => {
    return (
      <div className={appStyles.carouselContainer}>
        {hits.map((hit) => (
          <div className={appStyles.productContainer} key={hit.objectID}>
            <img src={hit.image} alt="no-img" style={{ height: '150px' }} />
            <p className={appStyles.productName}>{hit.name}</p>
            {hit.price}
            <a className={appStyles.buybutton}>View item</a>
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
          <h2>Our recommendation</h2>
        <div id="buy-together" className={appStyles.buytogethercontainer}>
            <div className={appStyles.buybothbanner}>
              <p>UNIQUE OFFER: Buy both and save 20%</p>
            </div>
          <div className={appStyles.firstcarouselContainer}>
            <div className={appStyles.productContainer}>
              {products && products.length && (
                <>
                  <img src={products[0].image} style={{ height: '150px' }} />
                  <p className={appStyles.productName}>{products[0].name}</p>
                  <div className={appStyles.productDescription}>
                    <p>Size: {products[0].size}</p>
                    <p>Fit: {products[0].fit}</p>
                    <p>Collar: {products[0].collar}</p>
                  </div>
                </>
              )}
              <a className={appStyles.buybutton}>View item</a>
            </div>
            <p className={appStyles.plus}>+</p>
            <div className={appStyles.productContainer}>
              {accessories && accessories.length && (
                <>
                  <img src={accessories[0].image} style={{ height: '100px' }} />
                  <p className={appStyles.productName}>{accessories[0].name}</p>
                </>
              )}
              <a className={appStyles.buybutton}>View item</a>
            </div>
          </div>
          <div className={appStyles.buybothbuttoncontainer}>
            <a className={appStyles.buybothbutton}>
              Buy both in one click with Paypal&trade;
            </a>
          </div>
        </div>
        <div id="main-product" className={appStyles.mainproductcontainer}>
          <h2>Items similar to your product</h2>
          {products && products.length && <Hits hits={products} />}
        </div>
        <div id="upsell-product" className={appStyles.upsellproductcontainer}>
          <h2>Recommended accessories</h2>
          {accessories && accessories.length && <Hits hits={accessories} />}
        </div>
      </div>
    </div>
  )
}
export default App
