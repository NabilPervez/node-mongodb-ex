const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

//establish where to connect and begins connection
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    //checks if connection was successful - if there is no error, success
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    //defines the db name
    const db = client.db(dbname);

    //clears the db every time this runs. this is for the practical purposes of this exercise
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        //defines which collection
        const collection = db.collection('campsites');

        //inserts a record into the collection
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null); //checks for error, if none - proceed
            console.log('Insert Document:', result.ops); // show the result of the operation

            collection.find().toArray((err, docs) => { // find all documents, convert found documents to an array
                assert.strictEqual(err, null); //checks for error, if none - proceed
                console.log('Found Documents:', docs); // logs all docs found

                client.close(); // immediately closes connection to db
            });
        });
    });
});