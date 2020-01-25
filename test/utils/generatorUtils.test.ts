import fs from "fs-extra";
import { createBaseDirStructure, templateReadFillAndWrite } from "../../utils/generatorUtils";
import { ReadTemplateError, WriteTemplateError } from "../../utils/errors";
import { expect } from "chai";
import sinon from "sinon";

const mkdirsSyncStub = sinon.stub(fs, 'mkdirsSync');
const readFileSyncStub = sinon.stub(fs, 'readFileSync');
readFileSyncStub.withArgs(`tmp/template.in`, 'utf-8').returns('title={{title}},\ndescription={{description}}');
readFileSyncStub.withArgs('throw.in', 'utf-8').throws(Error('permissions denied'));
const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');
writeFileSyncStub.withArgs('throw.out', sinon.match.string).throws(Error('permissions denied'));

describe('generatorUtils', () => {

    const rootDir = 'tmp';

    it('test that createBaseDirStructure creates the expected dir structure under given dir', () => {
        createBaseDirStructure(rootDir);
        mkdirsSyncStub.calledWith(`${rootDir}/autobuild/agl`);
        mkdirsSyncStub.calledWith(`${rootDir}/autobuild/linux`);
        mkdirsSyncStub.calledWith(`${rootDir}/conf.d/cmake`);
        mkdirsSyncStub.calledWith(`${rootDir}/conf.d/wgt`);
        mkdirsSyncStub.calledWith(`${rootDir}/app`);
    });

    it('test that templateReadFillAndWrite reads the template and writes the file with placeholders replaced', () => {
        const data: any = {
            title: "this is a title",
            description: "test description"
        };
        templateReadFillAndWrite(`${rootDir}/template.in`, data, `${rootDir}/template.out`);
        readFileSyncStub.calledWith(`${rootDir}/template.in`, "utf-8");
        writeFileSyncStub.calledWith(`${rootDir}/template.out`, `title=${data.title},\ndescription=${data.description}`);
    });

    it('test that templateReadFillAndWrite throws error when unable to read template', () => {
        expect(() => templateReadFillAndWrite(`throw.in`, {}, `${rootDir}/template.out`)).to.throw(ReadTemplateError);
    });

    it('test that templateReadFillAndWrite throws error when unable to write processed template', () => {
        const data: any = {
            title: "this is a title",
            description: "test description"
        };
        expect(() => templateReadFillAndWrite(`${rootDir}/template.in`, data, 'throw.out')).to.throw(WriteTemplateError);
    });
});