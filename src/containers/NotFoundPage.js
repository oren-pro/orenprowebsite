import React from 'react';
import { Route } from 'react-router-dom';
import Footer from '../components/common/Footer';
import Navigation from '../components/common/Navigation';

export class NotFoundPage extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Navigation />
                <div className="pagenotfound__structure">
                    <div className="pagenotfound__box">
                        <div className="pagenotfound__gray__bg"></div>
                        <img className="pagenotfound__image" src="/images/common/page-not-found.png" alt="הדף שביקשת לא נמצא" />
                        <img className="pagenotfound__header__image" src="/images/common/page-not-found-header.svg" alt="הדף שביקשת לא נמצא" />
                        <div className="pagenotfound__goback" dir="rtl">
                            <Route render={({ history}) => (
                                <button 
                                    type='button'
                                    className="pagenotfound__goback__button"
                                    onClick={() => { history.push("/") }}
                                >
                                    <p className="pagenotfound__goback__button__text Heebo-Medium">בחזרה לאתר</p>
                                    <img className="pagenotfound__goback__button__image" src="/images/homepage/events/arrowGreen.svg" alt="בחזרה לאתר" />
                                </button> 
                            )} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default NotFoundPage;


                                    // data-name="greenArrow"
                                    // onMouseEnter={props.setIconRatioOn}
                                    // onMouseLeave={props.setIconRatioOut}