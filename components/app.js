import React from 'react'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  connectSearchBox,
  Hits,
  Configure,
  connectHits,
} from 'react-instantsearch-dom'

import appStyles from './App.module.css'

const App = () => {
  const searchClient = algoliasearch(
    '853MYZ81KY',
    '1bc06bbf6de499f6b826a8a0e6902568'
  )
  const router = useRouter()
  console.log(router.query, router.asPath)
  let searchTerms = router.query
  // const showSearchTerms = (searchTerms) => {
  for (let [key, value] of Object.entries(searchTerms)) {
    console.log(key, value)
  }
  // }
  const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
    // refine is a function. Look at the docs
    refine(`${router.query.product}`)
    // refine('shirt');
    // return null means render no html to the page, but we maintain the functionality
    return null
  }

  const CustomSearchBox = connectSearchBox(SearchBox)
  const Hits = ({ hits }) => {
    console.log(hits)
    return (
      <div className={appStyles.carouselContainer}>
        {hits.map((hit) => (
          <div key={hit.objectID}>
            <img
              src={hit.full_url_image}
              alt="no-img"
              style={{ height: '150px' }}
            />
            {hit.name}
            {hit.price}
          </div>
        ))}
      </div>
    )
  }

  const CustomHits = connectHits(Hits)
  return (
    <InstantSearch searchClient={searchClient} indexName="flagship_fashion">
      {/* Most of the received params will be a filter. Unusable filters at this time are: 'collar', 'fulfillment', and 'fit' */}
      <Configure
        filters="genderFilter:men AND colour:white AND sizeFilter:S"
        hitsPerPage={4}
      />
      <div id="container" className={appStyles.container}>
        <div id="buy-together" className={appStyles.buytogether}>
          <div>
            <p>Shirt</p>
            <p>buy it button</p>
          </div>
          <div>
            <p>Bowtie</p>
            <p>buy it button</p>
          </div>
          <p>Buy together and save X%</p>
          <p>Button to buy together</p>
        </div>
        <CustomSearchBox />
        <CustomHits />
        {/* We want to take the received query params and plug them into a search query that runs when we load the page (useEffect?) */}
        <div id="main-product" className={appStyles.mainproduct}>
          CAROUSEL WITH THREE
          {router.query.product}
        </div>
        <div id="upsell-product" className={appStyles.upsellproduct}>
          TODO: CAROUSEL WITH THREE ACCESSORIES
        </div>
      </div>
    </InstantSearch>
  )
}
export default App
