//CREATE A WEBSITE DISPLAYING EMPLOYER INFO SESSIONS
//HAVE A CARD FOR EACH INFO SESSION
//APIs:
  //UWATERLOO API FOR THE INFO
  //GOOGLE MAPS API TO DISPLAY MAP
  //CLEARBIT LOGO API TO DISPLAY LOGOS FOR EACH COMPANY LISTED
//SHOW: EMPLOYER, DATE/DAY, START/END TIME, DESCRIPTION, LOCATION, AUDIENCE, CLICKING ON LOGO SHOULD TAKE THEM TO WEBSITE LISTED IF IT EXISTS
//PERFECTIONS: 
  //MAKE CARD BE A CERTAIN SIZE, AND WHEN CLICKED ON THE SEE MORE BUTTON, YOU BRING IT INTO FOCUS AND EXPAND TO SHOW MORE INFO.


const http = require('http');
const uwaterlooApi = require('uwaterloo-api'); 
const uwApi = require('./uw_api.json');
const renderer = require('./renderer.js');

const port = 8080;
const server = http.createServer( (request, response) => {
  //2. Handle HTTP GET request to home page
  //if url == / and GET
  if (request.url === '/') {
    response.writeHead(200, {'Content-Type': 'text/html'});
    //show page title
    renderer.display("header", {}, response); 
    //get JSON from uw api
      //on end, 
        //show all the cards containing employer info sessions
      //on error,
        //show error
  } 

  response.end();
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port} ...`);
})
//1. Create a web server


//3. Function that handles the reading of files and merge in value
  //create html templates
  //use node fs to read from those files and serve them.




//Require the module 


//Instantiate the client 
// const uwClient = new uwaterlooApi({
//   API_KEY : uwApi.key
// });

//Use the API 
// uwClient.get('/feds/events', function(err, res) {
//   console.log(typeof res); 
// }); 

// uwClient.get('/events/holidays', function(err, res) {
//   console.log(res); 
// });