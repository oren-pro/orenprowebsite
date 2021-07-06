import React from "react";
import EventsEvent from "./EventsEvent";
import isEqual from "lodash/isEqual";

const shouldHighLight = (org, update) => {
    if (isEqual(org, update)) {
        return "edit__bg";
    } else {
        return "edit__changed__bg";
    }
};

const EventsEvents = props => (
    <div
        className={`events__events__box ${shouldHighLight(
            props.itemsCurrentOrigin,
            props.itemsCurrentCheck
        )}`}
    >
        {props.isAuthenticated === true && props.oneLine !== true ? (
            <div className="backoffice__events__events__buttons">
                <div className="backoffice__toolbar__label">
                    ניהול אייטמים
                </div>
                {props.subcategoryId !== "" ? (
                    <button
                        className="backoffice__events__events__add__button"
                        onClick={props.startAddNewItem}
                    >
                        <img
                            className="backoffice__events__events__add__icon"
                            src="/images/eventspage/add-eventSubcategory-icon.svg"
                            alt="הוספת אירוע"
                        />
                    </button>
                ) : null}
                <button
                    className="backoffice__events__events__save__button"
                    onClick={props.updateItems}
                >
                    <img
                        className="backoffice__events__events__save__icon"
                        src="/images/backoffice/save.svg"
                        alt="שמירה"
                    />
                </button>
            </div>
        ) : null}

        {props.oneLine === true ? (
            <div className="events__events__oneline__header__box">
                <img
                    className="events__seperator mobile"
                    src="/images/eventspage/events-seperator-mobile.png"
                    alt="קו הפרדה"
                />
                <p className="events__events__oneline__more Heebo-Medium">
                    לאירועים נוספים
                </p>
                <div className="common__intouch__seperator__box__desktop desktop">
                    <div className="common__intouch__seperator__desktop desktop" />
                </div>
                <img
                    className="events__seperator mobile"
                    src="/images/eventspage/events-seperator-mobile.png"
                    alt="קו הפרדה"
                />
                <h3 className="events__events__oneline__header Heebo-Regular">
                    {props.subcategoryName}
                </h3>
            </div>
        ) : null}
        {props.itemsCurrent.map((item, index) => {
            return (
                <EventsEvent
                    isAuthenticated={props.isAuthenticated}
                    key={item.id}
                    id={item.id}
                    index={index}
                    item={item}
                    visible={item.visible}
                    categoryIndex={item.categories[props.categoryId + "order"]}
                    order={item.subcategories[props.subcategoryId + "order"]}
                    categoryId={props.categoryId}
                    subcategoryId={props.subcategoryId}
                    subcategoryName={props.subcategoryName}
                    categoryName={props.categoryName}
                    eventName={props.eventName}
                    image={item.image}
                    title={item.name}
                    categories={item.categories}
                    subcategories={item.subcategories}
                    uploadWidget={props.uploadWidget}
                    onRollOver={props.onRollOver}
                    oneLine={props.oneLine}
                    onItemOrderChange={props.onItemOrderChange}
                    onItemOrderKeyPress={props.onItemOrderKeyPress}
                    onItemOrderBlur={props.onItemOrderBlur}
                    toggleShowItem={props.toggleShowItem}
                    toggleHookEvent={props.toggleHookEvent}
                />
            );
        })}
        {props.oneLine === true ? (
            <div className="events__events__findmore__box">
                <button
                    type="button"
                    className="events__eventshare__button events__eventshare__button__findmore"
                    data-name="greenArrow"
                    onMouseEnter={props.setIconRatioOn}
                    onMouseLeave={props.setIconRatioOut}
                    onClick={props.navtoCategoryPageEvent}
                >
                    <img
                        data-subcategoryname={props.subcategoryName}
                        className="events__eventshare__more__button__image"
                        src="/images/aboutpage/arrowBlack.svg"
                        alt="גלו עוד"
                    />
                    <p
                        data-subcategoryname={props.subcategoryName}
                        className="events__eventshare__more__button__text Heebo-Regular"
                    >
                        גלו עוד
                    </p>
                </button>
                <div className="common__intouch__seperator__box__desktop desktop">
                    <div className="common__intouch__seperator__desktop desktop" />
                </div>
                <img
                    className="events__seperator mobile"
                    src="/images/eventspage/events-seperator-mobile.png"
                    alt="קו הפרדה"
                />
            </div>
        ) : null}
    </div>
);

export default EventsEvents;
