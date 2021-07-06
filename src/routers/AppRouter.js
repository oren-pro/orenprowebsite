import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
//import createHistory from 'history/createBrowserHistory';
import { createMemoryHistory } from 'history';
import ReactLoading from "react-loading";

const createHistory = require("history").createBrowserHistory;

let loadImage = "";
if (typeof(window) !== "undefined") {
    if (navigator.userAgent.toLowerCase().indexOf('msie') > -1 || navigator.userAgent.toLowerCase().indexOf('trident') > -1 || navigator.userAgent.toLowerCase().indexOf('edge') > -1 ){
        //console.log("found");
        loadImage = <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><img src="/images/ie-preloader.gif" alt="אורן ורינת הפקות אירועים" /></div>;
    } else {
        loadImage = <div style={{width:'100vw', height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><ReactLoading type="spinningBubbles" color="#666665" /></div>;
    }
}

import AboutPage from '../containers/AboutPage';
import ContactPage from '../containers/ContactPage';
import DifferentPage from '../containers/DifferentPage';
import EventsPage from '../containers/EventsPage';
import EventPage from '../containers/EventPage';
import HomePage from '../containers/HomePage';
import NotFoundPage from '../containers/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import SigninPage from '../components/SigninPage';
import { connect } from 'react-redux';


export const history = typeof(window) !== "undefined" ? createHistory() : createMemoryHistory();

class AppRouter extends React.Component {
    render() {

        return (
            <Router history={history}>
                <div>
                    {
                        this.props.events.categories ?
                        <Switch>
                            <Route path="/" render={(props) => ( <HomePage windowWidth={this.props.windowWidth} {...props} />)} exact={true} />
                            <Route path="/about" component={AboutPage} exact={true} />
                            <Route path="/contact" component={ContactPage} exact={true} />
                            {
                                this.props.events.categories.map((category, index) => {
                                    return <Route path={`/${category.name.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")}`} key={category.id} render={(props) => ( <EventsPage {...props} category={category} categoryIndex={index} />)} exact={true} />;
                                })
                            }
                            {
                                this.props.events.categories.map((category, index) => {
                                    
                                    return <Route
                                                path={`/:subcategory/${category.name.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")}`}
                                                key={category.id}
                                                render={(props) => ( <EventsPage {...props} category={category} categoryIndex={index} />)}
                                                exact={true}
                                            />;
                                    
                                })
                            }
                            {
                                this.props.events.categories.map((category) => {
                                    return <Route
                                                path={`/:event/:subcategory/${category.name.replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_").replace(" ", "_")}`}
                                                key={category.id}
                                                render={(props) => ( <EventPage {...props} categoryName={category.name} categoryId={category.id} />)}
                                                exact={true}
                                            />;
                                })
                            }
                            
                            <Route path="/signin" component={SigninPage} exact={true} />
                            <PublicRoute path="/login" component={LoginPage} exact={true} />
                            
                            <Route component={NotFoundPage} />
                        </Switch>
                        :
                            null
                        }   
                </div>
            </Router>
        )
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid,
    events: state.eventspage
});

export default connect(mapStateToProps)(AppRouter);

// <Route path="/קצת_אחרת" component={DifferentPage} exact={true} />