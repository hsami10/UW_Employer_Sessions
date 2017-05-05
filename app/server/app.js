//CREATE A WEBSITE DISPLAYING EMPLOYER INFO SESSIONS
//HAVE A CARD FOR EACH INFO SESSION
//APIs:
  //UWATERLOO API FOR THE INFO
  //GOOGLE MAPS API TO DISPLAY MAP
  //CLEARBIT LOGO API TO DISPLAY LOGOS FOR EACH COMPANY LISTED
//SHOW: EMPLOYER, DATE/DAY, START/END TIME, DESCRIPTION, LOCATION, AUDIENCE, CLICKING ON LOGO SHOULD TAKE THEM TO WEBSITE LISTED IF IT EXISTS
//PERFECTIONS: 
  //MAKE CARD BE A CERTAIN SIZE, AND WHEN CLICKED ON THE SEE MORE BUTTON, YOU BRING IT INTO FOCUS AND EXPAND TO SHOW MORE INFO.

const router = require('./router.js');
const renderer = require('./renderer.js');

const port = 8080;
const server = http.createServer( (request, response) => {
  router.home(request, response);
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port} ...`);
})
