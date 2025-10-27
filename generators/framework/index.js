const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class extends Generator {
    async prompting() {
        this.answers = await this.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Your project name',
                default: 'myframework',
            },
            {
                type: 'input',
                name: 'projectVersion',
                message: 'Your project version',
                default: '0.0.1',
            },
        ]);
    }

    writing() {
        const destRoot = this.destinationPath(this.answers.projectName);
        this.fs.copyTpl(
            [this.templatePath('**/*'), '!**/include/**', '!**/src/**'],
            destRoot,
            this.answers,
            {},
            { globOptions: { dot: true } },
        );

        // Copy and rename include/__projectName__ → include/<projectName>
        this.fs.copyTpl(
            this.templatePath('include/__projectName__/**/*'),
            path.join(destRoot, 'include', this.answers.projectName),
            this.answers,
        );

        // Copy and rename src/__projectName__ → src/<projectName>
        this.fs.copyTpl(
            this.templatePath('src/__projectName__/**/*'),
            path.join(destRoot, 'src', this.answers.projectName),
            this.answers,
        );

        this.fs.copyTpl(
            this.templatePath('myframeworkConfig.cmake'),
            this.destinationPath(
                `${this.answers.projectName}/${this.answers.projectName}Config.cmake`,
            ),
            this.answers,
        );
        this.fs.delete(
            this.destinationPath(
                `${this.answers.projectName}/myframeworkConfig.cmake`,
            ),
        );
    }
};
