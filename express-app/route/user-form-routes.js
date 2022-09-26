let express = require('express');
let router = express.Router();
const https = require('https');

router.route('/submit').post((req, res, next) => {
    if(req.body != null) res.send("success");

    let data = req.body;
    
    let telegramapi = 'https://api.telegram.org/bot511882102:AAHccY18jnMQdhQfDV9jJOiqYCu8joQHpac/sendMessage?chat_id=183699849&parse_mode=HTML&text=';
    telegramapi += '<b>Okapi Request</b>'+ '\u{1F434} \u{1F4E2}' +'%0A';
    telegramapi += '%0A';
    telegramapi += '<b>User Profiles</b>'+ '\u{2600}' +'%0A';
    telegramapi += '\u{2022} Customer Name:'+ ' <b>'+JSON.stringify(data.customername)+'</b>' +'%0A';
    telegramapi += '\u{2022} Customer Number:'+ ' <b>'+JSON.stringify(data.customernumber)+'</b>' +'%0A';
    telegramapi += '\u{2022} Customer Address:'+ ' <b>'+JSON.stringify(data.customeraddress)+'</b>' +'%0A';
    telegramapi += '%0A';
    telegramapi += '\u{2022} Income:'+ '<b>'+JSON.stringify(data.income)+'</b>' +'%0A';
    telegramapi += '\u{2022} Age:'+ '<b>'+JSON.stringify(data.age)+'</b>' +'%0A';
    telegramapi += '\u{2022} Martial Status:'+ ' <b>'+JSON.stringify(data.martial_status)+'</b>' +'%0A';
    telegramapi += '\u{2022} Ctos:'+ ' <b>'+JSON.stringify(data.ctos)+'</b>' +'%0A';
    telegramapi += '\u{2022} System Size:'+ ' <b>'+JSON.stringify(data.size)+'</b>' +'%0A';
    telegramapi += '\u{2022} System Cost:'+ ' <b>'+JSON.stringify(data.cost)+'</b>' +'%0A';
    telegramapi += '\u{2022} Downpayment:'+ ' <b>'+JSON.stringify(data.downpayment.toFixed(2))+'</b>' +'%0A';
    telegramapi += '%0A';
    telegramapi += '\u{2022} Est Monthly TNB Bill Savings:'+ ' <b>'+JSON.stringify(data.estimated_monthly_tnb_bill_savings_rm.toFixed(2))+'</b>' +'%0A';
    telegramapi += '\u{2022} Est Monthly Instalment:'+ ' <b>'+JSON.stringify(data.estimated_monthly_instalment_rm.toFixed(2))+'</b>' +'%0A';
    telegramapi += '\u{2022} Est Cash Flow Saving:'+ ' <b>'+JSON.stringify(data.estimated_monthly_cash_flow_savings_rm.toFixed(2))+'</b>' +'%0A';
    


    console.log(telegramapi)

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