import React from 'react';
import AnimateHeight from 'react-animate-height';
import Textarea from 'react-expanding-textarea';
import $ from 'jquery';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TextEditorWysiwyg from '../common/TextEditorWysiwyg';

const shouldHighLight = (org, update) => {
    if ( org === update ) {
        return 'edit__bg';
    } else {
        return 'edit__changed__bg';
    }
};

export default class EventsText extends React.Component {
    
    state = {
        height: this.props.showLines * 18,
        minHeight: this.props.showLines * 18,
        categoryText: '',
        showLines: 1,
    };

    toggle = () => {
        const { height, minHeight } = this.state;
        this.setState({
            height: height === minHeight ? 'auto' : minHeight,
        });
    };

    onHeightChange = (e) => {
        this.setHeight(e.target.value);
        this.props.onCategoryShowLinesChange(e);
    }
 
    setHeight = (showLines) => {
        //const line = $('#eventsText').css('line-height').replace('px', '');
        const line = 21;
        this.setState({
            height: Math.round(showLines * line)-3,
            minHeight: Math.round(showLines* line)-3
        });
    }

    componentDidMount = () => {
        this.setHeight(this.props.showLines);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.showLines !== prevProps.showLines && this.props.showLines) {
            this.setHeight(this.props.showLines);
        }
    }

    render() {
        const { height } = this.state;
        //console.log(this.props.showLines);
        return (
            <div className="events__text__box">
                <div className="common__intouch__seperator__box__desktop desktop">
                    <div className="common__intouch__seperator__desktop desktop"></div>
                </div>
                <img className="events__seperator events__seperator__w100 mobile" src="/images/eventspage/events-seperator-mobile.png" alt="קו הפרדה" />
                <div className="events__text__flexbox">
                    <AnimateHeight
                    duration={ 500 }
                    height={ height }>
                        {
                            this.props.isAuthenticated === true ?
                                <TextEditorWysiwyg
                                    action={this.props.action}
                                    name={this.props.field}
                                    text={this.props.categoryText}
                                    textHtml={this.props.categoryTextHtml}
                                    onChange={this.props.onChange}
                                    textAlignment={'center'}
                                />
                            :
                                <div className="homepage__pleased__content" dir="rtl">
                                    <span dangerouslySetInnerHTML={{ __html: this.props.categoryTextHtml }} />
                                </div>
                        }
                    </AnimateHeight>
                </div>
                <div className="events__text__more__box">
                    <button 
                        type='button'
                        className="events__text__button"
                        data-name="greenArrow"
                        onMouseEnter={this.props.setIconRatioOn}
                        onMouseLeave={this.props.setIconRatioOut}
                        onClick={this.toggle}
                    >
                        <img className="events__text__more__button__image" src="/images/aboutpage/arrowBlack.svg" alt="קראו עוד" />
                        <p className="events__text__more__button__text Heebo-Regular">קראו עוד</p>
                    </button>
                </div>
                { 
                    this.props.isAuthenticated === true ? 
                        <div className="events__text__box__input__lable">
                            <div className="backoffice__toolbar__label">
                                שורות מוצגות 
                            </div>
                            <input
                                className={shouldHighLight(this.props.showLinesOrigin, this.props.showLines)}
                                id="number"
                                type="number"
                                value={this.props.showLines ? this.props.showLines : this.state.showLines}
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






// { 
//     this.props.isAuthenticated === true ? 
//         <div className={shouldHighLight(this.props.categoryTextOrigin, this.props.categoryText)}>
//             <Textarea
//                 id="eventsText"
//                 className="events__text Heebo-Regular"
//                 value={this.props.categoryText ? this.props.categoryText : this.state.categoryText}
//                 data-field="text"
//                 data-action='setString'
//                 data-name={`item${this.props.index}`}
//                 data-index={this.props.index}
//                 placeholder="תוכן"
//                 onChange={ this.props.onChange }
//             />
//         </div>

//     :
//         <Textarea
//             id="eventsText"
//             className="events__text Heebo-Regular"
//             value={this.props.categoryText}
//             readOnly
//         />
// }