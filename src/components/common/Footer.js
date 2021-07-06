import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => (
    <div className="footer__box">
        <p className="footer__text Heebo-Regular desktop" dir="rtl">
            
            <NavLink to="/מאמרים">מאמרים</NavLink> | כל הזכויות שמורות לאורן ורינת | עיצוב גרפי <a className="footer__link" href="http://hollestudio.co.il/" target="_BLANK">HolleStudio</a> | תכנות frixell | כתיבה שיווקית יפעת בלפורד 
        </p>
        <p className="footer__text Heebo-Regular mobile" dir="rtl">
            <NavLink to="/מאמרים">מאמרים</NavLink> | כל הזכויות שמורות לאורן ורינת <br /> עיצוב גרפי <a className="footer__link" href="http://hollestudio.co.il/" target="_BLANK">HolleStudio</a> | תכנות frixell<br /> כתיבה שיווקית יפעת בלפורד 
        </p>
    </div>
);

export default Footer;