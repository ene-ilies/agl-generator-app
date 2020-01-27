const { src, dest } = require('gulp');

function package() {
    return src('src/**/templates/**/*')
        .pipe(dest('generators'));    
}

exports.default = package;