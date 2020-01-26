import fs from 'fs-extra';
import Mustache from 'mustache';
import { ReadTemplateError, WriteTemplateError } from './errors';
import Generator from 'yeoman-generator';

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

export const buildProjectRelatedQuestions: () => Array<Generator.Question> = () => ([
    {
        type: "input",
        name: "project.name",
        message: "Project name",
    },
    {
        type: "input",
        name: "project.pretty_name",
        message: "Project pretty name",
    },
    {
        type: "input",
        name: "project.version",
        message: "Project version",
    },
    {
        type: "input",
        name: "project.description",
        message: "Project description",
    },
    {
        type: "input",
        name: "project.url",
        message: "Project URL",
    },
    {
        type: "input",
        name: "project.author",
        message: "Author",
    },
    {
        type: "input",
        name: "project.author_mail",
        message: "Author mail",
    },
    {
        type: "input",
        name: "project.license",
        message: "License",
    }
]);