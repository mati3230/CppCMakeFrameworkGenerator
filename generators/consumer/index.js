const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Your project name',
                default: 'myframeworktest',
            },
            {
                type: 'input',
                name: 'projectVersion',
                message: 'Your project version',
                default: '0.0.1',
            },
            {
                type: 'input',
                name: 'frameworkName',
                message: 'Your framework project name',
                default: 'myframework',
            },
        ]);
    }

    writing() {
        const destRoot = this.destinationPath(this.answers.projectName);
        this.fs.copyTpl(
            [this.templatePath('**/*')],
            destRoot,
            this.answers,
            {},
            { globOptions: { dot: true } },
        );
    }
};
