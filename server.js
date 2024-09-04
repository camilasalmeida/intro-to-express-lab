//Import Express
const express = require('express');
const app = express();

console.log('hello');

app.get('/', (req, res) => {
    res.send('Hello, this is the Lab Express page!');
});

//**-----------------------exercise 1:---------------------------------**
/*1. Be Polite, Greet the User
Task: Create a route that responds to URLs like /greetings/<username-parameter>.
Examples: Matches routes like /greetings/Christy or /greetings/Mathilda.
Response: Include the username from the URL in the response, such as “Hello there, Christy!” or “What a delight it is to see you once more, Mathilda.”
*/

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`<h1>Hello there, ${username}!</h1>`)
});

//**----------------------exercise 2:----------------------------------**
/* 2. Rolling the Dice
Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
Examples: Matches routes like /roll/6 or /roll/20.
Validation: If the parameter is not a number, respond with “You must specify a number.” For instance, /roll/potato should trigger this response.
Functionality: If a valid number is provided, respond with a random whole number between 0 and the given number. For example, a request to /roll/16 might respond with “You rolled a 14.”
*/

app.get('/roll/:number', (req, res) => {
    //console.log(req.params);
    const number = req.params.number;
    const num = parseInt(number, 10);               // Convert parameter to integer. Base 10 (Decimal): The standard number system that uses digits 0 through 9.
    
    if (Number.isNaN (num)) {                       //isNaN function is used in JS to determine whether a value is `NaN`(Not-a-Number).
        res.send('You must specify a number.');
    } else {
        const randomNum = Math.floor(Math.random() * (num + 1));
        res.send(`You rolled a ${randomNum}.`);
    }
});

//**-------------------exercise 3:-------------------------------------**
 /* 3. I Want THAT One!
Task: Create a route for URLs like /collectibles/<index-parameter>.
Examples: Matches routes such as /collectibles/2 or /collectibles/0.
Data Array:
  const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
Validation: If the index does not correspond to an item in the array, respond with “This item is not yet in stock. Check back soon!”
Response: Should describe the item at the given index, like “So, you want the shiny ball? For 5.95, it can be yours!” Include both the name and price properties. */
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

// Route to handle collectible requests
app.get('/collectibles/:indexNumber', (req, res) => {
    const index = parseInt(req.params.indexNumber, 10); // Convert parameter to integer
    const collectible = collectibles[index];

    if (Number.isNaN(index) || index < 0 || index >= collectibles.length) { // Check if index is out of bounds
        return res.send('<h1>This item is not yet in stock. Check back soon!</h1>');
    }

    res.send(`So you want the ${collectible.name}? For ${collectible.price}, it can be yours!`);
});

//**--------------------------------exercise 4: ---------------------------------** 
//It needs to be reviewed

/* 4. Filter Shoes by Query Parameters
Use the following array of shoes in this challenge:
  const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];
Task: Create a route /shoes that filters the list of shoes based on query parameters.
Query Parameters:
min-price: Excludes shoes below this price.
max-price: Excludes shoes above this price.
type: Shows only shoes of the specified type.
No parameters: Responds with the full list of shoes.
*/

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req,res) => {
    //res.send('<h1>This is the shoes page!</h1>');
    // console.log(req.query);
    // console.log(req.query.minprice);
    // console.log(req.query.maxprice);
    //console.log(req.query.type);

    const minPrice = parseFloat(req.query['min-price']) || 0;
    const maxPrice = parseFloat(req.query['max-price']) || Infinity;
    const type = req.query.type || null;

    let filteredShoes = shoes.filter(shoe => 
        shoe.price >= minPrice &&
        shoe.price <= maxPrice &&
        (type === null || shoe.type === type)
    );
    res.send(filteredShoes); 
 });


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} 🎧`);
});