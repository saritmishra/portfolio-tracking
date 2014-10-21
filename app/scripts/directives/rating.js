/* global angular */
(function(){
    'use strict';

    angular.module('bestSellersApp').directive('smRating', function(){
        return {

            scope: {
                ratingValue : '=',
                maxStars: '@'
            }, // {} = isolate, true = child, false/undefined = no change

            restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment

            template:
                '<ul>' +
                    '<li ng-repeat="star in stars" ng-class="star.status" ng-click="setRating($index)">\u2605</li>' +
                '</ul>',

            link: function($scope) {

                $scope.updateRating = function() {
                    $scope.stars = [];
                    for (var i = 0; i < $scope.maxStars; i += 1) {
                        $scope.stars.push({
                            status: (i < $scope.ratingValue) ? 'filled' : ''
                        });
                    }
                };
                $scope.updateRating();

                //This watch will detect change in ratingValue and update view (highlight stars) accordingly
                $scope.$watch('ratingValue', function(newValue) {
                    if (newValue) {
                        $scope.updateRating();
                    }
                });

                $scope.setRating = function(index){
                    $scope.ratingValue = index + 1;
                    // $scope.updateRating();
                };
            }
        };
    });

}());