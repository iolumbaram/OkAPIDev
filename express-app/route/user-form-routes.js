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
            // console.log('Response ended: ');
            const telegramresponse = JSON.parse(Buffer.concat(data).toString());
            // console.log(telegramresponse)

            // for (user of users) {
            //     console.log(`Got user with id: ${user.id}, name: ${user.name}`);
            // }
        });
    }).on('error', err => {
        console.log('Error: ', err.message);
    });
});

router.route('/').get((req, res) => {
    // user.find((error, data) => {
    //     if (error) {
    //         return next(error)
    //     } else {
    //         res.json(data)
    //     }
    // })
})

router.route('/edit/:id').get((req, res) => {
    // user.findById(req.params.id, (error, data) => {
    //     if (error) {
    //         return next(error)
    //     } else {
    //         res.json(data)
    //     }
    // })
})

router.route('/update/:id').put((req, res, next) => {
    // user.findByIdAndUpdate(req.params.id, {
    //     $set: req.body
    // }, (error, data) => {
    //     if (error) {
    //         return next(error);
    //         console.log(error)
    //     } else {
    //         res.json(data)
    //         console.log('User updated successfully !')
    //     }
    // })
})
router.route('/delete/:id').delete((req, res, next) => {
    // user.findByIdAndRemove(req.params.id, (error, data) => {
    //     if (error) {
    //         return next(error);
    //     } else {
    //         res.status(200).json({
    //             msg: data
    //         })
    //     }
    // })
})

module.exports = router;