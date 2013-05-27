angular.module('pie')
.factory('authService', function($http, $location, apiBaseUrl) {
	return {
		user: undefined,
		login: function(login, passwd, successCallback, errorCallback) {
			var t = this;

			$http({method: "POST", url: apiBaseUrl + "/users/signin", data: {login:login, passwd:passwd}, withCredentials: true})
			.success(successCallback)
			.error(errorCallback);
		},
		logout: function(successCallback, errorCallback) {
			$http({method: "POST", url: apiBaseUrl + "/user/signout", withCredentials: true})
			.success(successCallback)
			.error(errorCallback);
		},
		register: function(login, passwd, email, imgUrl, successCallback, errorCallback) {
			var t = this;
			var user = {login:login, passwd:passwd, email:email, imgUrl:imgUrl};

			$http({method: "POST", url: apiBaseUrl + "/users/signup", data: user, withCredentials: true})
			.success(successCallback)
			.error(errorCallback);
		},
		ensureLogin: function() {
			// Optimistic function : immediately returns by assuming the
			// user is correctly logged in. If not, after server-side check,
			// redirects the user to the login page
			var t = this;

			var p = $http({
				method: "GET",
				url: apiBaseUrl + "/user",
				withCredentials: true
			});
			p.success(function(data) {
				t.user = data;
			});
			p.error(function() {
				$location.path('/login');
			});
			return p;
		}
	};
});