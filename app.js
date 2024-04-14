
const bodyParser = require('body-parser');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();


app.use(cors());
app.use(morgan(':method :url :status :user-agent - :response-time ms'));
// app.use(formidable());
app.use(express.static('./image'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));;




app.get("/.well-known/assetlinks.json", (req, res) => {
    return res.send([
        {
            "relation": [
                "delegate_permission/common.handle_all_urls"
            ],
            "target": {
                "namespace": "android_app",
                "package_name": "com.eisypayment.eisy_payment",
                "sha256_cert_fingerprints": [
                    "4C:76:17:54:DB:16:A3:9B:6B:DF:92:A1:2C:7D:AA:95:8E:4E:25:C0:7B:4A:B7:90:08:C9:68:81:D6:E6:E8:A8"
                ]
            }
        }
    ])
})

app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
});


app.get('*', function (req, res) {
    res.send('Sorry, this is an invalid URL.');
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});