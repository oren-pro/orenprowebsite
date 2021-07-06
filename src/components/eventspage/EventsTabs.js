import React from "react";
import isEqual from "lodash/isEqual";

const shouldHighLight = (org, update) => {
    if (isEqual(org, update)) {
        return "edit__bg";
    } else {
        return "edit__changed__bg";
    }
};

class EventsTabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subcategoryId: "",
            subCategories: []
        };
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps !== this.props) {
            this.setState({
                subcategoryId: nextProps.subcategoryId,
                subCategories: nextProps.subCategories
            });
            return true;
        } else {
            return true;
        }
    };

    componentDidMount = () => {
        this.setState({
            subcategoryId: this.props.subcategoryId,
            subCategories: this.props.subCategories
        });
    };

    render() {
        return (
            <div className="events__tabs__box">
                <div className="events__tabs__box--right">
                    <h3 className="events__tabs__header Heebo-Medium" dir="rtl">
                        מה מעניין אתכם?
                    </h3>
                    <div
                        className={
                            this.props.subCategoriesOrigin ? (
                                shouldHighLight(
                                    this.props.subCategoriesOrigin,
                                    this.state.subCategories
                                )
                            ) : (
                                ""
                            )
                        }
                    >
                        <div className="events__tabs__tabs__box" dir="rtl">
                            {this.props.categoryName !== "מאמרים" ||
                            (this.props.categoryName === "מאמרים" &&
                                this.props.isAuthenticated === true) ? (
                                <button
                                    data-id=""
                                    className={
                                        this.state.subcategoryId === "" ? (
                                            "events__tabs__button events__tabs__button--selected"
                                        ) : (
                                            "events__tabs__button"
                                        )
                                    }
                                    onClick={this.props.setSubcategoryId}
                                >
                                    הכל
                                </button>
                            ) : null}

                            {this.state.subCategories.length > 0 ? (
                                this.state.subCategories.map(subCategory => {
                                    if (
                                        this.props.isAuthenticated ||
                                        subCategory.visible === true
                                    ) {
                                        return (
                                            <button
                                                key={subCategory.id}
                                                data-id={subCategory.id}
                                                data-name={subCategory.name}
                                                className={
                                                    this.props.subcategoryId ===
                                                    subCategory.id ? (
                                                        "events__tabs__button events__tabs__button--selected"
                                                    ) : (
                                                        "events__tabs__button"
                                                    )
                                                }
                                                onClick={
                                                    this.props.setSubcategoryId
                                                }
                                            >
                                                {subCategory.name}
                                            </button>
                                        );
                                    }
                                })
                            ) : null}
                            {this.props.isAuthenticated &&
                            this.props.isEditable ? (
                                <div className="backoffice__events__tabs__buttons">
                                    <div className="backoffice__toolbar__label">
                                        ניהול קטגוריה 
                                    </div>
                                    <button
                                        className="backoffice__add__button"
                                        onClick={
                                            this.props.startAddNewSubcategory
                                        }
                                    >
                                        <img
                                            className="backoffice__add__icon"
                                            src="/images/eventspage/add-eventSubcategory-icon.svg"
                                            alt="הוספת תת קטגוריה"
                                        />
                                    </button>
                                    <button
                                        className="backoffice__edit__button"
                                        onClick={
                                            this.props.startEditSubcategory
                                        }
                                    >
                                        <img
                                            className="backoffice__edit__icon"
                                            src="/images/backoffice/edit.svg"
                                            alt="עריכה"
                                        />
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventsTabs;
