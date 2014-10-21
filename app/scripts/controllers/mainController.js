/* global angular */
(function () {
    "use strict";

    var mainController = function ($scope, $http) {
        var model = $scope.model = {};
        model.companyList = [];

        var init = function(){
            $http.get("data/data.json").success(function(jsonData){
                    model.companyList = jsonData;
             });
        }; init();

        model.getChartURL = function(scrip){
            // Example of URL - https://chart.finance.yahoo.com/z?s=HINDALCO.NS&t=1y&z=s
            var chartURLPrefix = "https://chart.finance.yahoo.com/z?s=";
            var chartURLSuffix = "&t=1y&z=s";
            return chartURLPrefix + scrip + chartURLSuffix;
        };
    };
    angular.module("portfolioCharts",[]).controller("mainController", [ "$scope", "$http", mainController]);

}());

