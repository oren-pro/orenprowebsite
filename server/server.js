const path = require('path');
const compression = require('compression');
const express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var cors = require('cors');
var cloudinary = require('cloudinary');
const fs = require('fs');





var admin = require("firebase-admin");

const app = express();

app.use(function forceHTTPS(req, res, next) {
  var local = req.url;
  var schema = (req.headers['x-forwarded-proto'] || '').toLowerCase();
  var www = req.headers.host;
  console.log(local);
  console.log(schema);
  console.log(www);
  if (schema !== 'https') {
    return res.redirect('https://www.oren-pro.com' + local);
  }

  return next();

});



app.use(function forceLiveDomain(req, res, next) {

  // http://www.oren-pro.com/13/אודות_אורן_הפקות
  if (String(req.originalUrl) === '/13/%D7%90%D7%95%D7%93%D7%95%D7%AA_%D7%90%D7%95%D7%A8%D7%9F_%D7%94%D7%A4%D7%A7%D7%95%D7%AA') {
    return res.redirect(301, '/about');
  }

  // http://www.oren-pro.com/1014/993/יום-כיף-בחורף
  if (String(req.originalUrl) === '/1014/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%97%D7%95%D7%A8%D7%A3') {
    return res.redirect(301, '/אירועי_קונספט/אירועי_חברה');
  }
  // http://www.oren-pro.com/999/986/הפקות-אירועים-לחברות-
  if (String(req.originalUrl) === '/999/986/%D7%94%D7%A4%D7%A7%D7%95%D7%AA-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%9C%D7%97%D7%91%D7%A8%D7%95%D7%AA-') {
    return res.redirect(301, '/אירועי_חברה');
  }
  //http://www.oren-pro.com/event.asp?type=134
  if (String(req.originalUrl) === '/event.asp?type=134') {
    return res.redirect(301, '/אירועי_חברה');
  }

  //http://www.oren-pro.com/event/213/131/אירוע_בטבע
  if (String(req.originalUrl) === '/event/213/131/%D7%90%D7%99%D7%A8%D7%95%D7%A2_%D7%91%D7%98%D7%91%D7%A2') {
    return res.redirect(301, '/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/13/הפקות_אירועים
  if (String(req.originalUrl) === '/13/%D7%94%D7%A4%D7%A7%D7%95%D7%AA_%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D') {
    return res.redirect(301, '/אירועי_שיווק_וקד״מ');
  }
  // http://www.oren-pro.com/1345/1306/אירוע-פורים-במשרדי-החברה
  if (String(req.originalUrl) === '/1345/1306/%D7%90%D7%99%D7%A8%D7%95%D7%A2-%D7%A4%D7%95%D7%A8%D7%99%D7%9D-%D7%91%D7%9E%D7%A9%D7%A8%D7%93%D7%99-%D7%94%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/PURIM_CIRCUS/אירועי_קונספט/אירועי_חברה');
    // greased lightning
  }
  //http://www.oren-pro.com/1346/1306/פורים-בסגנון-שנות-ה60
  if (String(req.originalUrl) === '/1346/1306/%D7%A4%D7%95%D7%A8%D7%99%D7%9D-%D7%91%D7%A1%D7%92%D7%A0%D7%95%D7%9F-%D7%A9%D7%A0%D7%95%D7%AA-%D7%9460') {
    return res.redirect(301, '/SIXTIES_PARTY/אירועי_קונספט/אירועי_חברה');
  }
  
  //http://www.oren-pro.com/1312/1306/הפנינג-פורים-למשפחות-
  if (String(req.originalUrl) === '/1312/1306/%D7%94%D7%A4%D7%A0%D7%99%D7%A0%D7%92-%D7%A4%D7%95%D7%A8%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA-') {
    return res.redirect(301, '/פורים_משפחות/אירוע_משפחות/אירועי_חברה');
  }

  //http://www.oren-pro.com/1308/1306/ערב-קזינו
  if (String(req.originalUrl) === '/1308/1306/%D7%A2%D7%A8%D7%91-%D7%A7%D7%96%D7%99%D7%A0%D7%95') {
    return res.redirect(301, '/מסיבת_פורים-_שנות_ה-20/אירועי_קונספט/אירועי_חברה');
  }

  //http://www.oren-pro.com/1334/1069/סגווי-בתל-אביב-יפו-
  if (String(req.originalUrl) === '/1334/1069/%D7%A1%D7%92%D7%95%D7%95%D7%99-%D7%91%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91-%D7%99%D7%A4%D7%95-') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1309/1306/So-80
  if (String(req.originalUrl) === '1309/1306/So-80') {
    return res.redirect(301, '/');
  }
  

  //http://www.oren-pro.com/1307/1306/המערב-הפרוע
  if (String(req.originalUrl) === '/1307/1306/%D7%94%D7%9E%D7%A2%D7%A8%D7%91-%D7%94%D7%A4%D7%A8%D7%95%D7%A2') {
    return res.redirect(301, '/המערב_הפרוע/אירועי_קונספט/אירועי_חברה');
  }

  //http://www.oren-pro.com/1187/1021/פסטיבל-דייגו-בקניון-אורות
  if (String(req.originalUrl) === '/1187/1021/%D7%A4%D7%A1%D7%98%D7%99%D7%91%D7%9C-%D7%93%D7%99%D7%99%D7%92%D7%95-%D7%91%D7%A7%D7%A0%D7%99%D7%95%D7%9F-%D7%90%D7%95%D7%A8%D7%95%D7%AA') {
    return res.redirect(301, '/פסטיבלים_ואירועי_חוצות');
  }
  



  //http://www.oren-pro.com/1310/1306/פורים-קרנבל-ברזילאי
  if (String(req.originalUrl) === '/1310/1306/%D7%A4%D7%95%D7%A8%D7%99%D7%9D-%D7%A7%D7%A8%D7%A0%D7%91%D7%9C-%D7%91%D7%A8%D7%96%D7%99%D7%9C%D7%90%D7%99') {
    return res.redirect(301, '/אירועי_קונספט/אירועי_חברה');
  }

  //http://www.oren-pro.com/1339/1069/סיור-חנוכיות-בירושלים
  if (String(req.originalUrl) === '/1339/1069/%D7%A1%D7%99%D7%95%D7%A8-%D7%97%D7%A0%D7%95%D7%9B%D7%99%D7%95%D7%AA-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1198/993/סיור-סליחות-בצפת
  if (String(req.originalUrl) === '/1198/993/%D7%A1%D7%99%D7%95%D7%A8-%D7%A1%D7%9C%D7%99%D7%97%D7%95%D7%AA-%D7%91%D7%A6%D7%A4%D7%AA') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1311/1306/אירוע-פורים-למשפחות-עם-הפרופסור-המשוגע
  if (String(req.originalUrl) === '/1311/1306/%D7%90%D7%99%D7%A8%D7%95%D7%A2-%D7%A4%D7%95%D7%A8%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA-%D7%A2%D7%9D-%D7%94%D7%A4%D7%A8%D7%95%D7%A4%D7%A1%D7%95%D7%A8-%D7%94%D7%9E%D7%A9%D7%95%D7%92%D7%A2') {
    return res.redirect(301, '/פורים_משפחות/אירוע_משפחות/אירועי_חברה');
  }


  //http://www.oren-pro.com/1347/1306/הפנינג-משפחות-פורים-בסגנון-הוואי
  if (String(req.originalUrl) === '/1347/1306/%D7%94%D7%A4%D7%A0%D7%99%D7%A0%D7%92-%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA-%D7%A4%D7%95%D7%A8%D7%99%D7%9D-%D7%91%D7%A1%D7%92%D7%A0%D7%95%D7%9F-%D7%94%D7%95%D7%95%D7%90%D7%99') {
    return res.redirect(301, '/אירוע_משפחות/אירועי_חברה');
  }


  //http://www.oren-pro.com/1218/993/ירושלים-בזוית-נוספת
  if (String(req.originalUrl) === '/1218/993/%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-%D7%91%D7%96%D7%95%D7%99%D7%AA-%D7%A0%D7%95%D7%A1%D7%A4%D7%AA') {
    return res.redirect(301, '/יום_כיף_בירושלים/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1078/1069/יום-כיף-טיול-בירושלים
  if (String(req.originalUrl) === '/1078/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%98%D7%99%D7%95%D7%9C-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D') {
    return res.redirect(301, '/יום_כיף_בירושלים/ימי_גיבוש_וכיף/אירועי_חברה');
  }



  //http://www.oren-pro.com/1213/993/סיור-חנוכיות-בצפת
  if (String(req.originalUrl) === '/1213/993/%D7%A1%D7%99%D7%95%D7%A8-%D7%97%D7%A0%D7%95%D7%9B%D7%99%D7%95%D7%AA-%D7%91%D7%A6%D7%A4%D7%AA') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1324/1320/סיור-ליקוט-בגלבוע--
  if (String(req.originalUrl) === '/1324/1320/%D7%A1%D7%99%D7%95%D7%A8-%D7%9C%D7%99%D7%A7%D7%95%D7%98-%D7%91%D7%92%D7%9C%D7%91%D7%95%D7%A2--') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1313/1306/מסיבת-פורים
  if (String(req.originalUrl) === '/1313/1306/%D7%9E%D7%A1%D7%99%D7%91%D7%AA-%D7%A4%D7%95%D7%A8%D7%99%D7%9D') {
    return res.redirect(301, '/אירועי_קונספט/אירועי_חברה');
  }

  //http://www.oren-pro.com/event/572/132/הפקת_אירוע_בכותל
  if (String(req.originalUrl) === '/event/572/132/%D7%94%D7%A4%D7%A7%D7%AA_%D7%90%D7%99%D7%A8%D7%95%D7%A2_%D7%91%D7%9B%D7%95%D7%AA%D7%9C') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1341/1069/מרוץ-ירושלים
  if (String(req.originalUrl) === '/1341/1069/%D7%9E%D7%A8%D7%95%D7%A5-%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D') {
    return res.redirect(301, '/נופש_בהרי_ירושלים/נופש_חברה/אירועי_חברה');
  }

  //http://www.oren-pro.com/1076/1069/יום-גיבוש-בירושלים
  if (String(req.originalUrl) === '/1076/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D') {
    return res.redirect(301, '/נופש_בהרי_ירושלים/נופש_חברה/אירועי_חברה');
  }

  //http://www.oren-pro.com/1321/1320/הכרמל-במיטבוטיול-פריחות-בכרמל
  if (String(req.originalUrl) === '/1321/1320/%D7%94%D7%9B%D7%A8%D7%9E%D7%9C-%D7%91%D7%9E%D7%99%D7%98%D7%91%D7%95%D7%98%D7%99%D7%95%D7%9C-%D7%A4%D7%A8%D7%99%D7%97%D7%95%D7%AA-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }


  //http://www.oren-pro.com/1328/1008/ספארי-לילה
  if (String(req.originalUrl) === '/1328/1008/%D7%A1%D7%A4%D7%90%D7%A8%D7%99-%D7%9C%D7%99%D7%9C%D7%94') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/event/1124/130/טיול_חברה
  if (String(req.originalUrl) === '/event/1124/130/%D7%98%D7%99%D7%95%D7%9C_%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/אירועי_חברה');
  }

  //http://www.oren-pro.com/995/986/הפקת-אירועים-בטבע
  if (String(req.originalUrl) === '/995/986/%D7%94%D7%A4%D7%A7%D7%AA-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%91%D7%98%D7%91%D7%A2') {
    return res.redirect(301, '/אירועי_חברה');
  }

  //http://www.oren-pro.com/1335/1069/אירוע-חנוכה-2013
  if (String(req.originalUrl) === '/1335/1069/%D7%90%D7%99%D7%A8%D7%95%D7%A2-%D7%97%D7%A0%D7%95%D7%9B%D7%94-2013') {
    return res.redirect(301, '/חוגגים_חנוכה/אירועי_קונספט/אירועי_חברה');
  }

  //http://www.oren-pro.com/1085/1069/יום-גיבוש-תחת-אש
  if (String(req.originalUrl) === '/1085/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%AA%D7%97%D7%AA-%D7%90%D7%A9') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1203/993/יום-כיף-מדברי
  if (String(req.originalUrl) === '/1203/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9E%D7%93%D7%91%D7%A8%D7%99') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1343/1069/יום-גיבוש-בצפון-מתגלגלים-בגולן
  if (String(req.originalUrl) === '/1343/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%A6%D7%A4%D7%95%D7%9F-%D7%9E%D7%AA%D7%92%D7%9C%D7%92%D7%9C%D7%99%D7%9D-%D7%91%D7%92%D7%95%D7%9C%D7%9F') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1199/1008/יום-גיבוש-בים
  if (String(req.originalUrl) === '/1199/1008/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1295/1205/יום-כיף-למשפחות-בחוף-דור
  if (String(req.originalUrl) === '/1295/1205/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9C%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA-%D7%91%D7%97%D7%95%D7%A3-%D7%93%D7%95%D7%A8') {
    return res.redirect(301, '/אירוע_משפחות/אירועי_חברה');
  }
  //http://www.oren-pro.com/1330/1069/יום-כיף-בטוסקנה-הישראלית
  if (String(req.originalUrl) === '/1330/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%98%D7%95%D7%A1%D7%A7%D7%A0%D7%94-%D7%94%D7%99%D7%A9%D7%A8%D7%90%D7%9C%D7%99%D7%AA') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1320/1320/טיול-פריחה
  if (String(req.originalUrl) === '/1320/1320/%D7%98%D7%99%D7%95%D7%9C-%D7%A4%D7%A8%D7%99%D7%97%D7%94') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1051/993/יום-כיף-בבריכה
  if (String(req.originalUrl) === '/1051/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%91%D7%A8%D7%99%D7%9B%D7%94') {
    return res.redirect(301, '/TDK_FAMILY/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1020/1008/יום-גיבוש-בכרמל--איזור-חוף-הכרמל
  if (String(req.originalUrl) === '/1020/1008/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C--%D7%90%D7%99%D7%96%D7%95%D7%A8-%D7%97%D7%95%D7%A3-%D7%94%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1208/993/יום-כיף-יום-האישה
  if (String(req.originalUrl) === '/1208/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%99%D7%95%D7%9D-%D7%94%D7%90%D7%99%D7%A9%D7%94') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1217/993/יום-חוויתי-בכרמל
  if (String(req.originalUrl) === '/1217/993/%D7%99%D7%95%D7%9D-%D7%97%D7%95%D7%95%D7%99%D7%AA%D7%99-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }
  //http://www.oren-pro.com/1074/1069/יום-גיבוש-בצפון
  if (String(req.originalUrl) === '/1074/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%A6%D7%A4%D7%95%D7%9F') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1332/1069/יום-כיף-קולינרי
  if (String(req.originalUrl) === '/1332/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%A7%D7%95%D7%9C%D7%99%D7%A0%D7%A8%D7%99') {
    return res.redirect(301, '/אירועי_קונספט/אירועי_חברה');
  }
  //http://www.oren-pro.com/1088/1069/יום-גיבוש-חברה-יום-ספורט
  if (String(req.originalUrl) === '/1088/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%97%D7%91%D7%A8%D7%94-%D7%99%D7%95%D7%9D-%D7%A1%D7%A4%D7%95%D7%A8%D7%98') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1337/1069/יום-גיבוש-קרב-סכינים
  if (String(req.originalUrl) === '/1337/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%A7%D7%A8%D7%91-%D7%A1%D7%9B%D7%99%D7%A0%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1072/1069/יום-כיף-בים-בסגנון-הוואי
  if (String(req.originalUrl) === '/1072/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%99%D7%9D-%D7%91%D7%A1%D7%92%D7%A0%D7%95%D7%9F-%D7%94%D7%95%D7%95%D7%90%D7%99') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1224/993/יום-כיף-בתל-אביב-חוויה-לכל-החושים
  if (String(req.originalUrl) === '/1224/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91-%D7%97%D7%95%D7%95%D7%99%D7%94-%D7%9C%D7%9B%D7%9C-%D7%94%D7%97%D7%95%D7%A9%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1089/1069/יום-כיף-חוויות-בכרמל
  if (String(req.originalUrl) === '/1089/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%97%D7%95%D7%95%D7%99%D7%95%D7%AA-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/יום_כיף_בכרמל/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1009/993/יום-כיף-בספא
  if (String(req.originalUrl) === '/1009/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%A1%D7%A4%D7%90') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1016/1008/ערב-גיבוש
  if (String(req.originalUrl) === '/1016/1008/%D7%A2%D7%A8%D7%91-%D7%92%D7%99%D7%91%D7%95%D7%A9') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1216/993/יום-כיף-בדרום-ארץ-מדבר
  if (String(req.originalUrl) === '/1216/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%93%D7%A8%D7%95%D7%9D-%D7%90%D7%A8%D7%A5-%D7%9E%D7%93%D7%91%D7%A8') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1333/1069/יום-כיף-במרכז
  if (String(req.originalUrl) === '/1333/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%9E%D7%A8%D7%9B%D7%96') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1225/1008/יום-גיבוש-בירושלים-קרב-סכינים
  if (String(req.originalUrl) === '/1225/1008/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-%D7%A7%D7%A8%D7%91-%D7%A1%D7%9B%D7%99%D7%A0%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/993/993/יום-כיף
  if (String(req.originalUrl) === '/993/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1002/993/יום-כיף-סובב-בכנרת
  if (String(req.originalUrl) === '/1002/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%A1%D7%95%D7%91%D7%91-%D7%91%D7%9B%D7%A0%D7%A8%D7%AA') {
    return res.redirect(301, '/כיף__על_ים_כנרת/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1070/1069/יום-כיף-בצפון---בוקרים
  if (String(req.originalUrl) === '/1070/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%A6%D7%A4%D7%95%D7%9F---%D7%91%D7%95%D7%A7%D7%A8%D7%99%D7%9D') {
    return res.redirect(301, '/המערב_הפרוע/אירועי_קונספט/אירועי_חברה');
  }
  //http://www.oren-pro.com/1331/1069/יום-כיף-בכרמל
  if (String(req.originalUrl) === '/1331/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }
  //http://www.oren-pro.com/1344/1069/יום-כיף-בדרום-קסם-המדבר
  if (String(req.originalUrl) === '/1344/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%93%D7%A8%D7%95%D7%9D-%D7%A7%D7%A1%D7%9D-%D7%94%D7%9E%D7%93%D7%91%D7%A8') {
    return res.redirect(301, '/נופש_מנהלים_במדבר/אירוע_מנהלים/אירועי_חברה');
  }
  //http://www.oren-pro.com/1090/1069/יום-גיבוש-טיול-מיוחד-למצדה
  if (String(req.originalUrl) === '/1090/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%98%D7%99%D7%95%D7%9C-%D7%9E%D7%99%D7%95%D7%97%D7%93-%D7%9C%D7%9E%D7%A6%D7%93%D7%94') {
    return res.redirect(301, '/נופש_מנהלים_במדבר/אירוע_מנהלים/אירועי_חברה');
  }
  //http://www.oren-pro.com/1003/993/יום-כיף-בים-המלח
  if (String(req.originalUrl) === '/1003/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%99%D7%9D-%D7%94%D7%9E%D7%9C%D7%97') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1014/993/יום-כיף-בחורף
  if (String(req.originalUrl) === '/1014/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%97%D7%95%D7%A8%D7%A3') {
    return res.redirect(301, '/נופש_מנהלים_במדבר/אירוע_מנהלים/אירועי_חברה');
  }
  //http://www.oren-pro.com/1049/993/יום-כיף-בקיסריה-
  if (String(req.originalUrl) === '/1049/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%A7%D7%99%D7%A1%D7%A8%D7%99%D7%94-') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/1087/1069/יום-כיף-משפחות-בים
  if (String(req.originalUrl) === '/1087/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA-%D7%91%D7%99%D7%9D') {
    return res.redirect(301, '/QUALCOMM_VILLAGE/אירועי_קונספט/אירועי_חברה');
  }
  //http://www.oren-pro.com/1278/993/יום-כייף-בחרמון
  if (String(req.originalUrl) === '/1278/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%99%D7%A3-%D7%91%D7%97%D7%A8%D7%9E%D7%95%D7%9F') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/event/206/130/
  if (String(req.originalUrl) === '/event/206/130/') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }


  //http://www.oren-pro.com/1326/1069/יום-גיבוש-בים
  if (String(req.originalUrl) === '/1326/1069/%D7%99%D7%95%D7%9D-%D7%92%D7%99%D7%91%D7%95%D7%A9-%D7%91%D7%99%D7%9D') {
    return res.redirect(301, '/אירוע_משפחות/אירועי_חברה');
  }
  //http://www.oren-pro.com/1188/1069/יום-כיף-בחוף-דור
  if (String(req.originalUrl) === '/1188/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%97%D7%95%D7%A3-%D7%93%D7%95%D7%A8') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  // http://www.oren-pro.com/1077/1069/יום-כיף-לעובדים
  if (String(req.originalUrl) === '/1077/1069/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9C%D7%A2%D7%95%D7%91%D7%93%D7%99%D7%9D') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1356/1356/יום-כיף-בים-ב-210-ש
  if (String(req.originalUrl) === '/1356/1356/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%91%D7%99%D7%9D-%D7%91-210-%D7%A9') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1015/1008/פעילות-אתגרית-בשטח
  if (String(req.originalUrl) === '/1015/1008/%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%AA-%D7%90%D7%AA%D7%92%D7%A8%D7%99%D7%AA-%D7%91%D7%A9%D7%98%D7%97') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1011/1008/סדנאות-גיבוש
  if (String(req.originalUrl) === '/1011/1008/%D7%A1%D7%93%D7%A0%D7%90%D7%95%D7%AA-%D7%92%D7%99%D7%91%D7%95%D7%A9') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  //http://www.oren-pro.com/1013/1008/סדנאות-ופעילויות-בטבע
  if (String(req.originalUrl) === '/1013/1008/%D7%A1%D7%93%D7%A0%D7%90%D7%95%D7%AA-%D7%95%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%99%D7%95%D7%AA-%D7%91%D7%98%D7%91%D7%A2') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }


  //http://www.oren-pro.com/1296/1296/יום-משפחות-בים
  if (String(req.originalUrl) === '/1296/1296/%D7%99%D7%95%D7%9D-%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA-%D7%91%D7%99%D7%9D') {
    return res.redirect(301, '/אירוע_משפחות/אירועי_חברה');
  }



  //http://www.oren-pro.com/1027/986/בר-מצוה-בטבע
  if (String(req.originalUrl) === '/1027/986/%D7%91%D7%A8-%D7%9E%D7%A6%D7%95%D7%94-%D7%91%D7%98%D7%91%D7%A2') {
    return res.redirect(301, '/קצת_אחרת');
  }

  //http://www.oren-pro.com/1242/1204/שלבים-בתכנון-אירוע
  if (String(req.originalUrl) === '/1242/1204/%D7%A9%D7%9C%D7%91%D7%99%D7%9D-%D7%91%D7%AA%D7%9B%D7%A0%D7%95%D7%9F-%D7%90%D7%99%D7%A8%D7%95%D7%A2') {
    return res.redirect(301, '/קצת_אחרת');
  }

  //http://www.oren-pro.com/997/986/הפקת-בר-מצווה
  if (String(req.originalUrl) === '/997/986/%D7%94%D7%A4%D7%A7%D7%AA-%D7%91%D7%A8-%D7%9E%D7%A6%D7%95%D7%95%D7%94') {
    return res.redirect(301, '/קצת_אחרת');
  }

  //http://www.oren-pro.com/event/211/131/חתונה
  if (String(req.originalUrl) === '/event/211/131/%D7%97%D7%AA%D7%95%D7%A0%D7%94') {
    return res.redirect(301, '/קצת_אחרת');
  }






  //http://www.oren-pro.com/1047/1021/שבועות-בקניון-חוצות-אלונים-
  if (String(req.originalUrl) === '/1047/1021/%D7%A9%D7%91%D7%95%D7%A2%D7%95%D7%AA-%D7%91%D7%A7%D7%A0%D7%99%D7%95%D7%9F-%D7%97%D7%95%D7%A6%D7%95%D7%AA-%D7%90%D7%9C%D7%95%D7%A0%D7%99%D7%9D-') {
    return res.redirect(301, '/אירועי_חוצות/פסטיבלים_ואירועי_חוצות');
  }

  //http://www.oren-pro.com/1204/1204/אירוע חברה
  if (String(req.originalUrl) === '/1204/1204/%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/אירועי_חברה');
  }
  //http://www.oren-pro.com/event/210/130/אירוע_ערב_חברה
  if (String(req.originalUrl) === '/event/210/130/%D7%90%D7%99%D7%A8%D7%95%D7%A2_%D7%A2%D7%A8%D7%91_%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/מסיבת_פורים-_שנות_ה-20/אירועי_קונספט/אירועי_חברה');
  }
  //http://www.oren-pro.com/gallery.asp?id=210&type=130&title=ערבי חברה
  if (String(req.originalUrl) === '/gallery.asp?id=210&type=130&title=%D7%A2%D7%A8%D7%91%D7%99%20%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/ערב_חברה/אירועי_לקוחות/אירועי_חברה');
  }


  //http://www.oren-pro.com/1293/1205/כרמל-וים
  if (String(req.originalUrl) === '/1293/1205/%D7%9B%D7%A8%D7%9E%D7%9C-%D7%95%D7%99%D7%9D') {
    return res.redirect(301, '/על_הים/אירועי_לקוחות/אירועי_שיווק_וקד״מ');
  }



  //http://www.oren-pro.com/1006/986/הפקות-פסטיבלים-הפקות-אירועי-חוצות
  if (String(req.originalUrl) === '/1006/986/%D7%94%D7%A4%D7%A7%D7%95%D7%AA-%D7%A4%D7%A1%D7%98%D7%99%D7%91%D7%9C%D7%99%D7%9D-%D7%94%D7%A4%D7%A7%D7%95%D7%AA-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99-%D7%97%D7%95%D7%A6%D7%95%D7%AA') {
    return res.redirect(301, '/פסטיבלים_ואירועי_חוצות');
  }

  //http://www.oren-pro.com/1004/986/הפקות-אירועים-בקניונים
  if (String(req.originalUrl) === '/1004/986/%D7%94%D7%A4%D7%A7%D7%95%D7%AA-%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-%D7%91%D7%A7%D7%A0%D7%99%D7%95%D7%A0%D7%99%D7%9D') {
    return res.redirect(301, '/פסטיבלים_ואירועי_חוצות');
  }




  //http://www.oren-pro.com/1349/1348/נופש-חברה---זמן-המדבר
  if (String(req.originalUrl) === '/1349/1348/%D7%A0%D7%95%D7%A4%D7%A9-%D7%97%D7%91%D7%A8%D7%94---%D7%96%D7%9E%D7%9F-%D7%94%D7%9E%D7%93%D7%91%D7%A8') {
    return res.redirect(301, '/נופש_מנהלים_במדבר/נופש_חברה/אירועי_חברה');
  }

  //http://www.oren-pro.com/1219/993/קסם-המדבר
  if (String(req.originalUrl) === '/1219/993/%D7%A7%D7%A1%D7%9D-%D7%94%D7%9E%D7%93%D7%91%D7%A8') {
    return res.redirect(301, '/נופש_מנהלים_במדבר/נופש_חברה/אירועי_חברה');
  }

  //http://www.oren-pro.com/1203/993/יום-כיף-מדברי
  if (String(req.originalUrl) === '/1203/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3-%D7%9E%D7%93%D7%91%D7%A8%D7%99') {
    return res.redirect(301, '/נופש_מנהלים_במדבר/נופש_חברה/אירועי_חברה');
  }


  // http://www.oren-pro.com/1348/1348/נופש-חברה
  if (String(req.originalUrl) === '/1348/1348/%D7%A0%D7%95%D7%A4%D7%A9-%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/נופש_חברה/אירועי_חברה');
  }
  //http://www.oren-pro.com/1350/1348/נופש-חברה-מתחממים-בצפון
  if (String(req.originalUrl) === '/1350/1348/%D7%A0%D7%95%D7%A4%D7%A9-%D7%97%D7%91%D7%A8%D7%94-%D7%9E%D7%AA%D7%97%D7%9E%D7%9E%D7%99%D7%9D-%D7%91%D7%A6%D7%A4%D7%95%D7%9F') {
    return res.redirect(301, '/נופש_בגליל_העליון/נופש_חברה/אירועי_חברה');
  }




  //http://www.oren-pro.com/1005/993/יום-כיף--טיול-בירושלים
  if (String(req.originalUrl) === '/1005/993/%D7%99%D7%95%D7%9D-%D7%9B%D7%99%D7%A3--%D7%98%D7%99%D7%95%D7%9C-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D') {
    return res.redirect(301, '/יום_כיף_בירושלים/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  //http://www.oren-pro.com/957/941/טיול-לדוגמא-בירושלים-
  if (String(req.originalUrl) === '/957/941/%D7%98%D7%99%D7%95%D7%9C-%D7%9C%D7%93%D7%95%D7%92%D7%9E%D7%90-%D7%91%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D-') {
    return res.redirect(301, '/יום_כיף_בירושלים/ימי_גיבוש_וכיף/אירועי_חברה');
  }

  // http://www.oren-pro.com/1204/1204/אירוע חברה
  if (String(req.originalUrl) === '/1204/1204/%D7%90%D7%99%D7%A8%D7%95%D7%A2%20%D7%97%D7%91%D7%A8%D7%94') {
    return res.redirect(301, '/אירועי_חברה');
  }
  
  
  
  // new - done
  
  
  // http://www.oren-pro.com/1207/993/זיכרון-יעקב-וסביב-לה.
  if (String(req.originalUrl) === '/1207/993/%D7%96%D7%99%D7%9B%D7%A8%D7%95%D7%9F-%D7%99%D7%A2%D7%A7%D7%91-%D7%95%D7%A1%D7%91%D7%99%D7%91-%D7%9C%D7%94.') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/event/724/132/מסיבת_סוף_שנה
  if (String(req.originalUrl) === '/event/724/132/%D7%9E%D7%A1%D7%99%D7%91%D7%AA_%D7%A1%D7%95%D7%A3_%D7%A9%D7%A0%D7%94') {
    return res.redirect(301, '/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/letters_in.asp?id=861
  if (String(req.originalUrl) === '/letters_in.asp?id=861') {
    return res.redirect(301, '/');
  }
  
  // http://www.oren-pro.com/1303/1303
  if (String(req.originalUrl) === '/1303/1303') {
    return res.redirect(301, '/');
  }
  
  // http://www.oren-pro.com/event/204/130
  if (String(req.originalUrl) === '/event/204/130') {
    return res.redirect(301, '/');
  }
  
  // http://www.oren-pro.com/1220/993/עדן-בכרמל
  if (String(req.originalUrl) === '/1220/993/%D7%A2%D7%93%D7%9F-%D7%91%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/1304/1303/לעינייך-בלבד-אירוע-יום-האשה-
  if (String(req.originalUrl) === '/1304/1303/%D7%9C%D7%A2%D7%99%D7%A0%D7%99%D7%99%D7%9A-%D7%91%D7%9C%D7%91%D7%93-%D7%90%D7%99%D7%A8%D7%95%D7%A2-%D7%99%D7%95%D7%9D-%D7%94%D7%90%D7%A9%D7%94-') {
    return res.redirect(301, '/אירועי_קונספט/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/1323/1320/טיול-פריחה-בגולן-חוויה-מרגשת-וגועשת
  if (String(req.originalUrl) === '/1323/1320/%D7%98%D7%99%D7%95%D7%9C-%D7%A4%D7%A8%D7%99%D7%97%D7%94-%D7%91%D7%92%D7%95%D7%9C%D7%9F-%D7%97%D7%95%D7%95%D7%99%D7%94-%D7%9E%D7%A8%D7%92%D7%A9%D7%AA-%D7%95%D7%92%D7%95%D7%A2%D7%A9%D7%AA') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/event/916/132/הפקת_אירוע_יום_האישה
  if (String(req.originalUrl) === '/event/916/132/%D7%94%D7%A4%D7%A7%D7%AA_%D7%90%D7%99%D7%A8%D7%95%D7%A2_%D7%99%D7%95%D7%9D_%D7%94%D7%90%D7%99%D7%A9%D7%94') {
    return res.redirect(301, '/אירועי_קונספט/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/1206/1008/סודה-המופלא-של-בינמינה-כתב-חידה
  if (String(req.originalUrl) === '/1206/1008/%D7%A1%D7%95%D7%93%D7%94-%D7%94%D7%9E%D7%95%D7%A4%D7%9C%D7%90-%D7%A9%D7%9C-%D7%91%D7%99%D7%A0%D7%9E%D7%99%D7%A0%D7%94-%D7%9B%D7%AA%D7%91-%D7%97%D7%99%D7%93%D7%94') {
    return res.redirect(301, '/ימי_גיבוש_וכיף/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/1287/993/מרכז-מבקרים-בננל'ה
  if (String(req.originalUrl) === '/1287/993/%D7%9E%D7%A8%D7%9B%D7%96-%D7%9E%D7%91%D7%A7%D7%A8%D7%99%D7%9D-%D7%91%D7%A0%D7%A0%D7%9C%27%D7%94') {
    return res.redirect(301, '/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/13/map.asp
  if (String(req.originalUrl) === '/13/map.asp') {
    return res.redirect(301, '/');
  }
  
  // http://www.oren-pro.com/1319/1306/שחקו-אותהאירוע-פורים-למשפחות
  if (String(req.originalUrl) === '/1319/1306/%D7%A9%D7%97%D7%A7%D7%95-%D7%90%D7%95%D7%AA%D7%94%D7%90%D7%99%D7%A8%D7%95%D7%A2-%D7%A4%D7%95%D7%A8%D7%99%D7%9D-%D7%9C%D7%9E%D7%A9%D7%A4%D7%97%D7%95%D7%AA') {
    return res.redirect(301, '/מסיבת_פורים/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/1305/1303/%D7%97%D7%95%D7%A4%D7%A9%D7%99,-%D7%A0%D7%A9%D7%99
  if (String(req.originalUrl) === '/1305/1303/%D7%97%D7%95%D7%A4%D7%A9%D7%99,-%D7%A0%D7%A9%D7%99') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/1200/1008/tips.asp
  if (String(req.originalUrl) === '/1200/1008/tips.asp') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/1217/993/%D7%99
  if (String(req.originalUrl) === '/1217/993/%D7%99') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/1297/1205/%D7%9B%D7%A8%D7%9E%D7%9C
  if (String(req.originalUrl) === '/1297/1205/%D7%9B%D7%A8%D7%9E%D7%9C') {
    return res.redirect(301, '/נופש_ביערות_הכרמל/נופש_חברה/אירועי_חברה');
  }
  
  // http://www.oren-pro.com/event/724/132/%D7%9E%D7%A1%D7%99%D7%91%D7%AA_%D7%A1%D7%95%D7%A3_%D7%A9%D7%A0%D7%94
  if (String(req.originalUrl) === '/event/724/132/%D7%9E%D7%A1%D7%99%D7%91%D7%AA_%D7%A1%D7%95%D7%A3_%D7%A9%D7%A0%D7%94') {
    return res.redirect(301, '/');
  }
  

  
  return next();
});










var allowedOrigins = ['http://localhost:8080',
                      'http://www.oren-pro.com',
                      'https://www.oren-pro.com',
                      'http://oren-pro-website.herokuapp.com',
                      'https://oren-pro-website.herokuapp.com'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


// prerender.io
//app.use(require('prerender-node').whitelisted(['/search', '/users/.*/profile']));
var prerender = require('prerender-node')
                .whitelisted([
                              '/',
                              '/about', 
                              '/contact', 
                              '/מאמרים/.*',
                              '/אירועי_חברה/.*',
                              '/אירועי_שיווק_וקד״מ/.*',
                              '/פסטיבלים_ואירועי_חוצות/.*',
                              '/קצת_אחרת/.*',
                              ])
                .set('prerenderToken', process.env.PRERENDER_TOKEN);
prerender.crawlerUserAgents = [];
prerender.crawlerUserAgents.push('googlebot');
prerender.crawlerUserAgents.push('bingbot');
prerender.crawlerUserAgents.push('yandex');
app.use(prerender);




const publicPath = path.join(__dirname, '../', 'public');

const port = process.env.PORT || 3000;


// robots.txt

app.get('/robots.txt', function (req, res) {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /login\nAllow: /");
});



// init bd connection

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: 'https://oren-pro.firebaseio.com'
});




// sitemap.xml

app.get('/sitemap.xml', function(req, res) {
    let urls = [];
    var root_path = 'https://www.oren-pro.com/';
    var db = admin.database();
    var refCategories = db.ref('eventsCategories/');
    var refSubcategories = db.ref('eventsSubcategories/');
    var refEvents = db.ref('eventsItems/');
    refCategories.once("value", function(snapshotCategories) {
        if(snapshotCategories.val() !== null) {
          const categories = snapshotCategories.val();
          refSubcategories.once("value", function(snapshotSubcategories) {
            if(snapshotSubcategories.val() !== null) {
                const subcategories = snapshotSubcategories.val();
                refEvents.once("value", function(snapshotEvents) {
                if(snapshotEvents.val() !== null) {
                    const events = snapshotEvents.val();
                    for (var i in categories) {
                      let categoryId = categories[i].id;
                      let strCategory = categories[i].name;
                      while (strCategory.indexOf(' ') > -1) {
                          strCategory = strCategory.replace(' ' ,'_');
                      }
                      urls.push(strCategory);
                      for (var j in subcategories) {
                        if(subcategories[j].categories && subcategories[j].categories[categoryId]){
                          let subcategoryId = subcategories[j].id;
                          let strSubcategory = subcategories[j].name;
                          while (strSubcategory.indexOf(' ') > -1) {
                              strSubcategory = strSubcategory.replace(' ' ,'_');
                          }
                          urls.push(strSubcategory + '/' + strCategory);
                          for (var k in events) {
                            if(events[k].categories && events[k].categories[categoryId] && events[k].subcategories && events[k].subcategories[subcategoryId]){
                              let event = events[k].name;
                              while (event.indexOf(' ') > -1) {
                                  event = event.replace(' ' ,'_');
                              }
                              urls.push(event + '/' + strSubcategory + '/' + strCategory);
                            }
                            k++;
                          }
                        }
                        j++;
                      }
                      i++;
                    }
                  var priority = 0.5;
                  var freq = 'monthly';
                  var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
                  for (var i in urls) {
                      xml += '<url>';
                      xml += '<loc>'+ root_path + urls[i] + '</loc>';
                      xml += '<changefreq>'+ freq +'</changefreq>';
                      xml += '<priority>'+ priority +'</priority>';
                      xml += '</url>';
                      i++;
                  }
                  xml += '</urlset>';
                  res.header('Content-Type', 'text/xml');
                  res.send(xml);
                }
              });
            }
          });
        }
    });   
})



//*** server side rendering -- SEO ***//

app.get('/:category?/:subCategory?/:event?/:toomuch?', function(request, response, next) {
    if (request.params.toomuch) {
      next();
    } else {
      const filePath = path.resolve(__dirname, '../public', 'index.html');
      let categoryOk = false;
      if(request.params.category && request.params.category.indexOf('.') === -1 && request.params.category.indexOf('#') === -1 && request.params.category.indexOf('$') === -1 && request.params.category.indexOf('[') === -1 && request.params.category.indexOf(']') === -1){
        categoryOk = true;
      }
      let subCategoryOk = false;
      if(request.params.subCategory && request.params.subCategory.indexOf('.') === -1 && request.params.subCategory.indexOf('#') === -1 && request.params.subCategory.indexOf('$') === -1 && request.params.subCategory.indexOf('[') === -1 && request.params.subCategory.indexOf(']') === -1){
        subCategoryOk = true;
      }
      let eventOk = false;
      if(request.params.event && request.params.event.indexOf('.') === -1 && request.params.event.indexOf('#') === -1 && request.params.event.indexOf('$') === -1 && request.params.event.indexOf('[') === -1 && request.params.event.indexOf(']') === -1){
        eventOk = true;
      }
      

      // console.log("cat check");
      // console.log(categoryOk);
      // console.log(subCategoryOk);
      // console.log(eventOk);

      //if (categoryOk && subCategoryOk && eventOk) {
          let dbString = 'serverSeo/';
          if(!request.params.category && !request.params.subCategory && !request.params.event) {
              dbString = dbString;
              var db = admin.database();
                var ref = db.ref(dbString);
                ref.once("value", function(snapshot) {
                    let seo = {
                      title: 'אורן ורינת הפקות',
                      description: 'אורן ורינת הפקות',
                      keyWords: 'אורן ורינת הפקות'
                    };
                    if(snapshot.val() !== null) {
                      seo = snapshot.val().seo;
                    }

                    //console.log(seo);

                    fs.readFile(filePath, 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      data = data.replace(/\$OG_TITLE/g, seo.title);
                      data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
                      data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
                      data = data.replace(/\$OG_IMAGE/g, 'https://www.oren-pro.com/images/og_image.jpg');
                      response.send(data);
                    }, function (errorObject) {
                      console.log("The read failed: " + errorObject.code);
                    });
                });
          } else if (request.params.category && !request.params.subCategory && !request.params.event) {
              if (categoryOk && !subCategoryOk && !eventOk) {
                dbString = dbString + String(request.params.category);
                var db = admin.database();
                var ref = db.ref(dbString);
                ref.once("value", function(snapshot) {
                    let seo = {
                      title: 'אורן ורינת הפקות',
                      description: 'אורן ורינת הפקות',
                      keyWords: 'אורן ורינת הפקות'
                    };
                    if(snapshot.val() !== null) {
                      seo = snapshot.val().seo;
                    }

                    //console.log(seo);

                    fs.readFile(filePath, 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      data = data.replace(/\$OG_TITLE/g, seo.title);
                      data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
                      data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
                      data = data.replace(/\$OG_IMAGE/g, '/images/og_image.jpg');
                      response.send(data);
                    }, function (errorObject) {
                      console.log("The read failed: " + errorObject.code);
                    });
                });
              } else {
                next();
              }
          } else if (request.params.category && request.params.subCategory && !request.params.event) {
              if (categoryOk && subCategoryOk && !eventOk) {
                dbString = dbString + 'subcategories/' + String(request.params.category);
                var db = admin.database();
                var ref = db.ref(dbString);
                ref.once("value", function(snapshot) {
                    let seo = {
                      title: 'אורן ורינת הפקות',
                      description: 'אורן ורינת הפקות',
                      keyWords: 'אורן ורינת הפקות'
                    };
                    if(snapshot.val() !== null) {
                      seo = snapshot.val().seo;
                    }

                    //console.log(seo);

                    fs.readFile(filePath, 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      data = data.replace(/\$OG_TITLE/g, seo.title);
                      data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
                      data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
                      data = data.replace(/\$OG_IMAGE/g, '/images/og_image.jpg');
                      response.send(data);
                    }, function (errorObject) {
                      console.log("The read failed: " + errorObject.code);
                    });
                });
              } else {
                next();
              }
          } else {
              if (categoryOk && subCategoryOk && eventOk) {
                dbString = dbString + 'events/' + String(request.params.category);
                var db = admin.database();
                var ref = db.ref(dbString);
                ref.once("value", function(snapshot) {
                    let seo = {
                      title: 'אורן ורינת הפקות',
                      description: 'אורן ורינת הפקות',
                      keyWords: 'אורן ורינת הפקות'
                    };
                    if(snapshot.val() !== null) {
                      seo = snapshot.val().seo;
                    }

                    //console.log(seo);

                    fs.readFile(filePath, 'utf8', function (err,data) {
                      if (err) {
                        return console.log(err);
                      }
                      data = data.replace(/\$OG_TITLE/g, seo.title);
                      data = data.replace(/\$OG_DESCRIPTION/g, seo.description);
                      data = data.replace(/\$OG_KEYWORDS/g, seo.keyWords);
                      data = data.replace(/\$OG_IMAGE/g, '/images/og_image.jpg');
                      response.send(data);
                    }, function (errorObject) {
                      console.log("The read failed: " + errorObject.code);
                    });
                });
              } else {
                next();
              }
          }
          
      //} else {
      //    next();
      //}
    }
});

//******    end ssr --- SEO     ******//




app.get('*.js', function (request, response, next) {
  if(request.headers['user-agent'].toLowerCase().indexOf('firefox') === -1) {
    request.url = request.url + '.gz';
    response.set('Content-Encoding', 'gzip');
  }
    next();
});


app.get('*.css', function (request, response, next) {
  if(request.headers['user-agent'].toLowerCase().indexOf('firefox') === -1) {
    request.url = request.url + '.gz';
    response.set('Content-Encoding', 'gzip');
    response.set('Content-Type', 'text/css');
  }
    next();
});

app.use(compression());

app.use(express.static(publicPath));





app.post("/deleteImage", bodyParser.urlencoded({ extended: true }), function(request, response) {
    if(request.body.publicid){

        // cloudinary.config({ 
        //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || cloudinaryVars.cloud_name, 
        //   api_key: process.env.CLOUDINARY_API_KEY || cloudinaryVars.api_key, 
        //   api_secret: process.env.CLOUDINARY_API_SECRET || cloudinaryVars.api_secret
        // });

        cloudinary.config({ 
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
          api_key: process.env.CLOUDINARY_API_KEY, 
          api_secret: process.env.CLOUDINARY_API_SECRET
        });
        cloudinary.v2.uploader.destroy(request.body.publicid, function(error, result){console.log(result, error)});
    }
    return 'hia';
});

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    }
});

app.post("/sendEmail", bodyParser.urlencoded({ extended: true }), function(request, response) {
    if(request.body.name){
        var mailOptions = {
          from: 'message@frixell.net',
          to: 'info@oren-pro.com',
          subject: request.body.email,
          text: request.body.name + '\r\n' + request.body.email + '\r\n' + request.body.phone + '\r\n' + request.body.message
        };
        transporter.sendMail (mailOptions, function(error, info){
          if(error){
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
    }
    return 'hia';
});



// var minify = require('html-minifier').minify;
// var result = minify(path.join(publicPath, 'index.html'), {
//   removeAttributeQuotes: true,
//   collapseWhitespace: true,
//   conservativeCollapse: true,
//   minifyCSS: true,
//   minifyJS: true,
//   removeScriptTypeAttributes: true,
//   removeStyleLinkTypeAttributes: true,
//   removeOptionalTags: true,
//   removeRedundantAttributes: true,
//   caseSensitive: true,
//   collapseBooleanAttributes: true,
//   collapseInlineTagWhitespace: true,
//   decodeEntities: true,
//   minifyURLs: true
// });

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server is up!');
})