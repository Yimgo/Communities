'use strict';

angular.module('pie')
.controller('EditController', function ($scope, $resource, $routeParams, authService, discussionService) {
	var token = authService.ensureLoginAndReturnToken();

	// Create the document factory
	var Document = $resource(
		'http://localhost\\:8080/documents/:id',
		{
			id: '@id',
			token: token
		},
		{
			update: {method: 'PUT'}
		}
	);

	// Get the document from the API
	$scope.document = Document.get({id: $routeParams.documentId});

	$scope.edit = function(section) {
		if (! section.isMyContentEditable) {
			section.isMyContentEditable = true;
		}
		else {
			section.isMyContentEditable = false;
			$scope.document.$update();
		}
	};

	$scope.showDiscussion = function(discussion) {
		discussionService.get(discussion.id);
	};

	$scope.createDiscussion = function(section) {
	};

	$scope.editButtonImage = function(section) {
		return section.isMyContentEditable ? "icon-ok" : "icon-edit";
	};
});