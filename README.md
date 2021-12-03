

### URI for the search

?product=shirt&collar=wingtip&fit=slim&fulfillment=delivery&colour=white

- this would be added to your domain, eg www.chatbot.com/



## Use case
The general use case for this application will be:
- a chatbot collects what a user needs (example: white, wingtip classic fit, small size shirt for delivery)
- the chatbot calls a middleware, which generates a URL to this landing page application unique to the user
- the landing page is supplied with search parameters, upsell parameters, and potentially a promotion code.
- the landing page then generates the correct content by searching algolia, and displays the content.
- the URL is provided to the user through the chatbot so they can see the recommendations and complete purchase



## Planned layout
The general layout of this landing page will be:
- A brand logo and banner at the top
- A row of two products with a "one click buy" button to buy both together, then...
- A row of three products with a button for each, then...
- A second row of three products with an add to cart button for each, then...
- A banner showing an already applied promotion code and a sentance description

## Layout example
An example of the page filled with content will be:
- Clothing brand (smart menswear) logo at the top
- a row containing a single shirt, and a single bowtie (represents the recommended combination for the user)
- a row containing three shirts (represents the three best recommended shirts for the user)
- a row containing three bowties (represents the three best upsell accessories for the user)

## Provided parameters
The application will always be provided with the following parameters:

- user
    - name: Ben
    - age: 20-30
    - customer_segment: city

- product
    - name: shirt
    - fit: classic
    - collar: wingtip
    - colour: white
    - size: small
    - fulfilment: delivery

- upsell
    - name: bowtie
    - colour: black

- promotion
    - code: XYZ
    - amount: 20%
    - applied_to: upsell 
