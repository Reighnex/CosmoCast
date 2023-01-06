const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => res.send('testing'))

app.get('/apodapi', function(req, res) {
    var date = req.query.date;
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://api.nasa.gov/planetary/apod?date=' + encodeURI(date) + '&api_key=1a2yENXopHEpzXBtQJhwQIpaNZb48Su6m8xE7rRK',
        'headers': {
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
        // console.log(response.body);
    });
})

app.get('/aeisapi', function(req, res) { // 한국천문연구원 API 자체가 고장나는 경우가 종종 있음. 
    var solYear = req.query.solYear;
    var solMonth = req.query.solMonth;
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'http://apis.data.go.kr/B090041/openapi/service/AstroEventInfoService/getAstroEventInfo?solYear=' + encodeURI(solYear) + '&solMonth=' + encodeURI(solMonth) + '&numOfRows=51&ServiceKey=4ViKJ6E9wYzyGuMA6wjLHeqM66LJXTpv00JR0d1Id25jmz3iRIbsN%2FEBwXz75s%2Bd%2FACbJrM2ann7tmMLDPEItg%3D%3D',
        'headers': {
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
        //console.log(response.body);
    });
})

app.get('/mrpapi', function(req, res) {
    var earth_date = req.query.earth_date;
    var request = require('request');
    var options = {
        'method': 'GET',
        'url': 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + encodeURI(earth_date) + '&api_key=1a2yENXopHEpzXBtQJhwQIpaNZb48Su6m8xE7rRK',
        'headers': {
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.send(response.body);
        //console.log(response.body);
    });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))