//Program that handles the reading of files and merge in value
  //create html templates
  //use node file system module to read from those files and serve them.

const fs = require('fs');

//helper to insert proper values into template
const insertValues = (fileContents, values) => {
    //loop through values properties and populate fileContents with the values in it.
    for (const key in values) {
        fileContents = fileContents.replace(`{{${key}}}`, values[key]);
    }
    return fileContents;
};

//main function to read and serve files 
const display = (templateName, values, response) => {
    //read from the template file
    let fileContents = fs.readFileSync(`../html_templates/${templateName}.html`, {encoding: "utf8"});

    //if template is header, read contents from styles.css and pass the string as a 'values' prop too.
    if (templateName === 'header') {
        const cssStyling = fs.readFileSync('../css/styles.css', {encoding: 'utf8'});
        values.cssStyling = cssStyling;
    } 
    // else if (templateName === 'footer') { //if 'footer', read contents from maps.js to insert it into script tag
    //     const displayMap = fs.readFileSync('../client/maps.js', {encoding: 'utf8'});
    //     values.displayMap = displayMap;
    // }
    
    //Replace tagged values (with {{}}) with 'values'
    fileContents = insertValues(fileContents, values);
    //Write new html contents to response
    response.write(fileContents);
};

module.exports.display = display;
