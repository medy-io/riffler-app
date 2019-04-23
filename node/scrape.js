var request = require('request'),
    cheerio = require('cheerio');

// async fetch for mtg events data for a particular format
function retrieveMTGEventsData() {
    return new Promise(function (resolve, reject) {
        var mtgTop8URL = 'https://www.mtgtop8.com/format?f=LE';
        request.post(mtgTop8URL, (error, response, html) => {
            if (error) return reject(error);
            var $ = cheerio.load(html);
            var table = $('.Stable');
            console.log(table);
            resolve(table);
        });
    });
}

retrieveMTGEventsData();