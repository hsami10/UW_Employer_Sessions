//CREATE A WEBSITE DISPLAYING EMPLOYER INFO SESSIONS
//HAVE A CARD FOR EACH INFO SESSION
//APIs:
  //UWATERLOO API FOR THE INFO
  //GOOGLE MAPS API TO DISPLAY MAP
  //CLEARBIT LOGO API TO DISPLAY LOGOS FOR EACH COMPANY LISTED
//SHOW: EMPLOYER, DATE/DAY, START/END TIME, DESCRIPTION, LOCATION, AUDIENCE, CLICKING ON LOGO SHOULD TAKE THEM TO WEBSITE LISTED IF IT EXISTS
//PERFECTIONS: 
  //MAKE CARD BE A CERTAIN SIZE, AND WHEN CLICKED ON THE SEE MORE BUTTON, YOU BRING IT INTO FOCUS AND EXPAND TO SHOW MORE INFO.


//PLAN:
//1. Create a web server

//2. Handle HTTP GET request to home page
  //if url == / and GET
    //show page title
    //get JSON from uw api
      //on end, 
        //show all the cards containing employer info sessions
      //on error,
        //show error

//3. Function that handles the reading of files and merge in value
  //create html templates
  //use node fs to read from those files and serve them.







//Require the module 
// const uwaterlooApi = require('uwaterloo-api'); 

//Instantiate the client 
// const uwClient = new uwaterlooApi({
//   API_KEY : '9b4c11e14e0cc5448d4a502130e365d6'
// });

//Use the API 
// uwClient.get('/feds/events', function(err, res) {
//   console.log(typeof res); 
// }); 

// uwClient.get('/events/holidays', function(err, res) {
//   console.log(res); 
// });