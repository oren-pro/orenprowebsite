import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import { startSendMessage } from '../../actions/messages';

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


const currentDate = new Date();

export class ContactForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            email: '',
            message: '',
            createdAt: '',
            error: '',
            mailSentModalIsOpen: false
        }
    }
    onNameChange = (e) => {
        const name = e.target.value;
        this.setState(() => ({ name }));
    };
    onPhoneChange = (e) => {
        const phone = e.target.value;
        this.setState(() => ({ phone }));
    };
    onEmailChange = (e) => {
        const email = e.target.value;
        this.setState(() => ({ email }));
    };
    onMessageChange = (e) => {
        const message = e.target.value;
        this.setState(() => ({ message }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.name || !this.state.phone || !this.state.email) {
            //set error state to 'Please provide description and amount'
            this.setState(() => ({ error: 'נא למלא שדות חובה (*)' }));
        } else {
            //cleare error message
            this.setState(() => ({ error: '' }));
            this.onSendMail({
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                message: this.state.message,
                createdAt: currentDate
            });
        }
    };
    onToggleMailSentModal = () => {
        if (this.state.mailSentModalIsOpen) {
            initializeReactGA(this.props.location);
        } else {
            //initializeReactGA(`${this.props.location}-specific-contact-thank-you-page`);;
            initializeReactGA(`contact-contact-thank-you-page`);
        }

        this.setState({
            mailSentModalIsOpen: !this.state.mailSentModalIsOpen
        });
    }
    onSendMail = (userMessage) => {
        this.props.startSendMessage(userMessage).then((res) => {
            this.onToggleMailSentModal();
        });
    };
    render() {
        return (
            <div className={`contact__form__box--${this.props.style}`}>

                <Modal
                    open={this.state.mailSentModalIsOpen}
                    onClose={this.onToggleMailSentModal}
                    center
                    classNames={{
                        overlay: 'custom-overlay',
                        modal: 'contact__modal__container',
                        closeButton: 'contact__modal__close__button'                     
                    }}
                >
                    <div className="events__eventshare__button__box">
                        <button 
                            type='button'
                            className="events__eventshare__button"
                            data-name="greenArrow"
                            onClick={this.onToggleMailSentModal}
                        >
                            <img className="contact__modal__button__image__x" src="/images/eventspage/close.svg" alt="סגירה" />
                        </button> 
                    </div>
                    <img className="contact__confirm__image" src="/images/contact/contact-confirm.svg" alt="אישור" />
                    <img className="contact__confirm__seperator" src="/images/contact/contact-confirm-seperator.png" alt="קו הפרדה" />
                    <h2 className="contact__confirm__header Heebo-Medium" dir="rtl">איזה כיף,</h2>
                    <h4 className="contact__confirm__text Heebo-Medium" dir="rtl">עשיתם צעד ראשון לאירוע מוצלח!<br />ניצור עמכם קשר בהקדם</h4>
                    <img className="contact__confirm__seperator" src="/images/contact/contact-confirm-seperator.png" alt="קו הפרדה" />
                    <h3 className="contact__confirm__footer Heebo-Medium">אורן ורינת</h3>
                </Modal>

                <h3 className={`contact__form__header--${this.props.style} Heebo-Medium`}>שלחו הודעה</h3>
                {this.state.error && <p className={`contact__error--${this.props.style} Heebo-Regular`}>{this.state.error}</p>}
                <form className={`contact__form--${this.props.style}`} onSubmit={this.onSubmit} dir="rtl">
                    <div>
                        <input
                            type="text"
                            placeholder="*שם:"
                            value={this.state.name}
                            onChange={this.onNameChange}
                        />
                        <input
                            type="text"
                            placeholder="*טלפון:"
                            value={this.state.phone}
                            onChange={this.onPhoneChange}
                        />
                        <input
                            type="email"
                            placeholder="*דוא״ל:"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                    </div>
                    <textarea
                        placeholder="הודעה:"
                        value={this.state.message}
                        onChange={this.onMessageChange}
                    >
                    </textarea>
                    <button hidden={this.props.style==='page'} className={`contact__button--${this.props.style} desktop`}>שלח >></button>
                    <button hidden={this.props.style==='page'} className={`contact__button--${this.props.style} mobile`}>שלח</button>
                    {
                        this.props.style === "page" ?
                    
                            <button
                                className={`contact__imagebutton--${this.props.style} desktop_flex`}
                                data-name="greenArrow"
                                onMouseEnter={this.props.setIconRatioOn}
                                onMouseLeave={this.props.setIconRatioOut}
                            >
                                <p className="contact__imagebutton__text Heebo-Regular">שלח</p>
                                <img className="contact__imagebutton__image" src="/images/contact/arrowWhite.svg" alt="שלח" />
                            </button>

                        :

                            null

                    }
                    <button hidden={this.props.style==='strip'} className={`contact__button__mobile--${this.props.style} Heebo-Medium mobile`}>שלח</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startSendMessage: (message) => dispatch(startSendMessage(message))
});

export default connect(undefined, mapDispatchToProps)(ContactForm);