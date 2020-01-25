import Generator from "yeoman-generator";
import { createBaseDirStructure }  from "../../utils/generatorUtils"

export default class AGLNativeGenerator extends Generator {
    constructor(args: string|string[], options: {}) {
        super(args, options);
    }

    createFilesTree() {
        this.log('Creating files tree...');
        this.fs.copy(this.templatePath('autobuild/agl/autobuild.sample'), this.destinationPath('autobuild/agl/autobuild'));
        this.fs.copy(this.templatePath('autobuild/linux/autobuild.sample'), this.destinationPath('autobuild/linux/autobuild'));
        this.fs.copy(this.templatePath('conf.d/cmake/config.cmake.sample'), this.destinationPath('conf.d/cmake/config.cmake'));
        this.fs.copy(this.templatePath('conf.d/wgt/config.xml.in'), this.destinationPath('conf.d/wgt/config.xml'));
        this.fs.copy(this.templatePath('app/CMakeLists.txt.sample'), this.destinationPath('app/CMakeLists.txt'));
        this.fs.copy(this.templatePath('app/helloworld-native-application.c.sample'), this.destinationPath('app/helloworld-native-application.c'));
        this.fs.copy(this.templatePath('CMakeLists.txt.sample'), this.destinationPath('CMakeLists.txt'));
        this.fs.copy(this.templatePath('README.md.sample'), this.destinationPath('README.md'));
        this.log('Finished creating files tree...');
    }
}
