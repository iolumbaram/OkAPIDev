let express = require('express');
let router = express.Router();
const https = require('https');

router.route('/submit').post((req, res, next) => {
    let data = req.body;

    let telegramapi = 'https://api.telegram.org/bot511882102:AAHccY18jnMQdhQfDV9jJOiqYCu8joQHpac/sendMessage?chat_id=183699849&parse_mode=HTML&text=';
    telegramapi += '<u>Income</u>:'+ ' <b>'+data.income+'</b>' +'%0A';
    telegramapi += '<u>Age</u>:'+ ' <b>'+data.age+'</b>' +'%0A';
    telegramapi += '<u>Martial Status</u>:'+ ' <b>'+data.martial_status+'</b>' +'%0A';
    telegramapi += '<u>Ctos</u>:'+ ' <b>'+data.ctos+'</b>' +'%0A';
    telegramapi += '<u>Size</u>:'+ ' <b>'+data.size+'</b>' +'%0A';
    telegramapi += '<u>Cost</u>:'+ ' <b>'+data.cost+'</b>' +'%0A';
    telegramapi += '<u>Downpayment</u>:'+ ' <b>'+data.downpayment+'</b>' +'%0A';

    https.get(telegramapi, res => {
        let data = [];
        
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
        console.log('Status Code:', res.statusCode);
        console.log('Date in Response header:', headerDate);

        res.on('data', chunk => {
            data.push(chunk);
        });

        res.on('end', () => {
        });
        
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
});

router.route('/').get((req, res) => {
})

router.route('/edit/:id').get((req, res) => {
})

router.route('/update/:id').put((req, res, next) => {
})

router.route('/delete/:id').delete((req, res, next) => {
})

module.exports = router;