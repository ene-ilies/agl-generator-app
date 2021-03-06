import { run } from 'yeoman-test';
import assert from 'yeoman-assert';
import chai from 'chai';
import path from 'path';
import fs from 'fs';

describe('agl:native', () => {

    const project_related_answers = {
        "project.name": "agl-generator-app-example",
        "project.pretty_name": "AGL generator app example",
        "project.version": "1.0.0",
        "project.description": "This is an AGL example app generated using yeoman.",
        "project.url": "https://github.com/example/agl-example-app.git",
        "project.author": "Example User",
        "project.author_mail": "example.man@test.fake",
        "project.license": "LICENSE_EXAMPLE"
    };

    it('test that generator creates expected file tree structure', async () => {
        const result: string = await run(path.join(__dirname, '../../../src/native'))
            .withPrompts({
                "project.name": project_related_answers["project.name"]
            })
            .toPromise();
        const generatedProjectDir = path.join(result, project_related_answers["project.name"]);
        assert.file(`${generatedProjectDir}/autobuild/agl/autobuild`);
        assert.file(`${generatedProjectDir}/autobuild/linux/autobuild`);
        assert.file(`${generatedProjectDir}/conf.d/cmake/config.cmake`);
        assert.file(`${generatedProjectDir}/conf.d/wgt/config.xml.in`);
        assert.file(`${generatedProjectDir}/app/CMakeLists.txt`);
        assert.file(`${generatedProjectDir}/app/helloworld-native-application.c`);
        assert.file(`${generatedProjectDir}/CMakeLists.txt`);
        assert.file(`${generatedProjectDir}/README.md`);
    });

    it('test that generator sets execution permissions to files that have to be executed', async () => {
        const result: string = await run(path.join(__dirname, '../../../src/native'))
            .withPrompts(project_related_answers)
            .toPromise();
        const generatedProjectDir = path.join(result, project_related_answers["project.name"]);
        chai.expect(() => fs.accessSync(`${generatedProjectDir}/autobuild/agl/autobuild`, fs.constants.X_OK)).not.to.throw();
        chai.expect(() => fs.accessSync(`${generatedProjectDir}/autobuild/linux/autobuild`, fs.constants.X_OK)).not.to.throw();
    });

    it('test that generator creates expected content for files in the tree structure', async () => {
        const result: string = await run(path.join(__dirname, '../../../src/native'))
            .withPrompts(project_related_answers)
            .toPromise();
        const generatedProjectDir = path.join(result, project_related_answers["project.name"]);
        assert.equalsFileContent(`${generatedProjectDir}/autobuild/agl/autobuild`, 
            fs.readFileSync(path.join(__dirname, '../../../src/native/templates/autobuild/agl/autobuild.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/autobuild/linux/autobuild`,
            fs.readFileSync(path.join(__dirname, '../../../src/native/templates/autobuild/linux/autobuild.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/conf.d/cmake/config.cmake`, 
            fs.readFileSync(path.join(__dirname, '../../expected/native/config.cmake.expect'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/conf.d/wgt/config.xml.in`, 
            fs.readFileSync(path.join(__dirname, '../../../src/native/templates/conf.d/wgt/config.xml.in'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/app/CMakeLists.txt`,
            fs.readFileSync(path.join(__dirname, '../../../src/native/templates/app/CMakeLists.txt.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/app/helloworld-native-application.c`,
            fs.readFileSync(path.join(__dirname, '../../../src/native/templates/app/helloworld-native-application.c.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/CMakeLists.txt`, 
            fs.readFileSync(path.join(__dirname, '../../../src/native/templates/CMakeLists.txt.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/README.md`, 
            fs.readFileSync(path.join(__dirname, '../../expected/native/README.md.expect'), 'utf-8'));
    });
});