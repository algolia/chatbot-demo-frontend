import React from 'react'
// import { withRouter } from 'next/router'
// import algoliasearch from 'algoliasearch/lite'

import { Head, App } from '../components'

// const searchClient = algoliasearch(
//   '853MYZ81KY',
//   '1bc06bbf6de499f6b826a8a0e6902568'
// )

function Page() {
  return (
    <div>
      <Head title="Home" />
      <App />
    </div>
  )
}

export default Page
