import React from 'react';

const gotoFacebook = () => {
    if (typeof(window) !== "undefined") {
        window.open('https://www.facebook.com/oren.pro/');
    }
}
const gotoInstagram = () => {
    if (typeof(window) !== "undefined") {
        window.open('https://www.instagram.com/oren_rinat_pro/');
    }
}


const ContactFollow = (props) => (
    <div className={`contact__follow__box--${props.style}`}>
        <div className={`contact__follow__facebook__icon--${props.style}__hover`} />
        <div className={`contact__follow__instagram__icon--${props.style}__hover`} />
        <h3 className={`contact__follow__header--${props.style} Heebo-Medium`}>עקבו אחרינו</h3>
        <div className={`contact__follow__icon__box--${props.style}`}>
            <div
                className={`contact__follow__instagram__icon--${props.style}`}
                onClick={gotoInstagram}
            />
            <div
                className={`contact__follow__facebook__icon--${props.style}`}
                onClick={gotoFacebook}
            />
        </div>
    </div>
);

export default ContactFollow;