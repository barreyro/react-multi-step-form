const express = require('express');
const { pool, client } = require('./config');
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 8080;
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const getRegistrants = async (request, response) => {
    await pool
           .query('SELECT * FROM registrants;')
           .then(res => {
               response.status(200).send(res.rows)
           })
           .catch(e => response.status(500).send(e))
};
    

const addRegistrant = async (request, response) => {
	let {
	    email,
	    firstName,
	    lastName,
	    interests,
	    tshirtSize,
	    location
    } = request.body;

    interests = JSON.stringify(interests)
    const queryText = 'INSERT INTO registrants(email, firstName, lastName, tshirtSize, interests, location) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
    //let queryText = 'INSERT INTO registrants (email, firstName, lastName, interests, tshirtSize, location) VALUES( $email,$firstName,$lastName,$interests,$tshirtSize,$location) RETURNING id;'
    //let values = [email, firstName, lastName, interests, tshirtSize, location]
    let values = [email, firstName, lastName, tshirtSize, interests, location]

    client.connect();
    await client
    .query(queryText,values)
    .then(res=>{
        response.status(201).send(res)
    })
    .catch(e => {
        console.log(e);
        response.status(500).send(e)
    })
}

app.route('/registrants')
    .get(getRegistrants)
    .post(addRegistrant)

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
