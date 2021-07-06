//import database from '../firebase/firebase';
var firebase = require("firebase/app");
require("firebase/database");
const axios = require('axios');

export const subscribeToNewsletter = (newsletterData = {}) => {
    return () => {
        const {
            name = '',
            email = ''
        } = newsletterData;
        const subscriber = {name, email};

        axios.post('https://ssl-vp.com/rest/v1/Contacts?updateIfExists=true&restoreIfDeleted=true&restoreIfUnsubscribed=true&api_key=3d0dae7b-3b92-4f99-aabe-18c7d34c0229', {
            "firstName": name,
            "email": email,
            "lists_ToSubscribe": ["77046", "476828"]
        })
        .then(function (response) {
            console.log("response");
            console.log(response);
        })
        .catch(function (error) {
            console.log('error');
            console.log(error);
        });

        return firebase.database().ref(`newsletter`).push(subscriber);
    };
};