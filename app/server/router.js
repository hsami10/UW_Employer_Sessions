const http = require('http');
const https = require('https');
const uwaterlooApi = require('uwaterloo-api');
const uwApi = require('./uw_api.json');
const renderer = require('./renderer.js');

//array to hold query strings for common company's, in order to properly get the logo using Clearbit
const companies = ['digiflare', 'adroll', 'cibc', 'loblaw', 'groupbyinc', 'bloomberg', 'td', 'rbc', 'waveaccounting'];

//helper function to extract data from json and embed them into an object, then render them with renderer
const extractData = (session, response) => {
    //construct the query string for the clearbit search for company logo
    let logoQuery = session.employer.replace(' ', '').toLowerCase();

    //go through 'companies' and check if logoQuery actually refers to one of them. Then adjust logoquery.
    companies.forEach((company) => {
        if (logoQuery.includes(company))
            logoQuery = company;
    });
    //individual EA (Electronic Arts) case
    if (logoQuery.includes('electronicarts'))
        logoQuery = 'ea';
    //construct url to call for company logo
    logoQuery = `http://logo.clearbit.com/${logoQuery}.com?size=400`

    //construct a string with <li> tags, each for a target audience
    let audience = ``;
    session.audience.forEach((val) => {
        audience += `<li>${val}</li>`;
    });
    //assemble all the values that need to be injected into the html templates in a values object.
    const values = {
        logoQuery: logoQuery,
        googleLocation: "https://screenshots.en.sftcdn.net/en/scrn/97000/97769/google-maps-53-535x535.png",
        employerName: session.employer,
        day: session.day,
        date: session.date,
        startTime: session.start_time,
        endTime: session.end_time,
        buildingUrl: session.building.map_url,
        buildingNRoom: `${session.building.code} ${session.building.room}`,
        audienceList: audience,
        description: session.description
    };
    renderer.display("info_session", values, response);
}

//function to connect with uw api and retrieve data regarding info sessions
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
                //console.log(data.length);
                data.forEach((session, index) => {
                    //if its a closed information session, skip over this one
                    const checkClosed = session.employer.toLowerCase();
                    if (checkClosed.includes("closed info session") || checkClosed.includes("closed information session")) {
                        return;
                    }
                    //call extractData session to get relevent data from json and call renderer on it.
                    extractData(session, response);
                });

                renderer.display("footer", {}, response);
                response.end();
            }

        });

        //on end, 
        //show all the cards containing employer info sessions
        //on error,
        //show error
    }
}

module.exports.home = home;
