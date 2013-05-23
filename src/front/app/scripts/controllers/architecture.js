'use strict';

angular.module('pie')
.controller('architectureController', function ($scope, $http, $resource, $routeParams, $location, $timeout, authService, apiBaseUrl) {
	authService.ensureLogin();

	if (! $routeParams.documentId) {
		$scope.document = {
			title: '',
			owner : authService.username,
			content: [
				{title:'', level:1},
				{title:'', level:1},
				{title:'', level:1}
			]
		};
	}  else {
		$http({method: "GET", url: apiBaseUrl + "/documents/"+$routeParams.documentId, withCredentials: true})
		.success(function(data) {
			$scope.document = data;
		});
	}


	/* remove a part and all the subparts in it */
	$scope.removePart = function(part) {
		part.deleted = true;
		var index = _.indexOf($scope.document.content, part);
		var deleteSubPartsIsNotDone = true ; 
		var size = $scope.document.content.length;

		while (deleteSubPartsIsNotDone) {
			if (index+1 < size && $scope.document.content[index+1].level > part.level) {
				$scope.document.content[index+1].deleted = true;
				index = index+1;
			} else {
				deleteSubPartsIsNotDone = false;
			}
		}

		$scope.document.content = _.filter($scope.document.content, function (level) {
			return !level.deleted;
		});
	};
	
	/* return the text of a part */
	$scope.getPartIndice = function(part, architectureLevels) {
		var i = 1;
		var j = 0;
		var indice = "";
		var myIndex = _.indexOf( architectureLevels, part);
		var myLevel =  architectureLevels[myIndex].level;
		var size = architectureLevels.length;

		for (i = 1; i <= myLevel; i++) {
			var count = 0;
			for (j = 0 ; j <= myIndex ; j++) {
				if (j < size-1 && j !== myIndex && architectureLevels[j+1].level < i) {
					count = 0;
				} else if  (j < size && architectureLevels[j].level == i) {
					count++;
				}
			}
			
			indice += count + '.';
		}
		return indice; 
	};
	
	/* Add a sub part in the selected part */
	$scope.createSubPart = function(part) {
		var index = _.indexOf($scope.document.content, part) ;
		var myNewLevel = $scope.document.content[index].level + 1;
		$scope.document.content.splice(index+1, 0, {title : '' , level : myNewLevel , deleted : false});
	};
	
	/* Add a part of the same level under the selected part */
	$scope.createNewPart = function(part) {
		var index = _.indexOf($scope.document.content, part) ;
		var myNewLevel = $scope.document.content[index].level ;
		$scope.document.content.splice(index+1, 0, {title : '' , level : myNewLevel , deleted : false});
	};

	/* push backward an section of the architecture */
	$scope.stepBackward = function(part) {
		var index = _.indexOf( $scope.document.content, part) ;
		if ($scope.document.content[index].level !== 1) {
			$scope.document.content[index].level = $scope.document.content[index].level-1;
		}
	};

	/* push forward an section of the architecture */
	$scope.stepForward = function(part) {
		var index = _.indexOf( $scope.document.content, part) ;
		if (index > 0 && ($scope.document.content[index].level - $scope.document.content[index-1].level) <1 ) {
			$scope.document.content[index].level = $scope.document.content[index].level+1;
		}	
	};
	
	/* Hide the remove button if only one item left */
	$scope.removeButtonHide = function(part, architectureLevels) {
		if (part.level === 1) {
			architectureLevels = _.filter(architectureLevels, function (section) {
				return section.level === 1;
			});
			if (architectureLevels.length === 1) {
				return true;
			}
		}
		return false;
	};
	
	/* Hide the backward button if the level of the section is 1 */
	$scope.backwardButtonHide = function(part) {
		if (part.level === 1) {
			return true;
		}
		return false;
	};
	
	/* Hide the forward button if the level of the previous section is already smaller */
	$scope.forwardButtonHide = function(part, architectureLevels) {
		var index = _.indexOf( $scope.document.content, part);
		if (index === 0 || ($scope.document.content[index].level - $scope.document.content[index-1].level) >=1) {
			return true;
		}
		return false;
	};
	
	$scope.sendArchitecture = function () {
		if (! $routeParams.documentId ) {
			$http({method: "POST", url: apiBaseUrl +'/documents', data: $scope.document, withCredentials: true})
			.success(function(docId) {
				$location.path('/editAndDiscuss/'+JSON.parse(docId));
			})
			.error(function(data) {
				console.log('error');
			});
		} else {
			$http({method: "PUT", url: apiBaseUrl +'/documents/'+$routeParams.documentId, data: $scope.document, withCredentials: true})
			.success(function() {
				$location.path('/editAndDiscuss/'+$routeParams.documentId);
			})
			.error(function(data) {
				console.log('error');
			});			
		}
	};
});
