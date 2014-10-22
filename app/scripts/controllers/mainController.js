/* global angular */
(function () {
    "use strict";

    var mainController = function ($scope, $http) {
        var model = $scope.model = {};
        model.companyList = [];
        model.defaultPeriod = "1y";

        // Read JSON file
        var init = function(){
            $http.get("data/data.json").success(function(jsonData){
                    model.companyList = jsonData;

                    // Add chart links to JSON
                    angular.forEach(model.companyList, function(company){
                        company.chartLink =  model.getChartURL(company.scrip, model.defaultPeriod);
                    });
             });
        }; init();

        // If any of the timeperiod links are clicked, update the chartURL and the chart :)
        model.updateChart = function(company, period){
            company.chartLink = model.getChartURL(company.scrip, period);
        };

        // Generate ChartURL based on the scrip and the time-period
        // Example of URL - https://chart.finance.yahoo.com/z?s=HINDALCO.NS&t=1y&z=s
        model.getChartURL = function(scrip, period){
            var chartURLPrefix = "https://chart.finance.yahoo.com/z?s=";
            var chartURLSuffix = "&t=" + period + "&z=s";
            return chartURLPrefix + scrip + chartURLSuffix;
        };
    };

    angular.module("portfolioCharts",[]).controller("mainController", [ "$scope", "$http", mainController]);

}());

