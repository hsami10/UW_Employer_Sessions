const http = require('http');
const https = require('https');
const uwaterlooApi = require('uwaterloo-api');
const uwApi = require('./uw_api.json');
const renderer = require('./renderer.js');

const home = (request, response) => {
    //Handle HTTP GET request to home page
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
            if (res.meta.status === 200) {
                const data = res.data;
                data.forEach( (val, index) => {
                    const logoQuery = val.employer.replace(' ', '').toLowerCase();
                    const values = {
                        logoQuery: logoQuery,
                        googleLocation: "https://screenshots.en.sftcdn.net/en/scrn/97000/97769/google-maps-53-535x535.png"
                    };
                    renderer.display("info_session", values, response);
                });
            }
        });

        renderer.display("footer", {}, response);
        response.end();
        //on end, 
        //show all the cards containing employer info sessions
        //on error,
        //show error
    }
}

module.exports.home = home;
