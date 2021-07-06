import React from "react";
import { NavLink } from "react-router-dom";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from "reactstrap";
import Modal from 'react-responsive-modal';
import HomePageCarousel from "../homepage/HomePageCarousel";
import IconHoverChange from "./IconHoverChange";
import { connect } from "react-redux";
import { setHomePageCarouselDone } from "../../actions/navigation";
import $ from "jquery";
import { stringReplace } from "../../reusableFunctions/stringReplace";
import AutosizeInput from 'react-input-autosize';
import Button from 'react-bootstrap/lib/Button';
import {
    startAddCategory,
    startEditCategories,
    startToggleShowCategory,
} from '../../actions/eventspage';

const pageToTopD = () => {
    if (typeof window !== "undefined") {
        TweenLite.to(window, 0.7, {
            scrollTo: { y: $("#navbarD").offset().top + 20 }
        });
    }
};

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            fixed: "none",
            isOpen: false,
            accessibilityIcon: "accessibility",
            eventsCategories: this.props.eventsCategories,
            eventsCategoriesReverse: [],
            windowWidth: undefined,
            hideCategoriesEditPanel: true,
            newCategoryNameModalIsOpen: false,
            newCategoryName: '',
            location: null
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    pageToTopM = () => {
        window.scrollTo(0, Number($("#navbarM").offset().top) + Number(20));
    };

    fixedTop = () => {
        if (this.props.windowWidth) {
            document.getElementsByClassName("navbar-light")[1].style.position =
                "fixed";
            document.getElementsByClassName("navbar-light")[1].style.top = 0;
            document.getElementById("fakeNav").style.display = "block";
        }
        if (this.props.windowWidth < 769) {
            document.getElementById("hp_carousel_mobile").style.position =
                "absolute";
            document.getElementById("hp_carousel_mobile").style.opacity = 0;
            document.getElementById("hp_carousel_mobile").style.zIndex = -1;
            window.scrollTo(0, 0);
        }
        if (this.props.windowWidth > 768) {
            document.getElementById("hp_carousel_desktop").style.display =
                "none";
            window.scrollTo(0, 0);
        }

        const homepageCarouselDone = true;
        this.props.setHomePageCarouselDone({
            homepageCarouselDone: homepageCarouselDone
        });

        this.setState({
            fixed: "top"
        });
    };

    setIconChangeOn = e => {
        switch (e.target.dataset.name) {
            case "accessibility":
                return this.setState({
                    accessibilityIcon: "accessibilityHover"
                });
            default:
                return null;
        }
    };

    setIconChangeOut = e => {
        switch (e.target.dataset.name) {
            case "accessibility":
                return this.setState({
                    accessibilityIcon: "accessibility"
                });
            default:
                return null;
        }
    };

    handleLoad = () => {
        if (this.props.page === "homepage") {
            this.props.showPage();
        }
    };

    componentDidMount = () => {
        console.log('this.props.eventsCategories', this.props.eventsCategories);
        window.addEventListener("load", this.handleLoad);

        if (
            document.getElementById("enable-toolbar-trigger") &&
            document.getElementById("enable-toolbar-buttons")
        ) {
            document.getElementById("enable-toolbar-trigger").style.display =
                "none";
            document.getElementById("enable-toolbar-buttons").style.textAlign =
                "right";
        }

        if (
            this.props.page !== "homepage" ||
            this.props.carouselDone === true
        ) {
            document.getElementsByClassName("navbar-light")[1].style.position =
                "fixed";
            document.getElementsByClassName("navbar-light")[1].style.top = 0;
            document.getElementById("fakeNav").style.display = "block";
            if (this.props.windowWidth < 769) {
                document.getElementById("hp_carousel_mobile").style.position =
                    "absolute";
                document.getElementById("hp_carousel_mobile").style.opacity = 0;
                document.getElementById("hp_carousel_mobile").style.zIndex = -1;
            }
            if (this.props.windowWidth > 768) {
                document.getElementById("hp_carousel_desktop").style.display =
                    "none";
            }
            this.fixedTop();
        } else {
            if (typeof window !== "undefined") {
                window.addEventListener("scroll", this.handleScroll);
            }
        }
        let location = "/";
        if (typeof window !== "undefined") {
            location = decodeURIComponent((window.location.href).replace(/\+/g,  " "));
        }
        
        this.setState({
            location
        })
    };

    componentDidUpdate = prevProps => {
        console.log(prevProps);
        console.log('this.props.eventsCategories', this.props.eventsCategories);
        if (
            this.state.eventsCategoriesReverse.length === 0 &&
            this.props.eventsCategories.length > 0
        ) {
            this.setReverseCategories();
        }
    };

    componentWillMount = () => {
        if (
            this.state.eventsCategoriesReverse.length === 0 &&
            this.props.eventsCategories.length > 0
        ) {
            this.setReverseCategories();
        }
    };

    setReverseCategories = () => {
        let eventsCategoriesReverse = [];
        this.props.eventsCategories.map(category => {
            return eventsCategoriesReverse.unshift(category);
        });
        this.setState({
            eventsCategories: this.props.eventsCategories,
            eventsCategoriesReverse
        });
    };

    componentWillUnmount = () => {
        let location = "/";
        if (typeof window !== "undefined") {
            location = window.location.href;
        }
        const page = location.substring(
            location.lastIndexOf("/"),
            location.length
        );
        if (this.props.page === "homepage") {
            if (typeof window !== "undefined") {
                window.removeEventListener("scroll", this.handleScroll);
            }
        }
    };

    handleScroll = () => {
        if ($("#navbarD").css("display") === "block") {
            var navbarTop = document
                .getElementById("navbarD")
                .getBoundingClientRect().top;
        } else {
            var navbarTop = document
                .getElementById("navbarM")
                .getBoundingClientRect().top;
        }
        if (navbarTop < -1 && this.state.fixed === "none") {
            this.fixedTop();
        }
    };

    gotoFacebook = () => {
        if (typeof window !== "undefined") {
            window.open("https://www.facebook.com/oren.pro/");
        }
    };
    gotoInstagram = () => {
        if (typeof window !== "undefined") {
            window.open("https://www.instagram.com/oren_rinat_pro/");
        }
    };
    gotoMail = () => {
        if (typeof window !== "undefined") {
            window.location = "mailto:info@oren-pro.com";
        }
    };
    gotoPhone = () => {
        if (typeof window !== "undefined") {
            window.location = "tel:049544588";
        }
    };

    toggleAccessibility = () => {
        if (
            $("#enable-toolbar-content").css("transform") ===
                "matrix(1, 0, 0, 1, 0, 0)" ||
            $("#enable-toolbar-content").css("transform") ===
                "matrix(1, 0, 0, 1, 0, 50)"
        ) {
            if (this.props.windowWidth < 768) {
                document.getElementById(
                    "enable-toolbar-content"
                ).style.transform =
                    "translateY(100%)";
            } else {
                document.getElementById(
                    "enable-toolbar-content"
                ).style.transform =
                    "translateY(100%)";
            }
        } else {
            if (this.props.windowWidth < 768) {
                document.getElementById(
                    "enable-toolbar-content"
                ).style.transform =
                    "translateY(50px)";
            } else {
                document.getElementById(
                    "enable-toolbar-content"
                ).style.transform =
                    "translateY(0)";
            }
        }
    };

    homepageClicked = () => {
        const homepageCarouselDone = false;
        this.props.setHomePageCarouselDone({
            homepageCarouselDone: homepageCarouselDone
        });
        this.showGallery();
    };

    showGallery = () => {
        document.getElementsByClassName("navbar-light")[1].style.position =
            "absolute";
        document.getElementsByClassName("navbar-light")[1].style.top = "100vh";
        document.getElementById("fakeNav").style.display = "none";
        if (this.props.windowWidth < 769) {
            document.getElementById("hp_carousel_mobile").style.position =
                "relative";
            document.getElementById("hp_carousel_mobile").style.opacity = 1;
        }
        if (this.props.windowWidth > 768) {
            document.getElementById("hp_carousel_desktop").style.display =
                "block";
        }
        this.setState({
            fixed: "none"
        });
        window.scrollTo(0, 0);
    };
    
    startEditCategory = () => {
        this.setState({
            hideCategoriesEditPanel: !this.state.hideCategoriesEditPanel
        });
    }
    
    toggleShowCategory = (e) => {
        const categoryId = e.target.dataset.id;
        let visible = null;
        if (e.target.dataset.visible === "true") {
            visible = false;
        } else {
            visible = true;
        }
        this.props.startToggleShowCategory(categoryId, visible).then((res) => {
            this.setState({
                eventsCategories: this.props.eventsCategories
            });
        });
    }
    
    onCategoryOrderChange = (e) => {
        const eventsCategories = this.state.eventsCategories;
        const categoryId = e.target.dataset.id;
        let categoryIndex = null;
        eventsCategories.map((category, index) => {
            if (category.id === categoryId) categoryIndex = index;
        })
        let newOrder = e.target.value;
        if (newOrder > eventsCategories.length) newOrder = eventsCategories.length;
        if (newOrder < 1) newOrder = 1;
        eventsCategories[categoryIndex].order = Number(newOrder);
        this.setState({
            eventsCategories
        });
    }
    
    onCategoryOrderBlur = (e) => {
        const eventsCategories = this.state.eventsCategories;
        //const categoryId = e.target.dataset.id;
        let newOrder = e.target.value;
        if (newOrder > eventsCategories.length) {
            newOrder = eventsCategories.length;
        }
        if (newOrder < 1) {
            newOrder = 1;
        }
        const oldOrder = Number(e.target.dataset.index)+1;
        const id = e.target.dataset.id;
        if ( Number(newOrder) > Number(oldOrder) ) {
            for (let i = 0; i < eventsCategories.length; i++) {
                if (id !== eventsCategories[i].id) {
                    if (eventsCategories[i].order <= newOrder && eventsCategories[i].order > oldOrder) {
                        eventsCategories[i].order = eventsCategories[i].order-1;
                    }
                }
            }
        } else if ( Number(newOrder) < Number(oldOrder) ) {
            for (let i = 0; i < eventsCategories.length; i++) {
                
                if (id !== eventsCategories[i].id) {
                    if (eventsCategories[i].order < oldOrder && eventsCategories[i].order >= newOrder) {
                        eventsCategories[i].order = Number(eventsCategories[i].order)+1;
                    }
                }
            }
        }
        eventsCategories.sort((a, b) => {
            return a.order > b.order ? 1 : -1;
        });
        this.setState({
            eventsCategories
        });
        // if (typeof(window) !== "undefined") {
        //     if(isEqual(this.state.categoryOrigin, this.state.category) && isEqual(this.state.subCategoriesOrigin, subCategories) && isEqual(this.state.itemsCurrentCheck, this.state.itemsCurrentOrigin)){ 
        //         window.removeEventListener("beforeunload", this.unloadFunc);
        //     } else {
        //         window.addEventListener("beforeunload", this.unloadFunc);
        //     }
        // }
    }
    
    onCategoryOrderKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onCategoryOrderBlur(e);
        }
    }
    
    onCategoryNameChange = (e) => {
        const index = e.target.dataset.index;
        const categoryNewName = e.target.value;
        const eventsCategories = this.state.eventsCategories;
        eventsCategories[index].name = categoryNewName;
        this.setState({
            eventsCategories
        });
        // if (typeof(window) !== "undefined") {
        //     if(isEqual(this.state.categoryOrigin, this.state.category) && isEqual(this.state.subCategoriesOrigin, subCategories) && isEqual(this.state.itemsCurrentCheck, this.state.itemsCurrentOrigin)){ 
        //         window.removeEventListener("beforeunload", this.unloadFunc);
        //     } else {
        //         window.addEventListener("beforeunload", this.unloadFunc);
        //     }
        // }
    }

    onCategoryNameBlur = (e) => {
        let nameFlag = false;
        let oldName = '';
        const eventsCategories = this.state.eventsCategories;
        const categoryNewName = e.target.value;
        const categoryId = e.target.dataset.id;
        eventsCategories.map((category, index) => {
            if (category.id === categoryId) {
                oldName = category.name;
            }
        })
        eventsCategories.map((category, index) => {
            if (category.name === categoryNewName && category.id !== categoryId) {
                nameFlag = true;
            }
        })
        if (nameFlag === true) {
            alert("שם קטגוריה קיים במערכת");
            e.target.value = oldName;
            eventsCategories.map((category, index) => {
                if (category.id === categoryId) {
                    eventsCategories[index].name = oldName;
                    this.setState({
                        eventsCategories
                    });
                }
            })
        }
        // } else {
        //     if (typeof(window) !== "undefined") {
        //         if(isEqual(this.state.categoryOrigin, this.state.category) && isEqual(this.state.subCategoriesOrigin, subCategories) && isEqual(this.state.itemsCurrentCheck, this.state.itemsCurrentOrigin)){ 
        //             window.removeEventListener("beforeunload", this.unloadFunc);
        //         } else {
        //             window.addEventListener("beforeunload", this.unloadFunc);
        //         }
        //     }
        // }
    }
    
    updateCategories = () => {
        const categories = this.state.eventsCategories;
        const fbCategories = {};
        categories.map((category, index) => {
            fbCategories[category.id] = category;
        })
        this.props.startEditCategories(fbCategories, categories);

        this.setState({
            eventsCategoriesOrigin: categories
        });
        // if (typeof(window) !== "undefined") {
        //     if(isEqual(this.state.categoryOrigin, this.state.category) && isEqual(this.state.itemsCurrentCheck, this.state.itemsCurrentOrigin)){ 
        //         window.removeEventListener("beforeunload", this.unloadFunc);
        //     } else {
        //         window.addEventListener("beforeunload", this.unloadFunc);
        //     }
        // }
    }
    
    addNewCategory = () => {
        let nameFlag = false;
        this.props.eventsCategories.map((category, index) => {
            if(category.name === this.state.newCategoryName) {
                nameFlag = true;
            }
        })

        if(nameFlag === true) {
            this.setState({
                newCategoryNameModalAlert: 'שם קטגוריה קיים במערכת'
            });
        } else if (this.state.newCategoryName === '') {
            this.setState({
                newCategoryNameModalAlert: 'שם קטגוריה חייב לכלול אות אחת לפחות'
            });
        } else {
            const name = this.state.newCategoryName;
            const order = this.props.eventsCategories.length+1;
            const category = {
                name,
                order,
                isVisible: false,
                type: 'category'
            };
            this.props.startAddCategory(category, order).then((categories)=> {
                //this.getAllData(categoryId, categoryId);
                console.log('categories', categories);
                this.setState({
                    newCategoryNameModalIsOpen: false,
                    newCategoryName: ''
                });
            });
        }
        
    }

    onNewCategoryNameChange = (e) => {
        const newCategoryName = e.target.value;
        this.setState({
            newCategoryName
        });
    }

    onToggleNewCategoryName = () => {
        this.setState({
            newCategoryNameModalIsOpen: !this.state.newCategoryNameModalIsOpen
        });
    }

    render() {
        
        
        return (
            <div className="container-fluid">
                
                <Modal
                    open={this.state.newCategoryNameModalIsOpen}
                    onClose={this.onToggleNewCategoryName}
                    center
                    classNames={{
                        overlay: 'custom-overlay',
                        modal: 'custom-modal',
                        closeButton: 'custom-close-button'                     
                    }}
                >
                    <h2 className="Heebo-Medium">הוספת קטגוריה חדשה</h2>
                    <h4 className="Heebo-Regular">נא למלא שם לקטגוריה החדשה</h4>
                    <h4 className="Heebo-Regular">{this.state.newCategoryNameModalAlert}</h4>
                    <div dir="rtl" style={{marginTop: '2rem', paddingBottom: '2rem'}}>
                        <AutosizeInput
                            className="events__tabs__button"
                            type="text"
                            placeholder="שם הקטגוריה"
                            value={this.state.newCategoryName}
                            onChange={this.onNewCategoryNameChange}
                        />
                        <Button bsStyle="success" onClick={this.addNewCategory}>המשך</Button>
                    </div>
                </Modal>
                
                <div className="collapse__bg__loader" />

                {this.props.page === "homepage" ? this.props.windowWidth <
                769 ? (
                    <div className="mobile" id="hp_carousel_mobile">
                        <button
                            className="carousel__button mobile"
                            onClick={this.pageToTopM}
                        >
                            {" "}
                        </button>

                        <img
                            className="carousel_logo mobile"
                            src="/images/homepage/carousel/carousel_logo.svg"
                            alt="אורן ורינת הפקות אירועים"
                            onLoad={this.handleLoad}
                        />
                        <HomePageCarousel className="mobile" media="mobile" />
                    </div>
                ) : (
                    <div className="desktop" id="hp_carousel_desktop">
                        <button
                            className="carousel__button desktop"
                            onClick={pageToTopD}
                        >
                            {" "}
                        </button>

                        <img
                            className="carousel_logo desktop"
                            className="carousel_logo"
                            src="/images/homepage/carousel/carousel_logo.svg"
                            alt="אורן ורינת הפקות אירועים"
                            onLoad={this.handleLoad}
                        />
                        <HomePageCarousel className="desktop" media="desktop" />
                        {/*<HomePageVideo windowWidth={this.props.windowWidth} windowHeight={this.props.windowHeight} />*/}
                    </div>
                ) : null}

                <div id="fakeNav" className="fakeNav" />
                <Navbar
                    id="navbarD"
                    light
                    className={`container-fluid desktop`}
                    expand="md"
                    fixed={this.state.fixed}
                >
                    <div className="container-fluid navbar__header__container">
                        <div className="container-fluid navbar__header">
                            <NavbarBrand className="navbar__brand" href="/">
                                <img
                                    className="nav__logo"
                                    src="/images/navigation/nav_logo.svg"
                                    alt="אורן ורינת הפקות אירועים - לוגו"
                                />
                            </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                        </div>
                    </div>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="navbar__nav" className="m-auto" navbar>
                            <NavbarBrand
                                className="navbar__brand--desktop"
                                href="/"
                            >
                                <img
                                    className="nav__logo"
                                    src="/images/navigation/nav_logo.svg"
                                    alt="אורן ורינת הפקות אירועים - לוגו"
                                />
                            </NavbarBrand>                            
                            {this.state.eventsCategoriesReverse !== [] ? (
                                this.state.eventsCategoriesReverse.map(
                                    category => {
                                        if (category.isVisible === true) {
                                            console.log('this.state.location',this.state.location);
                                            console.log('includes',this.state.location && this.state.location.includes(stringReplace(
                                                category.name,
                                                " ",
                                                "_"
                                            )));
                                            console.log('string',stringReplace(
                                                category.name,
                                                " ",
                                                "_"
                                            ));
                                            return (
                                                category.type === 'category' ?
                                                    <NavItem key={category.id}>
                                                        <NavLink
                                                            to={`/${stringReplace(
                                                                category.name,
                                                                " ",
                                                                "_"
                                                            )}`}
                                                            className={`nav__link nav__link--padding-top${this.state.location && this.state.location.includes(stringReplace(
                                                                category.name,
                                                                " ",
                                                                "_"
                                                            )) ? ' is-active nav__link--active' : ''}`}
                                                            activeClassName="is-active nav__link--active"
                                                        >
                                                            {category.name}
                                                        </NavLink>
                                                    </NavItem>
                                                :
                                                    category.urlTo === '/' ?
                                                        <NavItem key={category.id}>
                                                            <NavLink
                                                                onClick={this.homepageClicked}
                                                                exact
                                                                to={category.urlTo}
                                                                className="nav__link nav__link--padding-top"
                                                                activeClassName="is-active nav__link--active"
                                                            >
                                                                {category.name}
                                                            </NavLink>
                                                        </NavItem>
                                                    :
                                                        <NavItem key={category.id}>
                                                            <NavLink
                                                                to={category.urlTo}
                                                                exact
                                                                className="nav__link nav__link--padding-top"
                                                                activeClassName="is-active nav__link--active"
                                                            >
                                                                {category.name}
                                                            </NavLink>
                                                        </NavItem>
                                            );
                                        } else {
                                            return null;
                                        }
                                    }
                                )
                            ) : null}
                            <NavItem className="nav-item--accessibility">
                                <div
                                    className="nav__link--accessibility"
                                    data-name="accessibility"
                                    onMouseOver={this.setIconChangeOn}
                                    onMouseOut={this.setIconChangeOut}
                                    onClick={this.toggleAccessibility}
                                >
                                    <IconHoverChange
                                        icon={this.state.accessibilityIcon}
                                    />
                                </div>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
                
                <Navbar
                    id="navbarM"
                    light
                    className={`container-fluid mobile`}
                    expand="md"
                    fixed={this.state.fixed}
                >
                    <div className="container-fluid navbar__header__container">
                        <div className="container-fluid navbar__header__mobile">
                            <NavItem className="nav__link--accessibility">
                                <NavLink
                                    to="/"
                                    className="nav__link--accessibility"
                                    data-name="accessibility"
                                    onMouseOver={this.setIconChangeOn}
                                    onMouseOut={this.setIconChangeOut}
                                    onClick={this.toggleAccessibility}
                                >
                                    <img
                                        className="nav__link__accessibility__mobile"
                                        src="/images/navigation/accessibility_mobile.svg"
                                        alt="נגישות"
                                    />
                                </NavLink>
                            </NavItem>
                            <img
                                className="nav__mobile__seperator"
                                src="/images/navigation/nav_icons_seperator.svg"
                                alt="קו הפרדה"
                            />
                            <button
                                className="nav__phone__mobile"
                                data-name="phone"
                                onClick={this.gotoPhone}
                            >
                                <img
                                    className="nav__link__phone__mobile"
                                    src="/images/navigation/phone_mobile.svg"
                                    alt="טלפון"
                                />
                            </button>
                            <NavbarBrand className="navbar__brand" href="/">
                                <img
                                    className="nav__logo"
                                    src="/images/navigation/nav_logo.svg"
                                    alt="אורן ורינת הפקות - לוגו"
                                />
                            </NavbarBrand>
                            <NavbarToggler
                                className="navbar__toggler ml-auto"
                                onClick={this.toggle}
                            />
                        </div>
                    </div>
                    <Collapse
                        className="navbar__collapse"
                        isOpen={this.state.isOpen}
                        navbar
                    >
                        <Nav className="navbar__nav" className="m-auto" navbar>
                            <div className="nav__social__box">
                                <img
                                    className="nav__social__seperator"
                                    src="/images/navigation/nav-social-seperator.png"
                                    alt="קו הפרדה"
                                />
                                <button
                                    className="homepage__socialmedia-button mobile_inline"
                                    onClick={this.gotoFacebook}
                                >
                                    <img
                                        className="nav__link__facebook__mobile"
                                        src="/images/navigation/facebook_mobile.svg"
                                        alt="פייסבוק"
                                    />
                                </button>
                                <button
                                    className="homepage__socialmedia-button mobile_inline"
                                    onClick={this.gotoInstagram}
                                >
                                    <img
                                        className="nav__link__instagram__mobile"
                                        src="/images/navigation/instagram_mobile.svg"
                                        alt="אינסטגרם"
                                    />
                                </button>
                                <button
                                    className="homepage__socialmedia-button mobile_inline"
                                    onClick={this.gotoMail}
                                >
                                    <img
                                        className="nav__link__mail__mobile"
                                        src="/images/navigation/mail_mobile.svg"
                                        alt="אימייל"
                                    />
                                </button>
                                <img
                                    className="nav__social__seperator"
                                    src="/images/navigation/nav-social-seperator.png"
                                    alt="קו הפרדה"
                                />
                            </div>
                            
                            {this.state.eventsCategoriesReverse !== [] ? (
                                this.state.eventsCategoriesReverse.map(
                                    category => {
                                        if (category.isVisible === true) {
                                            return (
                                                category.type === 'category' ?
                                                    <NavItem key={category.id}>
                                                        <NavLink
                                                            to={`/${stringReplace(
                                                                category.name,
                                                                " ",
                                                                "_"
                                                            )}`}
                                                            className="nav__link nav__link--padding-top"
                                                            activeClassName="is-active nav__link--active"
                                                        >
                                                            {category.name}
                                                        </NavLink>
                                                    </NavItem>
                                                :
                                                    <NavItem key={category.id}>
                                                        <NavLink
                                                            to={category.urlTo}
                                                            className="nav__link nav__link--padding-top"
                                                            activeClassName="is-active nav__link--active"
                                                        >
                                                            {category.name}
                                                        </NavLink>
                                                    </NavItem>
                                            );
                                        } else {
                                            return null;
                                        }
                                    }
                                )
                            ) : null}
                        </Nav>
                    </Collapse>
                </Navbar>
                {this.props.isAuthenticated &&
                this.props.isEditable ? (
                    <div className="backoffice__toolbar__buttons">
                        <div className="backoffice__toolbar__label">
                            Toolbar ניהול
                        </div>
                        <button
                            className="backoffice__add__button"
                            onClick={
                                this.onToggleNewCategoryName
                            }
                        >
                            <img
                                className="backoffice__add__icon"
                                src="/images/eventspage/add-eventSubcategory-icon.svg"
                                alt="הוספת קטגוריה"
                            />
                        </button>
                        <button
                            className="backoffice__edit__button"
                            onClick={
                                this.startEditCategory
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
                { 
                    this.props.isAuthenticated === true ? 
                        <div className="backoffice__edit__navigation__box" hidden={this.state.hideCategoriesEditPanel}>
                            {
                                this.state.eventsCategories.length > 0 ?
                                    this.state.eventsCategories.map((category, index) => {
                                        return  <div className="backoffice__edit__events__tabs__in__box" key={category.id} dir="rtl">
                                                    <Button
                                                        id="btn-show"
                                                        data-id={category.id}
                                                        data-visible={category.isVisible}
                                                        className={`backoffice__events__tabs__remove${category.isVisible === true ? ' btn-success' : ' btn-danger'}`}
                                                        onClick={this.toggleShowCategory}
                                                    >
                                                        <img
                                                            data-id={category.id}
                                                            data-visible={category.isVisible}
                                                            className="backoffice__show__icon"
                                                            src={`/images/backoffice/${category.isVisible === true ? 'show' : 'hide'}.svg`}
                                                            alt={category.isVisible === true ? 'הצג' : 'הסתר'}
                                                        />
                                                    </Button>
                                                    <div className="backoffice__events__tabs__order__box">
                                                        <input
                                                            id="number"
                                                            data-id={category.id}
                                                            type="number"
                                                            value={category.order || 0}
                                                            data-index={index}
                                                            onChange={this.onCategoryOrderChange}
                                                            onKeyPress={this.onCategoryOrderKeyPress}
                                                            onBlur={this.onCategoryOrderBlur}
                                                        />
                                                    </div>
                                                    <AutosizeInput
                                                        data-id={category.id}
                                                        data-index={index}
                                                        className="events__tabs__button"
                                                        type="text"
                                                        placeholder="שם תת קטגוריה"
                                                        value={category.name}
                                                        onChange={this.onCategoryNameChange}
                                                        onBlur={this.onCategoryNameBlur}
                                                    />
                                                </div>
                                    })
                                    
                                :
                                    null
                            }
                            <div className="backoffice__events__tabs__update__box">
                                <Button className="backoffice__events__tabs__update btn-success" onClick={this.updateCategories}>עדכון</Button>
                            </div>
                        </div>
                    :
                        null
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: !!state.auth.uid,
    eventsCategories: state.eventspage.categories,
    carouselDone: state.navigation.homepageCarouselDone
});

const mapDispatchToProps = dispatch => ({
    setHomePageCarouselDone: homepageCarouselDone => dispatch(setHomePageCarouselDone(homepageCarouselDone)),
    startToggleShowCategory: (categoryId, visible) => dispatch(startToggleShowCategory(categoryId, visible)),
    startEditCategories: (fbCategories, categories) => dispatch(startEditCategories(fbCategories, categories)),
    startAddCategory: (category) => dispatch(startAddCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);