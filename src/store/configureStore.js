import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import aboutpageReducer from '../reducers/aboutpage';
import authReducer from '../reducers/auth';
import costumersReducer from '../reducers/costumers';
import eventspageReducer from '../reducers/eventspage';
import homepageReducer from '../reducers/homepage';
import navigationReducer from '../reducers/navigation';
import newsletterReducer from '../reducers/newsletter';
import messagesReducer from '../reducers/messages';
import desktopGalleryReducer from '../reducers/desktopGallery';
import mobileGalleryReducer from '../reducers/mobileGallery';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENTION_COMPOSE__ || compose;

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

export default () => {
    /* eslint-disable no-underscore-dangle */
    const store = createStore(
        combineReducers({
            aboutpage: aboutpageReducer,
            auth: authReducer,
            costumers: costumersReducer,
            eventspage: eventspageReducer,
            homepage: homepageReducer,
            messages: messagesReducer,
            navigation: navigationReducer,
            newsletter: newsletterReducer,
            desktopGallery: desktopGalleryReducer,
            mobileGallery: mobileGalleryReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    /* eslint-enable */
    return store;
};