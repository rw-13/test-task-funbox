'use strict'

var gulp 			= require('gulp'),
	pug				= require('gulp-pug'),
	stylus			= require('gulp-stylus'),
	browserSync		= require('browser-sync'),
	autoprefixer 	= require('gulp-autoprefixer'),
	concat			= require('gulp-concat'),
	del				= require('del'),
	fs 				= require('fs');

// подключаем pug-файлы 
let config = require('./projectConfig.json');
let pugMixins = '';
for (let block in config.blocks) {
	if (fs.existsSync('./src/blocks/'+block+'/'+block+'.pug')) {
		pugMixins += 'include ../blocks/'+block+'/'+block+'.pug'+'\n';
	}
}
fs.writeFileSync('./src/pug/mixins.pug', pugMixins);

// компиляция разметки блоков
gulp.task('pugBlocks', function() {
	return gulp.src('src/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('build'));
});

// компиляция разметки страниц
gulp.task('pug', function() {
	return gulp.src('src/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('build'))
	.pipe(browserSync.reload({stream: true}));
});

// Мержим стили в один файл 
gulp.task('styl', function() {
	return gulp.src(config.styles, {base: 'src/'})
	.pipe(stylus())
	.pipe(autoprefixer(['last 2 versions'], { cascade: true }))
	.pipe(concat('style.css'))
	.pipe(gulp.dest('build/css'))
	.pipe(browserSync.reload({stream: true}));
});

// мержим скрипты в один файл
gulp.task('scripts', function() {
	return gulp.src(config.scripts, {base:'src/'})
	.pipe(concat('main.js'))
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function() {
	return gulp.src('src/img/*.{png,jpeg,jpg,svg}')
	.pipe(gulp.dest('build/images'));
});

// копирование шрифтов
gulp.task('fonts', function() {
	return gulp.src('src/fonts/*.{ttf,woff,woff2,eot,svg}')
	.pipe(gulp.dest('build/fonts'));
});


gulp.task('build', ['clean', 'styl', 'scripts', 'fonts', 'pugBlocks', 'pug', 'images'], function() {});

// очистка файлов проекта
gulp.task('clean', function() {
	console.log('--------Очистка папки сборки')
	return del(['./build/**/*'])
});

// Запуск сервера
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build'
		},
		notify: false
	});
});

// 
gulp.task('watch', ['build', 'browser-sync'] ,function() {
	gulp.watch(config.styles, ['styl']);
	gulp.watch('src/blocks/**/*.pug', ['pugBlocks', 'pug']);
	gulp.watch('src/*.pug', ['pug']);
	gulp.watch(config.scripts, ['scripts']);
	gulp.watch('src/img/*.{png,jpeg,svg}', ['images']);
})