let gulp = require('gulp')
let sass = require('gulp-sass')
let browserSync = require('browser-sync')
let uglify = require('gulp-uglify')
let concat = require('gulp-concat')
let rename = require('gulp-rename')

// таск для scss
gulp.task('scss', function () {
	return gulp
		.src('app/scss/**/*.scss') //ищет все файлы scss в заданной папке.
		.pipe(sass({ outputStyle: 'compressed' })) //применение задач, которые работают в этом плагине. Pipe- некая труба, куда помещаются файлы.
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('app/css')) //преобразованные файлы складируются в указанный файл. Gulp.dest- метод для конвертирования.
		.pipe(browserSync.reload({ stream: true })) //запускаем сервер
})

gulp.task('css', function () {
	return gulp
		.src([
			'node_modules/normalize.css/normalize.css',
			'node_modules/slick-carousel/slick/slick.css',
			'node_modules/magnific-popup/dist/magnific-popup.css',
		])

		.pipe(concat('_libs.scss'))
		.pipe(gulp.dest('app/scss'))
		.pipe(browserSync.reload({ stream: true }))
})

// таск для html
gulp.task('html', function () {
	return gulp.src('app/*.html').pipe(browserSync.reload({ stream: true }))
})

//таск для js
gulp.task('js', function () {
	return gulp
		.src(['node_modules/slick-carousel/slick/slick.js', 'node_modules/magnific-popup/dist/jquery.magnific-popup.js'])
		.pipe(concat('libs.min.js')) //конкатенация- объединение в один файл
		.pipe(uglify())
		.pipe(gulp.dest('app.js'))
		.pipe(browserSync.reload({ stream: true }))
})

//слежение за изменениями по указанному адресу
gulp.task('watch', function () {
	gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
	gulp.watch('app/*.html', gulp.parallel('html')) // если будут изменения по заданному пути, будет запущен gulp.parallel
	gulp.watch('app/js/*.js', gulp.parallel('js'))
})

//таск на автоматическое обновление хоста при сохранении
gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: 'app/',
		},
	})
})

gulp.task('default', gulp.parallel('css', 'scss', 'browser-sync', 'watch')) //запускает все процессы одновременно
