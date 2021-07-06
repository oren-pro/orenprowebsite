import React from 'react';
import { connect } from 'react-redux';
import ContactForm from './ContactForm';
import ContactFollow from './ContactFollow';
import ContactContact from './ContactContact';
import { startSendMessage } from '../../actions/messages';

export class ContactStrip extends React.Component {
    onSubmit = (userMessage) => {
        this.props.startSendMessage(userMessage);
    };
    render() {
        return (
            <div className="container-fluid contactstrip__box">
                <ContactForm
                    style='strip'
                    location={this.props.location}
                    onSubmit={this.onSubmit}
                />
                <ContactFollow
                    style='strip'
                />
                <ContactContact
                    style='strip'
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startSendMessage: (message) => dispatch(startSendMessage(message))
});

export default connect(undefined, mapDispatchToProps)(ContactStrip);