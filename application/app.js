
var app = angular.module('hiitreviewApp', ['onsen']);
app.run(function () {
});
app.config( function ($httpProvider) {
    $httpProvider.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
	
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});



