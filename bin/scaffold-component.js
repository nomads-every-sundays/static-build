#!/usr/bin/env node

const { rootFolder } =  require('../system.js');
const { isNil, isUndefined, isEmpty } = require('lodash');
const { argv } = require('yargs');
const fs = require('fs');
const path = require('path');

/**
 * @author Keith Murphy | nomadmystics@gmail.com
 * @description Use the CLI to scaffold a component and its SCSS files
 * @class ScaffoldComponent
 */
class ScaffoldComponent {
    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description
     *
     * @return
     */
    constructor() {
        this.JSPath = path.resolve(rootFolder, 'src/js/components');
        this.SCSSPath = path.resolve(rootFolder, 'src/sass/components');
        this.binFolder = path.resolve(rootFolder, 'bin');

        // Sanity check
        if (!isNil(argv.name) && !isUndefined(argv.name)) {

            this.scaffold();

        } else {
            console.log('Please add --name to scaffold');
        }
    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description
     *
     * @return {boolean | void}
     */
    scaffold = () => {
        const name = argv.name;

        // Sanity check
        if (name === '') {
            console.log('Please add an value to the name');

            return false;
        }

        this.scaffoldJS(name);
        this.scaffoldSCSS(name);
    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description Read and write our new component
     *
     * @param {string} name
     * @return {boolean | void}
     */
    scaffoldJS = (name) => {
        const componentName = this.capitalizeFirstLetter(name);

        if (!fs.existsSync(`${this.JSPath}/${componentName}.vue`)) {

            // Read out template file
            fs.readFile(`${this.binFolder}/templates/Template.vue`, 'utf-8', (err, data) => {
                if (err) {
                    throw new err;
                }

                let updatedTemplate = data;

                // Update our template
                updatedTemplate = updatedTemplate.replace(/class="\$\{template-name\}/gim, `class="${componentName.toLowerCase()}`);
                updatedTemplate = updatedTemplate.replace(/\$\{template-name\}/gim, componentName);

                // Create our file
                fs.writeFile(`${this.JSPath}/${componentName}.vue`, updatedTemplate, (err) => {
                    if (err) {
                        throw new err;
                    }

                    this.addToMainJS();
                });
            });

        } else {
            console.log('Component already exist with that name');

            return false;
        }
    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description
     *
     * @param {string} name
     * @return
     */
    scaffoldSCSS = (name) => {
        // // console.log(rootFolder);
        // // console.log(argv);
        // console.log(this.SCSSPath);

        const componentName = name.toLowerCase();

        if (!fs.existsSync(`${this.SCSSPath}/${componentName}.scss`)) {

            // Read out template file
            fs.readFile(`${this.binFolder}/templates/_template.scss`, 'utf-8', (err, data) => {
                if (err) {
                    throw new err;
                }

                let updatedTemplate = data;

                // Update our template
                updatedTemplate = updatedTemplate.replace(/\$\{template-name\}/gim, componentName);

                // Create our file
                fs.writeFile(`${this.SCSSPath}/_${componentName}.scss`, updatedTemplate, (err) => {
                    if (err) {
                        throw new err;
                    }

                    this.addToMainScss();
                });
            });

        } else {
            console.log('Component already exist with that name');

            return false;
        }

    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description
     *
     * @return void
     */
    addToMainJS = () => {

    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description
     *
     * @return void
     */
    addToMainScss = () => {

    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description Capitalize the first letter in the component name
     *
     * @param string
     * @returns {string}
     */
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

new ScaffoldComponent();

// get component name
// Create JS file
// Create SCSS file
// Add to main.js

