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

//Compile Foundation level files
gulp.task('foundation-sass', function () {
    return gulp.src(foundationPath)
        //.pipe(sass())
        .pipe(concat('foundation.css'))
        .pipe(header('/* FOUNDATION STYLING */'))
        .pipe(gulp.dest(styleRepo));
});

//Compile Feature level files
gulp.task('feature-sass', function () {
    return gulp.src(featurePath)
        //.pipe(sass())
        .pipe(concat('feature.css'))
        .pipe(header('/* FEATURE STYLING */'))
        .pipe(gulp.dest(styleRepo));
});

//Compile Project level files
gulp.task('project-sass', function () {
    return gulp.src(projectPath)
        //.pipe(sass())
        .pipe(concat('project.css'))
        .pipe(header('/* PROJECT STYLING */'))
        .pipe(gulp.dest(styleRepo));
});



// Combine all css files
var stagingStyles = [styleRepo + '/foundation.css', styleRepo + '/feature.css', styleRepo + '/project.css']; 
gulp.task('helix-sass', function () {
    return gulp.src(stagingStyles, { allowEmpty: true }) 
        .pipe(concat('helix-styling.css'))  
        .pipe(cleanCSS())                   
        .pipe(header('/* THIS IS A GENERATED FILE */'))
        .pipe(gulp.dest(styleRepo));        
});