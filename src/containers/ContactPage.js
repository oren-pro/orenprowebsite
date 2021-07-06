import React from 'react';
import { connect } from 'react-redux';
import ContactForm from '../components/contactpage/ContactForm';
import ContactFollow from '../components/contactpage/ContactFollow';
import ContactContact from '../components/contactpage/ContactContact';
import CustomersStrip from '../components/common/CustomersStrip';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';
import { startSendMessage } from '../actions/messages';


import ReactGA from 'react-ga';

function initializeReactGA(url) {
    //ReactGA.initialize('UA-2975885-3');
    ReactGA.initialize([{
        trackingId: 'UA-2975885-3'
    }, 
    {
        trackingId: 'AW-806706295'
    }]);
    ReactGA.pageview(url);
}


export class ContactPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentLocation: ''
        }
    }

    componentDidMount = () => {

        initializeReactGA('/contact');
        this.setState({
            currentLocation: '/contact'
        });

        //window.scrollTo(0, 0);
    }

    render() {
        return (
            <div className="container-fluid">
                <Navigation />
                <div className="contactpage__structure">
                    <div className="contactpage__container">
                        <ContactForm
                            style='page'
                            location='contact'
                        />
                        <ContactContact
                            style='page'
                        />
                        <ContactFollow
                            style='page'
                        />
                    </div>
                </div>
                <CustomersStrip />
                <Footer />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startSendMessage: (message) => dispatch(startSendMessage(message))
});

export default connect(undefined, mapDispatchToProps)(ContactPage);