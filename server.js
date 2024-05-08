const express = require('express');
const hbs = require('hbs')
const path = require('path')
const app = express();

const viewpath = path.join(__dirname , "templates/views")
const partialpath = path.join(__dirname , "templates/partials")
console.log(viewpath)
console.log(partialpath)


app.use(express.static('public'));

app.set("view engine", "hbs")
app.set("views", viewpath);
hbs.registerPartials(partialpath);



app.use('/', require('./src/routes/index'));
// Add other route handlers here...


// Start the Express application
app.listen(4000, () => {
  console.log(`127.0.0.1:4000 listening on port 4000`);
});