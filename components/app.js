import React from 'react'
import { useRouter } from 'next/router'
// import styles from './App.module.css'

const App = () => {
  const router = useRouter()

  console.log(router.query, router.asPath)

  return (
    <div id="container" className="container">
      <div
        id="buy-together"
        // className={styles.buytogether}
      ></div>
      <div
        id="main-product"
        //className={styles.mainproduct}
      ></div>
      <div
        id="upsell-product"
        //className={styles.upsellproduct}
      ></div>
      <div
        id="promo-code"
        // className={styles.promocode}
      ></div>
    </div>
  )
}

export default App
