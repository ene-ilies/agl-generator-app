import Generator from "yeoman-generator";
import { buildProjectRelatedQuestions }  from "../../utils/generatorUtils"

export default class AGLWebGenerator extends Generator {
    private answers: Generator.Answers = [];

    constructor(args: string|string[], options: {}) {
        super(args, options);
        
    }

    async prompting() {
        this.log('Collecting project data from user...');
        this.answers = await this.prompt(buildProjectRelatedQuestions());
        this.log('Finished collecting project data from user...');
    }

    createFilesTree() {
        this.log('Creating files tree...');
        this.fs.copy(this.templatePath('autobuild/agl/autobuild.sample'), this.destinationPath('autobuild/agl/autobuild'));
        this.fs.copy(this.templatePath('autobuild/linux/autobuild.sample'), this.destinationPath('autobuild/linux/autobuild'));
        this.fs.copyTpl(this.templatePath('conf.d/cmake/config.cmake.in'), this.destinationPath('conf.d/cmake/config.cmake'), this.answers);
        this.fs.copy(this.templatePath('conf.d/wgt/config.xml.in'), this.destinationPath('conf.d/wgt/config.xml'));
        this.fs.copy(this.templatePath('app/CMakeLists.txt.sample'), this.destinationPath('app/CMakeLists.txt'));
        this.fs.copyTpl(this.templatePath('app/package.json.in'), this.destinationPath('app/package.json'), this.answers);
        this.fs.copy(this.templatePath('CMakeLists.txt.sample'), this.destinationPath('CMakeLists.txt'));
        this.fs.copyTpl(this.templatePath('README.md.in'), this.destinationPath('README.md'), this.answers);
        this.log('Finished creating files tree...');
    }
}
