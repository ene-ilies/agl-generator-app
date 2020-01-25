import fs from "fs-extra";
import Mustache from "mustache";
import { ReadTemplateError, WriteTemplateError } from "./errors";

export const createBaseDirStructure = (rootDir: string) => {
    fs.mkdirsSync(`${rootDir}/autobuild/agl`);
    fs.mkdirsSync(`${rootDir}/autobuild/linux`);
    fs.mkdirsSync(`${rootDir}/conf.d/cmake`);
    fs.mkdirsSync(`${rootDir}/conf.d/wgt`);
    fs.mkdirsSync(`${rootDir}/app`);
};

export const templateReadFillAndWrite = (templatePath: string, data: object, outputPath: string) => {
    let templateContent: string = "";
    try {
        templateContent = fs.readFileSync(templatePath, "utf-8");
    } catch (error) {
        throw new ReadTemplateError(error);
    }
    const processedTemplate: string = Mustache.render(templateContent, data);
    try {
        fs.writeFileSync(outputPath, processedTemplate);
    } catch (error) {
        throw new WriteTemplateError(error);
    }
};