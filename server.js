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

// app.set("view engine", "hbs");
// app.set("views", viewPath);/admin/message
// hbs.registerPartials(partialPath);
// app.post('/register', (req, res) =>{
  

// })

app.use('/', require('./src/routes/index'));
// Add other route handlers here...

// app.get('/', (req, res)=>{
//     res.render("home");
// })

// app.get('/admin', (req, res)=>{
//     res.render("adminHome");
// })

// app.get('/admin/requests', (req, res)=>{
//   res.render("adminDataRequests");
// })

// app.get('/admin/upload', (req, res)=>{
//     res.render("adminUpload");
//   })
//   app.get('/admin/delete', (req, res)=>{
//     res.render("adminFileDelete");
//   })

//   app.get('/admin/queries', (req, res)=>{
//     res.render("adminQueries");
//   })

//   app.get('/admin/update', (req, res)=>{
//     res.render("adminUpdate");
//   })
//   app.get('/admin/catalog', (req, res)=>{
//     res.render("adminAddCatalog");
//   })

//   app.get('/logout', (req, res)=>{
//     res.send("logout");
//   })


// Start the Express application
app.listen(4000, () => {
  console.log(`127.0.0.1:4000 listening on port 4000`);
});