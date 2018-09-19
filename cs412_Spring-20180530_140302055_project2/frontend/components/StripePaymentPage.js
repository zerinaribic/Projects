import React from 'react'
import Checkout from './Checkout'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container } from 'semantic-ui-react'
import { loginActions as actions } from  '../actions'
import Header from './Header'

class StripePaymentPage extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <Container>
        <Header />
        <Checkout
                name={'Web appp development'}
                description={'Starting the process payment'}
                amount={56}
              />
      </Container>
    )
  }
}
function mapStateToProps (state) {
  return {
    user: state.user,
    loginProps: state.loginProps
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(StripePaymentPage)
