import React from 'react';
import HomePageEventsItem from './HomePageEventsItem';

const items = [
    {
        header: 'אירועי חברה',
        text: 'טקסט על אירועי חברה טקסט טקסט על אירועי חברה טקסט טקסט על אירועי חברה טקסט טקסט קצר על אירועי חברה טקסט טקסט קצר על אירועי חברה טקסט טקסט קצר על אירועי חברה טקסט',
        image: '/images/homepage/events/company-events.png',
        readmore: ''
    },
    {
        header: 'אירועי שיווק וקד״מ',
        text: 'טקסט קצר על אירועי שיווק וקד״מ טקסט קצר על אירועי שיווק וקד״מ טקסט קצר על אירועי שיווק וקד״מ טקסט קצר על אירועי שיווק וקד״מ טקסט קצר על אירועי שיווק וקד״מ',
        image: '/images/homepage/events/sales-events.png',
        readmore: ''
    },
    {
        header: 'פסטיבלים ואירועי חוצות',
        text: 'טקסט על אירועי פסטיבלים ואירועי חוצות טקסט על אירועי פסטיבלים ואירועי חוצות טקסט קצר על אירועי פסטיבלים ואירועי חוצות טקסט קצר על אירועי פסטיבלים ואירועי חוצות',
        image: '/images/homepage/events/fest-events.png',
        readmore: ''
    },
    {
        header: 'קצת אחרת',
        text: 'טקסט קצר על אירועי קצת אחרת טקסט קצר על אירועי קצת אחרת טקסט קצר על אירועי קצת אחרת טקסט קצר על אירועי קצת אחרת',
        image: '/images/homepage/events/other-events.png',
        readmore: ''
    }
];

const HomePageEvents = (props) => (
    <div className="homepage__events__box align-text-center">
        <div className="homepage__events-header">
            <h1 className="homepage__events-header__text Heebo-Medium" dir="rtl">מה אנחנו עושים?</h1>
        </div>
        
        <div className="homepage__events-structure" dir="rtl">
            {
                props.homepage.events ?
                props.homepage.events.map((event,index) => {
                    return  <HomePageEventsItem
                                key={`homepage-events-item-${index}`}
                                event={event}
                                name={props.name}
                                {...props}
                                index={index}
                                action='setString'
                                homepage={props.homepage}
                                homepageOrigin={props.homepageOrigin}
                                onChange={props.onChange}
                                uploadWidget={props.uploadWidget}
                                ratioGreenArrow={props.ratioGreenArrow}
                                setIconRatioOn={props.setIconRatioOn}
                                setIconRatioOut={props.setIconRatioOut} 
                            />
                })
                :
                null
            }
        </div>
    </div>
);

export default HomePageEvents;