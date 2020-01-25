import { run } from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import fs from 'fs';

describe('agl:native', () => {

    it('test that generator creates expected file tree structure', async () => {
        const result: string = await run(path.join(__dirname, '../../../generators/native'))
            .toPromise();
        assert.file(`${result}/autobuild/agl/autobuild`);
        assert.file(`${result}/autobuild/linux/autobuild`);
        assert.file(`${result}/conf.d/cmake/config.cmake`);
        assert.file(`${result}/conf.d/wgt/config.xml`);
        assert.file(`${result}/app/CMakeLists.txt`);
        assert.file(`${result}/app/helloworld-native-application.c`);
        assert.file(`${result}/CMakeLists.txt`);
        assert.file(`${result}/README.md`);
    });

    it('test that generator creates expected content for files in the tree structure', async () => {
        const result: string = await run(path.join(__dirname, '../../../generators/native'))
            .toPromise();
        assert.equalsFileContent(`${result}/autobuild/agl/autobuild`, 
            fs.readFileSync(path.join(__dirname, '../../../generators/native/templates/autobuild/agl/autobuild.sample'), 'utf-8'));
        assert.equalsFileContent(`${result}/autobuild/linux/autobuild`,
            fs.readFileSync(path.join(__dirname, '../../../generators/native/templates/autobuild/linux/autobuild.sample'), 'utf-8'));
        assert.equalsFileContent(`${result}/conf.d/cmake/config.cmake`, 
            fs.readFileSync(path.join(__dirname, '../../../generators/native/templates/conf.d/cmake/config.cmake.sample'), 'utf-8'));
        assert.equalsFileContent(`${result}/conf.d/wgt/config.xml`, 
            fs.readFileSync(path.join(__dirname, '../../../generators/native/templates/conf.d/wgt/config.xml.in'), 'utf-8'));
        assert.equalsFileContent(`${result}/app/CMakeLists.txt`,
            fs.readFileSync(path.join(__dirname, '../../../generators/native/templates/app/CMakeLists.txt.sample'), 'utf-8'));
        assert.equalsFileContent(`${result}/app/helloworld-native-application.c`,
            fs.readFileSync(path.join(__dirname, '../../../generators/native/templates/app/helloworld-native-application.c.sample'), 'utf-8'));
        assert.equalsFileContent(`${result}/CMakeLists.txt`, 
            fs.readFileSync(path.join(__dirname, '../../../generators/native/templates/CMakeLists.txt.sample'), 'utf-8'));
        assert.equalsFileContent(`${result}/README.md`, 
            fs.readFileSync(path.join(__dirname, '../../../generators/native/templates/README.md.sample'), 'utf-8'));
    });
});