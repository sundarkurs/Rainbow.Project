//Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var header = require('gulp-header');

//Config
var foundationPath = 'src/foundation/*/code/Assets/Styling/*.scss';
var featurePath = 'src/feature/*/code/Assets/Styling/*.scss';
var projectPath = 'src/project/*/code/Assets/Styling/*.scss';
var styleRepo = 'styleRepo';
var stagingStyles = [styleRepo + '/foundation.css', styleRepo + '/feature.css', styleRepo + '/project.css'] //Helix styling layers, in order
var prodOutput = 'src/Project/Website/code/Assets/Styling';
var stylingPath = 'src/+(Feature|Foundation|Project)/*/code/Assets/Styling/*.scss';

//Compile Foundation level files
gulp.task('foundation-sass', function () {
    return gulp.src(foundationPath)
        .pipe(sass({
            includePaths: ['src/foundation/SitecoreExtensions/code/Assets/Styling/']
        }))
        .pipe(concat('foundation.css'))
        .pipe(header('/* FOUNDATION STYLING */'))
        .pipe(gulp.dest(styleRepo))
});

//Compile Feature level files
gulp.task('feature-sass', function () {
    return gulp.src(featurePath)
        .pipe(sass({
            includePaths: ['src/foundation/SitecoreExtensions/code/Assets/Styling/']
        }))
        .pipe(concat('feature.css'))
        .pipe(header('/* FEATURE STYLING */'))
        .pipe(gulp.dest(styleRepo))
});

//Compile Project level files
gulp.task('project-sass', function () {
    return gulp.src(projectPath)
        .pipe(sass({
            includePaths: ['src/foundation/SitecoreExtensions/code/Assets/Styling/']
        }))
        .pipe(concat('project.css'))
        .pipe(header('/* PROJECT STYLING */'))
        .pipe(gulp.dest(styleRepo))
});

//Concatenate foundation, feature, and project layer, then minify
gulp.task('helix-sass', function () {
    return gulp.src(stagingStyles, { allowEmpty: true }) //use foundation, feature, project styling
        .pipe(concat('helix-styling.css'))  //concatenate all three styling files into one
        .pipe(cleanCSS())                   //minify
        .pipe(header('/* THIS IS A GENERATED FILE */'))
        .pipe(gulp.dest(prodOutput))        //output to folder
});

//Automate compilation of sass files
gulp.task('helix-watch', function () {
    gulp.watch(stylingPath, gulp.series('foundation-sass', 'feature-sass', 'project-sass', 'helix-sass'));
});