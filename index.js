const axios = require('axios');
const fs = require('fs');
const cheerio = require('cheerio');


const URL = 'https://www.shortlist.com/news/most-ridiculous-trump-quotes-ever';

function strCleanUp(str) {
    const trimmedStr = str.trim();
    if (trimmedStr.endsWith('\”') || trimmedStr.endsWith('\"')) {
        return trimmedStr.slice(1, -1);
    } else if (trimmedStr[0] === '\“') {
        return trimmedStr.substring(1, trimmedStr.lastIndexOf('\”'));
    }
}

function outputToJSON(json, path) {
    const data = JSON.stringify(json);
    fs.writeFile(path, data, 'utf-8', err => {
        if (err) {
            console.log(err);
        }
        console.log('The file is saved!');
    });
}

// 8 doesnt show it properly
// “Do you believe in punishment for abortion – yes or no – as a principle?”
// “The answer is there has to be some form of punishment.”
// “For the woman?”
// “Yeah, there has to be some form.”

(async () => {
    axios.get(URL)
        .then(res => res.data)
        .then(data => {
            const array = [];
            const $ = cheerio.load(data);
            // this adds a first entry that says <1 empty item>, why?
            $('h3').each((i, elem) => {
                if ($(elem).next().is('p')) {
                    const quote = strCleanUp($(elem).next('p').text());
                    array[i] = quote;
                }
            });
            //removed <1 empty item> with shift()
            array.shift();
            outputToJSON(array, 'quotes.json');
            return;
        });
})();

