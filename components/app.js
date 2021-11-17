import React from 'react'
import { useRouter } from 'next/router'
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectSearchBox, Hits, Configure, connectHits } from 'react-instantsearch-dom';
// import styles from './App.module.css'

const App = () => {

  const searchClient = algoliasearch(
    '853MYZ81KY',
    '1bc06bbf6de499f6b826a8a0e6902568'
  );

  const router = useRouter()

  console.log(router.query, router.asPath)

  let searchTerms = router.query

  // const showSearchTerms = (searchTerms) => {
    for (let [key,value] of Object.entries(searchTerms)) {
      console.log(key, value);
    };
  // }

  const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
    // refine is a function. Look at the docs
    refine(`${router.query.product}`);
    // refine('shirt');
    // return null means render no html to the page, but we maintain the functionality
    return null;
  };
  
  const CustomSearchBox = connectSearchBox(SearchBox);

  const Hits = ({ hits }) => {
    console.log(hits);
    return (
    <ul>
      {hits.map(hit => (
        <li key={hit.objectID}>
          <img src={hit.full_url_image} alt='no-img'style={{height: '150px'}}/>
          {hit.name}
          {hit.price}
          </li>
      ))}
    </ul>
  )};
  
  const CustomHits = connectHits(Hits);


  return (

    <InstantSearch searchClient={searchClient} indexName="flagship_fashion">
      {/* Most of the received params will be a filter. Unusable filters at this time are: 'collar', 'fulfillment', and 'fit' */}
    <Configure 
      filters='genderFilter:men AND colour:white AND sizeFilter:S'
      hitsPerPage={4} 
    />
    <div id="container" className="container">
      <div
        id="buy-together"
        // className={styles.buytogether}
      >'TODO:bought together</div>
      <CustomSearchBox />

      <CustomHits />
      {/* We want to take the received query params and plug them into a search query that runs when we load the page (useEffect?)  */}
      <div
        id="main-product"
        //className={styles.mainproduct}
      >
        YOU WANT TO BUY A:
        {router.query.product}
      </div>
      <div
        id="upsell-product"
        //className={styles.upsellproduct}
      >TODO: upsell product</div>
      <div
        id="promo-code"
        // className={styles.promocode}
      >TODO: promo code</div>
    </div>

    </InstantSearch>
  )
}

export default App

