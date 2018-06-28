const prompt = require('prompt');
const shell = require('shelljs');
const fs = require('fs');
const colors = require("colors/safe");
const path = require('path');
const copydir = require('copy-dir');


// Set prompt as green and use the "Replace" text
prompt.message = colors.green("Replace");

module.exports = (args, options, logger) => {
    const variant = options.variant || 'default';
    const templatePath = `${__dirname}/../Jinko/`;
    const localPath = process.cwd();


    if (fs.existsSync(templatePath)) {
        logger.info('Copying files…');

        copydir(`${templatePath}`, localPath, function (stat, filepath, filename) {
            if (filename === 'node_modules' || filename === ".idea") {
                return false;
            }
            else {
                return true;
            }
        }, function (err) {
            logger.info("Copying Done");
            const variables = require(`${templatePath}/_variables`);
            if (fs.existsSync(`${localPath}/_variables.js`)) {
                shell.rm(`${localPath}/_variables.js`);
            }

// Ask for variable values

        })
    } else {
        logger.error(`The requested template for ${args.template} wasn't found.`);
        process.exit(1);
    }


};