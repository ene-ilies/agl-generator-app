import Generator from 'yeoman-generator';

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