const configureStripe = require('stripe')

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
  ? 'pk_test_r6n7NVEjd8tiY9LhQ5sSnH4E'
  : 'sk_test_5mPvzP2oYa9ki3YKrEVmUNcV'

const stripe = configureStripe(STRIPE_SECRET_KEY)

module.exports = stripe
