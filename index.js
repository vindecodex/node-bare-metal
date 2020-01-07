const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');

// TEMPLATE
const main = fs.readFileSync('./templates/main.html', 'utf-8');
const fourofour = fs.readFileSync('./templates/404.html', 'utf-8');
const personCards = fs.readFileSync('./templates/person-cards.html', 'utf-8');


// DATA
const data = fs.readFileSync('./data/data.json', 'utf-8');
const dataObj = JSON.parse(data);


// SERVER
const server = http.createServer(function(req,res){
  // we use url module to separate query params and pathname
  // try to console.log url.parse(req.url, true); to see what is contains
  const {pathname, query} = url.parse(req.url, true);
  if (pathname === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html'
    })
    // looping through data to create cards of datas
    const setCards = dataObj.map(dataElem => replaceTemplate(personCards,dataElem)).join('');
    // replacing {%PERSONCARDS%} with setCards value
    let mainHTML = main.replace(/{%PERSONCARDS%}/g,setCards);
    // rendering our html file
    res.end(mainHTML);
  } else {
    res.writeHead(404);
    // rendering our html file
    res.end(fourofour);
  }
})

server.listen(9000,()=> {console.log("Listening to port 9000")});
