import React from 'react';
import { Route } from 'react-router-dom';
import ShareLink from 'react-facebook-share-link';
import { WhatsappShareButton } from 'react-share';
 



const EventShareStrip = (props) => (
    
    <div className="event__sharestrip__box">

        <div className="common__intouch__seperator__box__desktop desktop">
            <div className="common__intouch__seperator__desktop desktop"></div>
        </div>
        <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" alt="קו הפרדה" />
        <div className="events__eventshare__share desktop">
            <WhatsappShareButton className="events__eventshare__phone" title='אורן ורינת' separator=' ' url={`https://www.oren-pro.com/${props.location}`} />
            <a href={`mailto:?subject="אורן ורינת הפקות"&body=${props.location}`} target='_blank' className="events__eventshare__mail"> </a>
            <ShareLink link={`https://www.oren-pro.com/${props.location}`}>
            {link => (
                <a href={link} target='_blank' className="events__eventshare__facebook"> </a>
            )}
            </ShareLink>
            <p className="events__eventshare__text Heebo-Regular" dir="rtl">אני חייב לשתף את זה!</p>
        </div>
        <div className="events__eventshare__nav">
            <div className="events__eventshare__button__box">
                <button 
                    type='button'
                    className="events__eventshare__button"
                    data-name="greenArrow"
                    onMouseEnter={props.setIconRatioOn}
                    onMouseLeave={props.setIconRatioOut}
                    onClick={props.navtoCategoryPage}
                >
                    <img className="events__eventshare__button__image__x" src="/images/eventspage/close.svg" alt="סגירה" />
                </button> 
            </div>
            <div hidden={props.currentItems.length<2} className="events__eventshare__button__box">
                <button 
                    type='button'
                    className="events__eventshare__button"
                    data-name="greenArrow"
                    onMouseEnter={props.setIconRatioOn}
                    onMouseLeave={props.setIconRatioOut}
                    onClick={props.gotoPrevEvent}
                >
                    <p className="events__eventshare__button__text Heebo-Regular desktop">לאירוע הקודם</p>
                    <img className="events__eventshare__button__image" src="/images/eventspage/arrowRight.svg" alt="לאירוע הקודם" />
                </button> 
            </div>

            <div hidden={props.currentItems.length<2} className="events__eventshare__button__box">
                <button 
                    type='button'
                    className="events__eventshare__button"
                    data-name="greenArrow"
                    onMouseEnter={props.setIconRatioOn}
                    onMouseLeave={props.setIconRatioOut}
                    onClick={props.gotoNextEvent}
                >
                    <img className="events__eventshare__button__image" src="/images/eventspage/arrowLeft.svg" alt="לאירוע הבא" />
                    <p className="events__eventshare__button__text Heebo-Regular desktop">לאירוע הבא</p>
                    
                </button> 
            </div>
            
        </div>
    </div>
);

export default EventShareStrip;


//{props.eventText}