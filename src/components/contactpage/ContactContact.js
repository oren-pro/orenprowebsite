import React from 'react';

const gotoMail = () => {
    if (typeof(window) !== "undefined") {
        window.location = 'mailto:info@oren-pro.com';
    }
}
const gotoPhone = () => {
    if (typeof(window) !== "undefined") {
        window.location = 'tel:049544588';
    }
}

const gotoWhatsapp = () => {
    if (typeof(window) !== "undefined") {
        window.location = 'https://api.whatsapp.com/send?phone=972502793636&text=אורן ורינת הפקות שלום';
    }
}

const ContactContact = (props) => (
    <div className={`contact__contact__box--${props.style}`}>
        <h3 className={`contact__contact__header--${props.style} Heebo-Medium`}>צרו קשר</h3>
        <div className={`h-over contact__contact__text__line--${props.style}`} onClick={gotoPhone} dir="rtl">
            <p className={`contact__contact__text--${props.style} Heebo-Regular Heebo-Medium-Mobile`} dir="rtl">טלפון משרד</p>
            <p className={`contact__contact__text--${props.style} Heebo-Regular`} dir="rtl">04-9544588/99</p>
        </div>
        <div className={`contact__contact__text__line--${props.style}`} dir="rtl">
            <p className={`contact__contact__text--${props.style} Heebo-Regular Heebo-Medium-Mobile`} dir="rtl">מספר פקס</p>
            <p className={`contact__contact__text--${props.style} Heebo-Regular`} dir="rtl">04-9840437</p>
        </div>
        <div className={`h-over contact__contact__text__line--${props.style}`} onClick={gotoMail} dir="rtl">
            <p className={`contact__contact__text--${props.style} Heebo-Regular Heebo-Medium-Mobile`} dir="rtl">דוא״ל</p>
            <p className={`contact__contact__text--${props.style} Heebo-Regular`} dir="rtl">info@oren-pro.com</p>
        </div>
        <div className={`h-over contact__contact__text__line--${props.style}`} onClick={gotoWhatsapp} dir="rtl">
            <p className={`contact__contact__text--${props.style} Heebo-Regular Heebo-Medium-Mobile`} dir="rtl">ווטסאפ</p>
            <p className={`contact__contact__text--${props.style} Heebo-Regular`} dir="rtl">
                <img className="social__icon" src="/images/contact/whatsapp_white.svg" alt="אורן ורינת הפקות אירועים - לוגו" />
            </p>
        </div>
        {
            console.log('in render - contact contact')
        }
        {
            props.style === 'page' ?
                <img className={`contact__seperator--${props.style}`}  src="/images/contact/contact-seperator.svg" alt="קו הפרדה" />
            :
                null
        }
        
    </div>
);

export default ContactContact;