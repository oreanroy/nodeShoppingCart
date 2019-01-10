var Product = require('../models/product');
var mongoose = require('mongoose');



var url = 'mongodb://orean:' + 
 process.env.MONGO_ATLAS_PW + 
 '@node-rest-shop-shard-00-00-qqy8u.mongodb.net:27017,node-rest-shop-shard-00-01-qqy8u.mongodb.net:27017,node-rest-shop-shard-00-02-qqy8u.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true'



mongoose.connect(
    url, 
        {
            auth: {
                user: 'orean',
                password: '2437oreanRahul'
            },
            useNewUrlParser: true
        },
    function(err, client) {
        if (err) {
            console.log(err);
        }
    console.log('connected!!!');
    }
);

var products = [new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/41Ch2Z3BsVL._SX323_BO1,204,203,200_.jpg',
    title: 'Shoe Dog',
    description: 'Memoir from the creator of NIKE',
    price: 14
}),
new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51JkDEpHUQL._SX317_BO1,204,203,200_.jpg',
    title: 'ZERO To ONE',
    description: 'The master of startups sums it all.',
    price: 12
}),
new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/41vFjDSkffL._SX324_BO1,204,203,200_.jpg',
    title: 'The acidental prime minister',
    description: 'Iniside the UPA 2, the truth.',
    price: 10
}),
]

var done = 0;
for (var i=0; i < products.length; i++) {
    products[i].save(function(err, result){
        done++;
        if (done === products.length) {
           exit(); 
        }
    });
}

function exit(){
    mongoose.disconnect();    
}
