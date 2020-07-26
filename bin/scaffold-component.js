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
     * @description Setup the scaffolding functionality
     *
     * @return void
     */
    constructor() {
        this.JSPath = path.resolve(rootFolder, 'src/js');
        this.SCSSPath = path.resolve(rootFolder, 'src/sass');
        this.binFolder = path.resolve(rootFolder, 'bin');

        console.log(argv);
        // Sanity check
        if (!isNil(argv.name) && !isUndefined(argv.name)) {

            this.scaffold();

        } else {
            console.log('Please add --name to scaffold');
        }
    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description Start the scaffolding process here
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
     * @description Create our new component
     *
     * @param {string} name
     * @return {boolean | void}
     */
    scaffoldJS = (name) => {
        const componentName = this.capitalizeFirstLetter(name);

        if (!fs.existsSync(`${this.JSPath}/components/${componentName}.vue`)) {

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
                fs.writeFile(`${this.JSPath}/components/${componentName}.vue`, updatedTemplate, (err) => {
                    if (err) {
                        throw new err;
                    }

                    this.addToMainJS(componentName);
                });
            });

        } else {
            console.log('Component already exist with that name');

            return false;
        }
    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description Create our new SCSS file
     *
     * @param {string} name
     * @return {boolean | void}
     */
    scaffoldSCSS = (name) => {
        const componentName = name.toLowerCase();

        if (!fs.existsSync(`${this.SCSSPath}/components/_${componentName}.scss`)) {

            // Read out template file
            fs.readFile(`${this.binFolder}/templates/_template.scss`, 'utf-8', (err, data) => {
                if (err) {
                    throw new err;
                }

                let updatedTemplate = data;

                // Update our template
                updatedTemplate = updatedTemplate.replace(/\$\{template-name\}/gim, componentName);

                // Create our file
                fs.writeFile(`${this.SCSSPath}/components/_${componentName}.scss`, updatedTemplate, (err) => {
                    if (err) {
                        throw new err;
                    }

                    this.addToMainScss(componentName);
                });
            });

        } else {
            console.log('Component already exist with that name');

            return false;
        }

    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description Update the main.js file with our new component and import statement
     *
     * @return void
     */
    addToMainJS = (componentName) => {
        // Read our main.js file
        fs.readFile(`${this.JSPath}/main.js`, 'utf-8', (err, data) => {
            if (err) {
                throw new err;
            }

            // Be immutable
            let mainJS = data;

            // Get the last instances of our component and imports
            let importMatches = mainJS.match(/import ([a-z]*) from '\.\/components\/([a-z]*)\.vue';/gmi);
            let lastImportMatch = importMatches[importMatches.length - 1];

            let componentMatches = mainJS.match(/Vue\.component\(([a-z]*)\.name, ([a-z]*)\);/gmi);
            let lastComponentMatch = componentMatches[componentMatches.length - 1];

            // Make our main.js file an array to append lines of content
            let splitMainJS = mainJS.toString().split('\n');

            // Find the index of the last component and the last import statement
            let indexOfLastImportMatch = splitMainJS.indexOf(lastImportMatch);
            let indexOfLastComponentMatch = splitMainJS.indexOf(lastComponentMatch);

            // Our new content
            const newComponent = `Vue.component(${componentName}.name, ${componentName});`;
            const newImport = `import ${componentName} from './components/${componentName};'`;

            // Add our new content at their index's
            splitMainJS.splice(indexOfLastImportMatch + 1, 0, `${newImport}`);
            splitMainJS.splice(indexOfLastComponentMatch + 2, 0, `${newComponent}`);

            // Turn it back into a string for writing
            let finalMainJS = splitMainJS.join('\n');

            // Update main.js file
            fs.writeFile(`${this.JSPath}/main.js`, finalMainJS, (err) => {
                if (err) {
                    throw new err;
                }
            });
        });
    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description Add our new SCSS file to the main.scss
     *
     * @param {string} componentName
     * @return void
     */
    addToMainScss = (componentName) => {

        fs.appendFileSync(`${this.SCSSPath}/main.scss`, `\n@use './components/${componentName}';`);

    }

    /**
     * @author Keith Murphy | nomadmystics@gmail.com
     * @description Capitalize the first letter in the component name
     *
     * @param {string} string
     * @returns {string}
     */
    capitalizeFirstLetter = (string= '') => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

new ScaffoldComponent();
