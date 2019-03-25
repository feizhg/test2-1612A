var gulp = require('gulp');
var server = require('gulp-webserver');

gulp.task('server',function() {
	return gulp.src('src')
	.pipe(server({
		port :　8585,
		proxies : [
			{source : '/api/getProduct',target : 'http://localhost:3000/api/getProduct'},
			{source : '/api/getDetail',target : 'http://localhost:3000/api/getDetail'},
			{source : '/api/getComment',target : 'http://localhost:3000/api/getComment'},
			{source : '/api/addComment',target : 'http://localhost:3000/api/addComment'},
		]
	}))
})