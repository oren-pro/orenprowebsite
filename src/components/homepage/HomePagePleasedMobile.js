import React from 'react';
import { Route } from 'react-router-dom';

export class HomePagePleasedMobile extends React.Component {

    render () {
        const { homepage, homepageOrigin, action, onChange, field } = this.props;
        const changedBorder = homepage.pleasedText !== homepageOrigin.pleasedText ? "edit__changed__bg" : "edit__bg";
        return (
            <div className="homepage__pleased-box mobile_inline">
                <div className="homepage__pleased__background__mobile">
                    <img className="homepage__pleased__background__image" src="https://res.cloudinary.com/orenpro/image/upload/v1537511790/pleased_bg_mobile.jpg" alt="אורן ורינת הפקות - נעים להכיר - רקע" />
                    <div className="homepage__pleased__yellow-bg" />
                </div>
                <div className="homepage__pleased__content-box">
                    <div className="homepage__pleased__body">
                        <img className="homepage__pleased__header__mobile" src="/images/homepage/pleased/pleased_header_mobile.png" alt="אורן ורינת הפקות - נעים להכיר" />
                        {
                            this.props.isAuthenticated === true ?
                            <div className="homepage__pleased__content" dir="rtl">
                                <div className={changedBorder}>
                                    <textarea
                                        data-name={field}
                                        data-action={action}
                                        placeholder="טקסט ׳נעים להכיר׳"
                                        value={homepage.pleasedText}
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                            :
                            <div className="homepage__pleased__content" dir="rtl">
                                <textarea
                                    readOnly
                                    value={homepage.pleasedText}
                                />
                            </div>
                        }
                        <div className="homepage__pleased__footer">
                            <Route render={({ history }) => (
                                <button 
                                    type='button'
                                    className="homepage__pleased__button"
                                    data-name="greenArrow"
                                    onMouseEnter={this.props.setIconRatioOn}
                                    onMouseLeave={this.props.setIconRatioOut}
                                    onClick={() => { history.push('/about') }}
                                >
                                    <img className="homepage__pleased__button__image" src="/images/homepage/pleased/pleased_more.svg" alt="קרא עוד" />
                                    <p className="homepage__pleased__button__text Heebo-Regular">קרא עוד</p>
                                    
                                </button> 
                            )} />
                        </div>
                    </div>
                    
                </div>
                
            </div>
    )}
};

export default HomePagePleasedMobile;