const express = require('express')
const cors = require('cors');

const app = express()
const port = 4400

app.get('/image', async ( req, res) => {
    const url = 'https://www.pringles.com/content/global/pringles/en_GB/pages/home/jcr:content/gridSystem/par/Copy%20of%20Copy%20of%20feature/slideData/jcr:content/par/inuitgrid/par/inuitgrid_975246484/par/responsiveimage.img.png/1635746373570.png'
    res.send(/**/);
});



let products = [{
"productId": "12345",
"prodName": "Pringles",
"price": "20USD",
"expDate": "12-12-2022",
"manuDate": "12-12-2021",
"image" : "https://www.pringles.com/content/global/pringles/en_GB/pages/home/jcr:content/gridSystem/par/Copy%20of%20Copy%20of%20feature/slideData/jcr:content/par/inuitgrid/par/inuitgrid_975246484/par/responsiveimage.img.png/1635746373570.png "

},
{
    "productId": "123456",
    "prodName": "Lays",
    "price": "10USD",
    "expDate": "12-12-2022",
    "manuDate": "12-12-2021",
    "image" : "https://i.insider.com/5f11c471f0f419303616a1fe?width=1136&format=jpeg"
},
{
    "productId": "123457",
    "prodName": "Cheetos",
    "price": "30USD",
    "expDate": "12-12-2022",
    "manuDate": "12-12-2021",
    "image" : " https://www.cheetos.com/sites/cheetos.com/files/2019-03/Cheetos%20Crunchy_v2_0.png  "
}];

var allowCrossDomain = function(req, res, next) {
res.header('Access-Control-Allow-Origin', "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
}

app.use(cors());

app.use(allowCrossDomain);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/product', (req, res) => {
    res.json(products);
});

app.listen(port, ()  => console.log('Products API app Listening on port ' +port ));

app.get('/product/:productId', (req, res) => {
    // reading isbn from the URL
    const productId = req.params.productId;
    
    // searching books for the isbn
    for (let product of products) {
    if (product.productId === productId) {
    res.json(product);
    return;
    }
    }
    res.status(404).send('Product not found');
});

    app.post('/product', (req, res) => {
        const product = req.body;
    
        products.push(product);
    
        res.send('Product is added to the database');
    });
    
    
    app.put('/product/:productId', (req, res) => {
        // reading isbn from the URL
        const productId = req.params.productId;
        const newProduct = req.body;
        
        // remove item from the books array
        for (let i = 0; i < products.length; i++) {
        let product = products[i]
        
        if (product.productId === productId) {
        products[i] = newProduct;
        }
        }
        
        // sending 404 when not found something is a good practice
        res.send('Product is edited');
        });

       
        app.delete('/product/:productId', (req, res) => {
        //reading isbn from the URL
        const productId = req.params.productId;

        // remove item from the books array
        products = products.filter(i => {
            if (i.productId !== productId) {
                return true;
            }

            return false;
        });

        res.send ('Products is deleted');
    });