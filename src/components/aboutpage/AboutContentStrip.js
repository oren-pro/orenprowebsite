import React from 'react';
import AnimateHeight from 'react-animate-height';
import Textarea from 'react-expanding-textarea';
import $ from 'jquery';
import {getMobileRatio, getDesktopRatio} from '../../reusableFunctions/getRatio';

const shouldHighLight = (org, update) => {
    //console.log('in highlight')
    if ( org === update ) {
        return 'about__content__text Heebo-Regular edit__bg';
    } else {
        return 'about__content__text Heebo-Regular edit__changed__bg';
    }
};

export default class AboutContentStrip extends React.Component {
    
    state = {
        height: 5,
        minHeight: 5
    };

    toggle = () => {
        const { height, minHeight } = this.state;
        this.setState({
            height: height === minHeight ? 'auto' : minHeight,
        });
    };

    onHeightChange = (e) => {
        const line = $('#eventsText').css('line-height').replace('px', '');
        this.setState({
            height: e.target.value === '9999' ? 'auto' : Math.round(e.target.value * line)-3,
            minHeight: e.target.value === '9999' ? 'auto' : Math.round(e.target.value * line)-3
        });
        this.props.setData(e);
    }
 

    componentDidMount = () => {
        const line = $('#eventsText').css('line-height').replace('px', '');
        this.setState({
            height: this.props.aboutpage[this.props.index].linesShow === '9999' ? 'auto' : Math.round(this.props.aboutpage[this.props.index].linesShow * line)-3,
            minHeight: this.props.aboutpage[this.props.index].linesShow === '9999' ? 'auto' : Math.round(this.props.aboutpage[this.props.index].linesShow * line)-3
        });
    }

    render() {
        const { height } = this.state;

        return (
        <div className="about__content__box" dir="rtl">
            <div className="about__content__header__box">
                { 
                    this.props.isAuthenticated === true ? 
                        <div className="about__content__header__in__box">
                            <Textarea
                                className="about__content__header Heebo-Medium"
                                dir="rtl"
                                data-field="header"
                                data-action='setString'
                                data-name={`item${this.props.index}`}
                                data-index={this.props.index}
                                placeholder="תוכן"
                                defaultValue={this.props.aboutpage[this.props.index].header}
                                onChange={ this.props.setData }
                            />
                            <img className="about__content__header__border" src="/images/aboutpage/about-content-header-border.svg" alt="קו הפרדה" />
                        </div>
                    :
                        <div className="about__content__header__in__box">
                            <h2 className="about__content__header Heebo-Medium" dir="rtl">{this.props.aboutpage[this.props.index].header}</h2>
                            <img className="about__content__header__border" src="/images/aboutpage/about-content-header-border.svg" alt="קו הפרדה" />
                        </div>
                }
                
                
            </div>

            <div className="about__content__text__box">
                <AnimateHeight
                    duration={ 500 }
                    height={ height }
                >
                    { 
                        this.props.isAuthenticated === true ? 
                            <Textarea
                                id="eventsText"
                                className={shouldHighLight(this.props.aboutpageOrigin[this.props.index].text, this.props.aboutpage[this.props.index].text)}
                                defaultValue={this.props.aboutpage[this.props.index].text}
                                data-field="text"
                                data-action='setString'
                                data-name={`item${this.props.index}`}
                                data-index={this.props.index}
                                placeholder="תוכן"
                                onChange={ this.props.setData }
                            />
                        :
                             <Textarea
                                id="eventsText"
                                className="about__content__text Heebo-Regular"
                                defaultValue={this.props.aboutpage[this.props.index].text}
                                readOnly
                            />
                    }
                </AnimateHeight>
                    
                <div className="about__content__button__box">
                {
                    this.props.item.footer === '' && this.props.aboutpage[this.props.index].grow === true && <button
                        className="about__content__button"
                        data-name="greenArrow"
                        onMouseEnter={this.props.setIconRatioOn}
                        onMouseLeave={this.props.setIconRatioOut}
                        onClick={ this.toggle }
                    >
                        <img className="about__content__button__image" src="/images/aboutpage/arrowBlack.svg" alt="קראו עוד" />
                    </button>
                }
                </div>

                {
                    this.props.item.footer !== '' && <p className="about__content__footer Heebo-Medium" dir="rtl">{this.props.item.footer}</p>
                }
            </div>

            { 
                this.props.isAuthenticated === true ?
                    <div className="about__text__box__input__lable">
                        <div className="backoffice__toolbar__label">
                            שורות מוצגות 
                        </div>
                        <input
                            id="number"
                            type="number"
                            defaultValue={this.props.aboutpage[this.props.index].linesShow}
                            data-field="linesShow"
                            data-action='setNumber'
                            data-name={`item${this.props.index}`}
                            data-index={this.props.index}
                            onChange={this.onHeightChange}
                        />
                    </div>
                :
                    null
            }
        </div>
        );
    }
}