const fs = require('fs');

const insertValues = (fileContents, values) => {
    //loop through values properties and populate fileContents with the values in it.
    for (const key in values) {
        fileContents = fileContents.replace(`{{${key}}}`, values[key]);
    }
    return fileContents;
};

const display = (templateName, values, response) => {
    //read from the template file
    let fileContents = fs.readFileSync(`../html_templates/${templateName}.html`, {encoding: "utf8"});
    //Replace tagged values (with {{}}) with 'values'
    fileContents = insertValues(fileContents, values);
    //Write new html contents to response
    response.write(fileContents);
};

module.exports.display = display;
