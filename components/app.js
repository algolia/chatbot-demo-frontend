import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  connectSearchBox,
  Configure,
  connectHits,
  Index,
  StateResults,
} from 'react-instantsearch-dom'

import appStyles from './App.module.css'

// optional chaining eg:  allSearchResults?.product?.hits.length


const SearchBox = ({ currentRefinement, isSearchStalled, refine, query }) => {
  console.log('QUERY: ', query);
  // setAccessories(query);
  // console.log('accessory', accessories);
  // refine is a function. Look at the docs
  // refine(query)
  // refine('shirt');
  // return null means render no html to the page, but we maintain the functionality
  return null
}

// const CustomSearchBoxProduct = connectSearchBox(SearchBox)
// const CustomSearchBoxProductAccessories = connectSearchBox(SearchBox)

const Container = () => {
  const [highlightedAccessory, setHighlightedAccessory] = useState([]);
  console.log('HIGHLIGHT: ', highlightedAccessory);

  const Hits = ({ hits }) => {

    console.log('HITS: ', hits);
  
    // useEffect(() => {
    //   // if (hits[0] !== undefined){
    //     setHighlightedAccessory(hits[0]);
    //   // }
    // }, []);
    
    return (
      <div className={appStyles.carouselContainer}>
        {hits.map((hit) => (
          <div key={hit.objectID}>
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
    <div id="container" className={appStyles.container}>
        <Index indexName="chatbot-demo" indexId="product">
          <Configure
            filters="colour:silver"
            hitsPerPage={3}
          />
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
          {/* <CustomSearchBoxProduct query={router.query.product} /> */}
          <CustomHitsProduct />
        </Index>
          {/* accessories row */}
        <div id="upsell-product" className={appStyles.upsellproduct}>
          <Index indexName="chatbot-demo" indexId="accessories">
            <Configure
              filters="category:smart_accessories"
              hitsPerPage={3}
            />
            {/* <div id="buy-together" className={appStyles.buytogether}>
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
            </div> */}
            {/* This search renders the correct data but is not dynamic. Filtering by category is doing the work here */}
            {/* <CustomSearchBoxProductAccessories query='' /> */}
            <CustomHitsAccessories />
            {/* We want to take the received query params and plug them into a search query that runs when we load the page (useEffect?) */}
            {/* <div id="main-product" className={appStyles.mainproduct}>
              CAROUSEL WITH THREE
              {router.query.product}
            </div> */}
          </Index>
          {/* TODO: CAROUSEL WITH THREE ACCESSORIES */}
        </div>
      </div>
  )
}

const App = () => {
  // const [highlightedAccessory, setHighlightedAccessory] = useState([]);
  // console.log('HIGHLIGHT: ', highlightedAccessory);
  

  const searchClient = algoliasearch(
    '853MYZ81KY',
    '1bc06bbf6de499f6b826a8a0e6902568'
  )
  // const router = useRouter()
  // console.log(router.query, router.asPath)
  // let searchTerms = router.query
  // const showSearchTerms = (searchTerms) => {
  // for (let [key, value] of Object.entries(searchTerms)) {
  //   console.log(key, value)
  // }
  // }

  return (
    <InstantSearch searchClient={searchClient} indexName="chatbot-demo">
      {/* search row */}
      <Container />
    </InstantSearch>
  )
}
export default App
