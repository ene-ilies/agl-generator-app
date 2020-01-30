import { run } from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import chai from 'chai';
import fs from 'fs';

describe('agl:web', () => {

    const project_related_answers = {
        "project.name": "agl-generator-web-example",
        "project.pretty_name": "AGL generator app example",
        "project.version": "1.0.0",
        "project.description": "This is an AGL example app generated using yeoman.",
        "project.url": "https://github.com/example/agl-example-app.git",
        "project.author": "Example User",
        "project.author_mail": "example.man@test.fake",
        "project.license": "LICENSE_EXAMPLE"
    };

    it('test that generator creates expected file tree structure', async () => {
        const result: string = await run(path.join(__dirname, '../../../src/web'))
            .withPrompts({
                "project.name": project_related_answers["project.name"]
            })
            .toPromise();
        const generatedProjectDir = path.join(result, project_related_answers["project.name"]);
        assert.file(`${generatedProjectDir}/autobuild/agl/autobuild`);
        assert.file(`${generatedProjectDir}/autobuild/linux/autobuild`);
        assert.file(`${generatedProjectDir}/conf.d/cmake/config.cmake`);
        assert.file(`${generatedProjectDir}/conf.d/wgt/config.xml.in`);
        assert.file(`${generatedProjectDir}/app/src/index.html`);
        assert.file(`${generatedProjectDir}/app/src/index.js`);
        assert.file(`${generatedProjectDir}/app/CMakeLists.txt`);
        assert.file(`${generatedProjectDir}/app/package.json`);
        assert.file(`${generatedProjectDir}/CMakeLists.txt`);
        assert.file(`${generatedProjectDir}/README.md`);
    });

    it('test that generator sets execution permissions to files that have to be executed', async () => {
        const result: string = await run(path.join(__dirname, '../../../src/web'))
            .withPrompts(project_related_answers)
            .toPromise();
        const generatedProjectDir = path.join(result, project_related_answers["project.name"]);
        chai.expect(() => fs.accessSync(`${generatedProjectDir}/autobuild/agl/autobuild`, fs.constants.X_OK)).not.to.throw();
        chai.expect(() => fs.accessSync(`${generatedProjectDir}/autobuild/linux/autobuild`, fs.constants.X_OK)).not.to.throw();
    });

    it('test that generator creates expected content for files in the tree structure', async () => {
        const result: string = await run(path.join(__dirname, '../../../src/web'))
            .withPrompts(project_related_answers)
            .toPromise();
        const generatedProjectDir = path.join(result, project_related_answers["project.name"]);
        assert.equalsFileContent(`${generatedProjectDir}/autobuild/agl/autobuild`, 
            fs.readFileSync(path.join(__dirname, '../../../src/web/templates/autobuild/agl/autobuild.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/autobuild/linux/autobuild`,
            fs.readFileSync(path.join(__dirname, '../../../src/web/templates/autobuild/linux/autobuild.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/conf.d/cmake/config.cmake`, 
            fs.readFileSync(path.join(__dirname, '../../expected/web/config.cmake.expect'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/conf.d/wgt/config.xml.in`, 
            fs.readFileSync(path.join(__dirname, '../../../src/web/templates/conf.d/wgt/config.xml.in'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/app/CMakeLists.txt`,
            fs.readFileSync(path.join(__dirname, '../../../src/web/templates/app/CMakeLists.txt.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/app/package.json`,
            fs.readFileSync(path.join(__dirname, '../../expected/web/package.json.expect'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/app/webpack.config.js`,
            fs.readFileSync(path.join(__dirname, '../../../src/web/templates/app/webpack.config.js.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/app/src/index.html`,
            fs.readFileSync(path.join(__dirname, '../../../src/web/templates/app/src/index.html.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/app/src/index.js`,
            fs.readFileSync(path.join(__dirname, '../../../src/web/templates/app/src/index.js.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/CMakeLists.txt`, 
            fs.readFileSync(path.join(__dirname, '../../../src/web/templates/CMakeLists.txt.sample'), 'utf-8'));
        assert.equalsFileContent(`${generatedProjectDir}/README.md`, 
            fs.readFileSync(path.join(__dirname, '../../expected/web/README.md.expect'), 'utf-8'));
    });
});