const fs = require('fs');

const insertValues = () => {

};

const display = (templateName, values, response) => {
    //read from the template file
    let fileContents = fs.readFileSync(`../html_templates/${templateName}.html`, {encoding: "utf8"});
    //Replace tagged values (with {{}}) with 'values'
    fileContents = insertValues();
    //Write new html contents to response
};