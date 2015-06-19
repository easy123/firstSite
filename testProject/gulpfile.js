/**
 * Created by easys on 2015/6/18.
 */
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var imagemin=require('gulp-imagemin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var zip=require('gulp-zip');
var del = require('del');

var paths = {
    scripts: ['./public/javascripts/orderTest.js', './public/javascripts/queryOrder.js'],
    styles: ['./public/css/*.css'],
    images: ['./public/images/*'],
    zip: ['**/*', '!./.idea', '!./.idea/**/*', '!./node_modules', '!./node_modules/**/*']
};

gulp.task('clean', function(c) {
    del(['./public/build'], c);
});
gulp.task('clean pack', function(c) {
    del(['./pack'], c);
});

gulp.task('minifycss',["clean"],function(){
    return  gulp.src(paths.styles).pipe(minifycss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./build/css')).pipe(concat('all.min.css')).pipe(gulp.dest('./build/css'));
});
gulp.task('imagemin',["clean"],function(){
    return  gulp.src(paths.images).pipe(imagemin()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./build/images'));
});
gulp.task('uglify',["clean"],function(){
    return  gulp.src(paths.scripts).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./build/js')).pipe(concat('all.min.js')).pipe(gulp.dest('./build/js'));
});
gulp.task('zip',["clean pack"],function(){
    return  gulp.src(paths.zip).pipe(zip('zip.zip')).pipe(gulp.dest('./pack'));
});

gulp.task('default', ['minifycss','imagemin','uglify'], function() {
    gulp.start('zip');
});

