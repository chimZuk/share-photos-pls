'use strict';

const async = require('asyncawait/async');
const await = require('asyncawait/await');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(uri, { useNewUrlParser: true });

var API = {};

API.readDialog = (request) => {
    console.log(request);
    client.connect(err => {
        const collection = client.db("files").collection("collections");
        console.log(collection);
        client.close();
    });
};

Object.keys(API).forEach(key =>
    API[key] = async(API[key])
);

module.exports = API;