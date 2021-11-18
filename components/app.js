import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  connectSearchBox,
  Configure,
  connectHits,
  Index,
  connectStateResults,
} from 'react-instantsearch-dom'

import appStyles from './App.module.css'

const App = () => {
  const [accessoriesCategory, setAccessoriesCategory] = useState('null')
  const [products, setProducts] = useState(null)
  const [accessories, setAccessories] = useState(null)

  const StateResults = ({ allSearchResults }) => {
    useEffect(() => {
      if (
        allSearchResults &&
        allSearchResults.product &&
        allSearchResults.product.hits.length
      ) {
        setAccessoriesCategory(allSearchResults.product.hits[0].accessories)

        setProducts(allSearchResults.product.hits)
      }

      if (
        allSearchResults &&
        allSearchResults.accessories &&
        allSearchResults.accessories.hits.length
      ) {
        setAccessories(allSearchResults.accessories.hits)
      }
    }, [])

    return null
  }

  const CustomStateResults = connectStateResults(StateResults)

  const searchClient = algoliasearch(
    '853MYZ81KY',
    '1bc06bbf6de499f6b826a8a0e6902568'
  )
  const router = useRouter()

  const SearchBox = ({ currentRefinement, isSearchStalled, refine, query }) => {
    // refine is a function. Look at the docs
    refine(query)
    // return null means render no html to the page, but we maintain the functionality
    return null
  }

  const CustomSearchBoxProduct = connectSearchBox(SearchBox)
  const CustomSearchBoxProductAccessories = connectSearchBox(SearchBox)

  const Hits = ({ hits }) => {
    return (
      <div className={appStyles.carouselContainer}>
        {hits.map((hit) => (
          <div className={appStyles.productContainer} key={hit.objectID}>
            <img src={hit.image} alt="no-img" style={{ height: '150px' }} />
            {hit.name}
            {hit.price}
          </div>
        ))}
      </div>
    )
  }

  const CustomHitsProduct = connectHits(Hits)
  const CustomHitsAccessories = connectHits(Hits)

  return (
    <InstantSearch searchClient={searchClient} indexName="chatbot-demo">
      {/* Most of the received params will be a filter. Unusable filters at this time are: 'collar', 'fulfillment', and 'fit' */}
      <CustomStateResults />
      <div id="container" className={appStyles.container}>
        <div id="buy-together" className={appStyles.buytogethercontainer}>
          <div className={appStyles.carouselContainer}>
            <div className={appStyles.productContainer}>
              {products && (
                <div>
                  <img src={products[0].image} style={{ height: '150px' }} />
                  <p>{products[0].name}</p>
                </div>
              )}
              <p>buy it button</p>
            </div>
            <div className={appStyles.productContainer}>
              {accessories && (
                <div>
                  <img src={accessories[0].image} style={{ height: '150px' }} />
                  <p>{accessories[0].name}</p>
                </div>
              )}
              <p>buy it button</p>
            </div>
          </div>

          <div className={appStyles.productContainer}>
            <p>Buy together and save X%</p>
            <p>Button to buy together</p>
          </div>
        </div>
        <Index indexName="chatbot-demo" indexId="product">
          <Configure
            // filters="genderFilter:men AND colour:white AND sizeFilter:S"
            hitsPerPage={3}
          />
          <CustomSearchBoxProduct query="shirt" />
          <CustomHitsProduct />
          {/* We want to take the received query params and plug them into a search query that runs when we load the page (useEffect?) */}
        </Index>
        <div id="upsell-product" className={appStyles.upsellproduct}>
          <Index indexName="chatbot-demo" indexId="accessories">
            <Configure
              // filters="genderFilter:men AND colour:white AND sizeFilter:S"
              hitsPerPage={3}
              filters={`category:${accessoriesCategory}`}
            />
            <CustomSearchBoxProductAccessories query="" />
            <CustomHitsAccessories />
            {/* We want to take the received query params and plug them into a search query that runs when we load the page (useEffect?) */}
          </Index>
        </div>
      </div>
    </InstantSearch>
  )
}
export default App
