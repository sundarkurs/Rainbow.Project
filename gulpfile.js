//Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var header = require('gulp-header');
var foreach = require("gulp-foreach");

//Config
var scssConfig = {
    foundationPath: 'src/foundation/*/code/Assets/Styling/*.scss',
    featurePath: 'src/feature/*/code/Assets/Styling/*.scss',
    projectPath: 'src/project/*/code/Assets/Styling/*.scss',
    stylesStagingFolder: 'stylesStagingFolder',
    minOutput: 'stylesStagingFolder',
    stylingPath: 'src/+(Feature|Foundation|Project)/*/code/Assets/Styling/*.scss'

};

//Compile Foundation layer files
gulp.task('Compile-Foundation-Styles', function () {
    return gulp.src(scssConfig.foundationPath)
        .pipe(sass({
            includePaths: ['src/foundation/SitecoreExtensions/code/Assets/Styling/']
        }))
        .pipe(concat('foundation.css'))
        .pipe(header('/* FOUNDATION STYLING */'))
        .pipe(gulp.dest(scssConfig.stylesStagingFolder));
});

//Compile Feature layer files
gulp.task('Compile-Feature-Styles', function () {
    return gulp.src(scssConfig.featurePath)
        .pipe(sass({
            includePaths: ['src/foundation/SitecoreExtensions/code/Assets/Styling/']
        }))
        .pipe(concat('feature.css'))
        .pipe(header('/* FEATURE STYLING */'))
        .pipe(gulp.dest(scssConfig.stylesStagingFolder));
});

//Compile Project layer files
gulp.task('Compile-Project-Styles', function () {
    return gulp.src(scssConfig.projectPath)
        .pipe(sass({
            includePaths: ['src/foundation/SitecoreExtensions/code/Assets/Styling/']
        }))
        .pipe(concat('project.css'))
        .pipe(header('/* PROJECT STYLING */'))
        .pipe(gulp.dest(scssConfig.stylesStagingFolder));
});

// Concatenate foundation, feature, and project layer, then minify
gulp.task('Compile-All-Styles', function () {

    var stagingStyles = [scssConfig.stylesStagingFolder + '/foundation.css', scssConfig.stylesStagingFolder + '/feature.css', scssConfig.stylesStagingFolder + '/project.css'];

    return gulp.src(stagingStyles, { allowEmpty: true }) //use foundation, feature, project styling
        .pipe(concat('helix-styling.css'))  //concatenate all three styling files into one
        .pipe(cleanCSS())                   //minify
        .pipe(header('/* THIS IS A GENERATED FILE */'))
        .pipe(gulp.dest(scssConfig.minOutput));        //output to folder
});

//Automate compilation of sass files
gulp.task('Compile-Styles-Auto', function () {
    gulp.watch(scssConfig.stylingPath, gulp.series('Compile-Foundation-Styles', 'Compile-Feature-Styles', 'Compile-Project-Styles', 'Compile-All-Styles'));
});



// Binaries Related
var config = require("./gulp-config.js")();

gulp.task('Publish-Assemblies', function () {

    var root = "./src";
    var roots = [root + "/**/code/bin"];
    var files = "/**/Rain.{Feature,Foundation,Project}.*.{dll,pdb}";
    var destination = config.websiteRoot + "/bin/";

    return gulp.src(roots, { base: root }).pipe(
        foreach(function (stream, rootFolder) {
            console.log(rootFolder);

            gulp.src(rootFolder.path + files)
                .pipe(gulp.dest(destination));

            return stream;
        })
    );

});

gulp.task("Publish-Assemblies-Auto",
    function () {
        var root = "./src";
        var roots = [root + "/**/code/bin"];
        var files = "/**/Rain.{Feature,Foundation,Project}.*.{dll,pdb}";
        var destination = config.websiteRoot + "/bin/";

        return gulp.src(roots, { base: root }).pipe(
            foreach(function (stream, rootFolder) {
                console.log(rootFolder);
                gulp.watch(rootFolder.path + files,
                    function (event) {
                        console.log('something changed');
                        if (event.type === "changed") {
                            console.log("publish this file " + event.path);
                            gulp.src(event.path, { base: rootFolder.path }).pipe(gulp.dest(destination));
                        }
                        console.log("published " + event.path);
                    });
                return stream;
            })
        );
    });

