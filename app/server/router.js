const http = require('http');
const https = require('https');
const uwaterlooApi = require('uwaterloo-api');
const apis = require('./apis.json');
const renderer = require('./renderer.js');

//array to hold query strings for common company's, in order to properly get the logo using Clearbit
const companies = ['digiflare', 'adroll', 'cibc', 'loblaw', 'groupbyinc', 'bloomberg', 'td', 'rbc', 'waveaccounting'];
let sessionLocations = []; //2D array to store latitude and longitude of each session location. Passed to footer rendering.

/**-------------------------------------------------------------------------------------------------------- */

//helper function to extract data from json and embed them into an object, then render them with renderer
const extractData = (session, response, index) => {
    //construct the query string for the clearbit search for company logo
    let logoQuery = session.employer.replace(' ', '').toLowerCase();

    //go through 'companies' and check if logoQuery actually refers to one of them. Then adjust logoquery.
    companies.forEach((company) => {
        if (logoQuery.includes(company))
            logoQuery = company;
    });

    if (logoQuery.includes('electronicarts')) //individual EA (Electronic Arts) case
        logoQuery = 'ea';
    logoQuery = `http://logo.clearbit.com/${logoQuery}.com?size=400`; //construct url to call for company logo

    //construct a string with <li> tags, each for a target audience
    let audience = ``;
    session.audience.forEach((val) => {
        audience += `<li>${val}</li>`;
    });

    //add http:// to start of website if it doesn't exist already (without it, it appends to localhost)
    let companyLogoPage = session.website;
    if (companyLogoPage !== '' && !companyLogoPage.startsWith('http'))
        companyLogoPage = `href="http://${companyLogoPage}"`;
    else if (companyLogoPage.startsWith('http'))
        companyLogoPage = `href="${companyLogoPage}"`;

    //assemble all the values that need to be injected into the html templates in a values object.
    const values = {
        logoQuery: logoQuery,
        companyLogoPage: companyLogoPage,
        googleLocation: `https://screenshots.en.sftcdn.net/en/scrn/97000/97769/google-maps-53-535x535.png`,
        employerName: session.employer,
        day: session.day,
        date: session.date,
        startTime: session.start_time,
        endTime: session.end_time,
        buildingUrl: session.building.map_url,
        buildingNRoom: `${session.building.code} ${session.building.room}`,
        audienceList: audience,
        description: session.description,
        mapDivId: index
    };
    renderer.display("info_session", values, response);

    //add to global array sessionLocations to be used in the footer later
    sessionLocations.push([session.building.latitude, session.building.longitude]);
}

/**----------------------------------------------------------------------------------------------------------- */

//function to connect with uw api and retrieve data regarding info sessions
const home = (request, response) => {
    //Handle HTTP GET request to home page
    if (request.url === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        //show page title
        renderer.display("header", {}, response);
        response.write('<div class="row">');

        //get JSON from uw api. Instantiate the client first
        const uwClient = new uwaterlooApi({
            API_KEY: apis.uwKey
        });

        //make uw api call to resources/infosessions
        uwClient.get('/resources/infosessions', (err, res) => {
            if (res.meta.status === 200) {
                const data = res.data;

                let rowCounter = 1;

                setTimeout(() => {
                    data.forEach((session, index) => {
                        //if its a closed information session, skip over this one
                        const checkClosed = session.employer.toLowerCase();
                        if (checkClosed.includes("closed info session") || checkClosed.includes("closed information session")) {
                            return;
                        }

                        //call extractData session to get relevent data from json and call renderer on it.
                        extractData(session, response, index);

                        //if three info sessions (each col-sm-4) have been displayed, close preceding row div and add a new row div
                        if (rowCounter % 3 === 0) {
                            response.write('</div><div class="row">');
                        }
                        ++rowCounter; //use rowCounter to keep track of how many info sessions have been displayed.
                    });
                    response.write('</div>');

                    const footerValues = {
                        googleMapsKey: apis.googleMapsKey,
                        sessionLocArr: sessionLocations,
                        dataArrLength: data.length
                    };
                    renderer.display("footer", footerValues, response);

                    response.end();
                }, 3500);
            }
        });
    }
}

module.exports.home = home;
