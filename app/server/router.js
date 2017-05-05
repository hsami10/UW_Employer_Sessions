const http = require('http');
const https = require('https');
const uwaterlooApi = require('uwaterloo-api');
const uwApi = require('./uw_api.json');

const home = (request, response) => {
    //Handle HTTP GET request to home page
    //if url == /
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        //show page title
        renderer.display("header", {}, response);

        //get JSON from uw api. Instantiate the client first
        const uwClient = new uwaterlooApi({
            API_KEY: uwApi.key
        });

        //make uw api call to resources/infosessions
        uwClient.get('/resources/infosessions', (err, res) => {
            console.log(res);
        });

        //on end, 
        //show all the cards containing employer info sessions
        //on error,
        //show error
    }

    response.end();
}

module.exports.home = home;
