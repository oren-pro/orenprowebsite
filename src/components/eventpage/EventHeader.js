import React from 'react';
import AnimateHeight from 'react-animate-height';
import AutosizeInput from 'react-input-autosize';
import Textarea from 'react-expanding-textarea';
import $ from 'jquery';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';

const shouldHighLight = (org, update) => {
    if ( org === update ) {
        return 'edit__bg';
    } else {
        return 'edit__changed__bg';
    }
};

export default class EventHeader extends React.Component {
    
    state = {
        height: this.props.showLines * 18,
        minHeight: this.props.showLines * 18,
        editorState: EditorState.createEmpty(),
        doneText: false
    };

    toggle = () => {
        const { height, minHeight } = this.state;
        this.setState({
            height: height === minHeight ? 'auto' : minHeight,
        });
    };

    onHeightChange = (e) => {
        this.setHeight(e.target.value);
        this.props.onEventShowLinesChange(e);
    }

    setHeight = (showLines) => {
        //const line = $('#eventsText').css('line-height').replace('px', '');
        const line = 19.8;
        this.setState({
            height: Math.round(showLines * line)-3,
            minHeight: Math.round(showLines* line)-3
        });
    }

    componentDidMount = () => {
        this.setHeight(this.props.showLines);
    }

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (this.props.showLines !== prevProps.showLines) {
            this.setHeight(this.props.showLines);
        }
        if (this.state.doneText === false || this.props.eventId !== prevProps.eventId) {
            if (this.props.eventTextHtml !== prevProps.eventTextHtml || this.props.eventText !== prevProps.eventText) {
                //const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
                const html = this.props.eventTextHtml || this.props.eventText || '';
                const contentBlock = htmlToDraft(html);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    this.setState({ editorState, doneText: true });
                }            
            }
        }
    }
    
    onEditorStateChange = (editorState) => {
        let currentValue = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        this.setState({
            editorState,
        });
        let e = {
            target: {
                value: currentValue,
                dataset: {
                    action: this.props.action,
                    name: this.props.field
                }
            }
        }
        this.props.onEventTextChange(e);
    };

    render() {
        const colorIconData = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iMCAwIDQ5NS41NzggNDk1LjU3OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDk1LjU3OCA0OTUuNTc4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggc3R5bGU9ImZpbGw6I0U2QkU5NDsiIGQ9Ik00MzkuMjA4LDIxNS41NzhjLTQ2Ljk3NS01My41MjktOTYtNjUuOTczLTk2LTEyNWMwLTY0LjMzMy01NC4zMzMtMTEzLjY2Ny0xNDkuNDI5LTc5LjMyMQoJCQlDOTEuODE2LDQ4LjA4MywyMS4yMDgsMTM2LjkxMSwyMS4yMDgsMjQ3LjU3OGMwLDEzNi45NjYsMTExLjAzMywyNDgsMjQ4LDI0OGMyMi41MjcsMCw0NC4zNTQtMy4wMDQsNjUuMDk5LTguNjMybC0wLjAwNi0wLjAyNgoJCQlDNDM5LjIwOCw0NTYuNTc4LDUyNS4yMDgsMzEzLjU3OCw0MzkuMjA4LDIxNS41Nzh6IE0zMzMuNzA5LDE4OS42OWMtMTQuNTAxLDE4LjU1NS01NC42NjgsNy43MDctNzAuMTctMTguNTQ3CgkJCWMtMTMuNjY0LTIzLjE0LTguNjY0LTU2LjIzMiwxNC45ODgtNzAuODIyYzEzLjcxLTguNDU3LDMxLjc5MS0wLjEzNSwzNS4yMzEsMTUuNjAyYzIuOCwxMi44MDYsOC41NDMsMjguNjcxLDIwLjIzOSw0My4xODcKCQkJQzM0MS4xMjUsMTY3Ljk2LDM0MC43MDcsMTgwLjczNiwzMzMuNzA5LDE4OS42OXoiLz4KCTwvZz4KCTxnPgoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGNEYxOTsiIGN4PSIxNjUuMDk4IiBjeT0iMTM1LjY4OCIgcj0iNDcuODkiLz4KCTwvZz4KCTxnPgoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGOEM2MjsiIGN4PSIxNzYuOTQiIGN5PSIxMjMuNzE1IiByPSIxNi43NjIiLz4KCTwvZz4KCTxnPgoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGQ0QwMDsiIGN4PSIxMTcuMDk4IiBjeT0iMjU1LjY4OCIgcj0iNDcuODkiLz4KCTwvZz4KCTxnPgoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0ZGRTY3MTsiIGN4PSIxMjguOTQiIGN5PSIyNDMuNzE1IiByPSIxNi43NjIiLz4KCTwvZz4KCTxnPgoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzAwQzM3QTsiIGN4PSIxNzIuODc5IiBjeT0iMzY3LjQ2OSIgcj0iNDcuODkiLz4KCTwvZz4KCTxnPgoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzYwREM0RDsiIGN4PSIxODQuNzIiIGN5PSIzNTUuNDk2IiByPSIxNi43NjIiLz4KCTwvZz4KCTxnPgoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6IzRDRDdGRjsiIGN4PSIyOTMuMDk4IiBjeT0iNDA3LjY4OCIgcj0iNDcuODkiLz4KCTwvZz4KCTxnPgoJCTxjaXJjbGUgc3R5bGU9ImZpbGw6I0FFRUZGRjsiIGN4PSIzMDQuOTM5IiBjeT0iMzk1LjcxNSIgcj0iMTYuNzYyIi8+Cgk8L2c+Cgk8Zz4KCQk8Y2lyY2xlIHN0eWxlPSJmaWxsOiMwMDlCQ0E7IiBjeD0iMzgxLjA5OCIgY3k9IjMxOS40NjkiIHI9IjQ3Ljg5Ii8+Cgk8L2c+Cgk8Zz4KCQk8Y2lyY2xlIHN0eWxlPSJmaWxsOiM0Q0Q3RkY7IiBjeD0iMzkyLjkzOSIgY3k9IjMwNy40OTYiIHI9IjE2Ljc2MiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=';
        const { height } = this.state;
        return (
            <div className="event__header__box">
                { 
                    this.props.isAuthenticated === true ? 
                        <div className="backoffice__events__header__buttons">
                            <div className="backoffice__toolbar__label">
                                שמירת טקסט 
                            </div>
                            <button className="backoffice__events__header__save__button" onClick={this.props.onUpdateEvent}>
                                <img className="backoffice__events__header__save__icon" src="/images/backoffice/save.svg" alt="שמירה" />
                            </button>
                        </div>
                    :
                        null
                }
                <div className="common__intouch__seperator__box__desktop desktop">
                    <div className="common__intouch__seperator__desktop desktop"></div>
                </div>
                <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" alt="קו הפרדה" />
                <div className="event__header__in__box">
                    <div className="event__header__in__in__box">
                        {
                            this.props.isAuthenticated === true ?
                                <div className={shouldHighLight(this.props.eventNameOrigin, this.props.eventName)}>
                                    <AutosizeInput
                                        className="event__header__input Heebo-Regular"
                                        name="name"
                                        data-name="name"
                                        data-index={this.props.categoryId}
                                        data-field='name'
                                        data-action={this.props.action}
                                        placeholder="שם קטגוריה"
                                        value={this.props.eventName}
                                        onChange={this.props.onEventNameChange}
                                        dir="rtl"
                                    />
                                </div>
                            :
                                <h2 hidden className="event__header Heebo-Regular">{this.props.eventName}</h2>
                        }
                        
                        <div hidden className="common__event__header__seperator__box__desktop">
                            <div className="common__event__header__seperator__desktop"></div>
                        </div>
                    </div>
                </div>


                {
                    this.props.categoryName === "מאמרים" ?
                        this.props.isAuthenticated === true ?
                            <div className={shouldHighLight(this.props.linkNameOrigin, this.props.linkName)}>
                                <AutosizeInput
                                    className="event__link__text__input Heebo-Regular"
                                    name="linkText"
                                    data-name="linkText"
                                    data-index={this.props.categoryId}
                                    data-field='linkText'
                                    data-action={this.props.action}
                                    placeholder="טקסט לקישור"
                                    value={this.props.eventLinkText}
                                    onChange={this.props.onEventLinkTextChange}
                                    dir="rtl"
                                />
                                <AutosizeInput
                                    className="event__link__link__input Heebo-Regular"
                                    name="linkLink"
                                    data-name="linkLink"
                                    data-index={this.props.categoryId}
                                    data-field='linkLink'
                                    data-action={this.props.action}
                                    placeholder="לינק לקישור"
                                    value={this.props.eventLinkLink}
                                    onChange={this.props.onEventLinkLinkChange}
                                    dir="rtl"
                                />
                            </div>
                        :
                            
                            this.props.eventLinkText ?
                                <a className="event__link" href={this.props.eventLinkLink} target="_BLANK">{this.props.eventLinkText} - לחצו כאן</a>
                            :
                                null
                    :
                        null
                }

                <div className="event__text__box">
                    <div className="events__text__flexbox">
                        <AnimateHeight
                        duration={ 500 }
                        height={ height }>
                            <div>
                                <Editor
                                    readOnly={this.props.isAuthenticated !== true}
                                    editorState={this.state.editorState}
                                    toolbarClassName="toolbarClassName"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="editorClassName"
                                    onEditorStateChange={this.onEditorStateChange}
                                    toolbarOnFocus
                                    textAlignment={'center'}
                                    toolbar={{
                                        options: ['blockType', 'fontFamily', 'fontSize', 'colorPicker', 'link'],
                                        textAlign: { inDropdown: true },
                                        link: { inDropdown: true },
                                        blockType: {
                                            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                                            className: "blockTypeClassName",
                                        },
                                        fontSize: {
                                            options: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '48', '60', '72'],
                                            className: "fontSizeClassName",
                                        },
                                        fontFamily: {
                                            options: ['Heebo-Regular', 'Heebo-Medium','Heebo-Bold'],
                                            className: "fontFamilyClassName",
                                            component: undefined,
                                            dropdownClassName: "fontFamilyClassName",
                                        },
                                        colorPicker: {
                                            icon: colorIconData,
                                            className: 'demo-icon',
                                            component: undefined,
                                            popupClassName: undefined,
                                            colors: ['rgb(255,255,255)', 'rgb(252,193,48)', 'rgb(83,176,161)', 'rgba(102,102,101)', 'rgb(0,0,0)', 'rgba(0,0,0,0)'],
                                        }
                                    }}
                                />
                            </div>
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
                        <div className="event__text__box__input__lable">
                            <div className="backoffice__toolbar__label">
                                שורות מוצגות 
                            </div>
                            <input
                                className={`event__text__box__input ${shouldHighLight(this.props.showLinesOrigin, this.props.showLines)}`}
                                id="number"
                                type="number"
                                value={this.props.showLines}
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
                <div className="common__intouch__seperator__box__desktop desktop">
                    <div className="common__intouch__seperator__desktop desktop"></div>
                </div>
                <img className="events__seperator mobile" src="/images/eventspage/events-seperator-mobile.png" alt="קו הפרדה" />
            </div>
        );
    }
}