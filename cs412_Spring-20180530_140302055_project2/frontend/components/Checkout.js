import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { loginActions as actions } from '../actions'
import StripeCheckout from 'react-stripe-checkout'

const PAYMENT_SERVER_URL =  'http://localhost:3000/payment/stripe'

const STRIPE_PUBLISHABLE =  'pk_test_r6n7NVEjd8tiY9LhQ5sSnH4E'
const CURRENCY = 'USD'

class Checkout extends React.Component {
  constructor (props) {
    super()
    this.props = props
  }

  render () {
    const fromEuroToCent = amount => amount * 100

    const successPayment = data => {
      alert("completed payment")
      console.log(data)
    }

    const errorPayment = data => {
      console.log(data)
    }

    const onToken = (amount, description) => token => {
      axios.post(PAYMENT_SERVER_URL,
        {
          description,
          source: token.id,
          card: token.card.id,
          email: token.email,
          currency: CURRENCY,
          amount: fromEuroToCent(amount)
        })
        .then(successPayment)
        .catch(errorPayment)
    }

    return (
      <StripeCheckout
        name={'My First payment'}
        description={'Initial payment'}
        amount={fromEuroToCent(56)}
        token={onToken(56, 'Initial payment')}
        currency={CURRENCY}
        stripeKey={STRIPE_PUBLISHABLE}
      />
    )
  }
}
const mapStateToProps = ({payment}) => payment
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
