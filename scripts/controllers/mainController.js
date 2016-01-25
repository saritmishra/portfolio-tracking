/* global angular */
(function () {
    "use strict";

    var mainController = function ($scope, $http, $window) {
        var model = $scope.model = {};
        model.companyList = [];
        model.defaultPeriod = "1y";
        model.addSuccessful=false;

        // Read JSON file
        var init = function(){
            $http.get("/data").success(function(jsonData){
                    model.companyList = jsonData;
                    // Add chart URLs to each company in the list of companies
                    model.rebuildCharts();
             });
        }; init();

        // Generate ChartURL based on the scrip and the time-period
        // Example of URL - https://chart.finance.yahoo.com/z?s=HINDALCO.NS&t=1y&z=s
        model.getChartURL = function(scrip, period){
            var chartURLPrefix = "https://chart.finance.yahoo.com/z?s=";
            var chartURLSuffix = "&t=" + period + "&z=s";
            return chartURLPrefix + scrip + chartURLSuffix;
        };

        // If any of the timeperiod links are clicked, update the chartURL and the chart
        model.updateChart = function(company, period){
            company.chartURL = model.getChartURL(company.scrip, period);
        };

        // For each company in the list, this method computes (or recomputes) the chartURL
        model.rebuildCharts = function(){
            angular.forEach(model.companyList, function(company){
                company.chartURL =  model.getChartURL(company.scrip, model.defaultPeriod);
            });
        };

        // Delete entry from DB and remove tile when the "X" button is clicked
        model.removeCompany = function(company){
            console.log("deleting from the database");
            //Delete from DB;

        };

        // The user can reset timeperiods on the UI, which should rebuild all charts for that timeperiod
        $scope.$watch("model.defaultPeriod", function(newValue, oldValue) {
            if (newValue !== oldValue) {
                model.rebuildCharts();
            }
        });

        model.redirect = function(scrip) {
            $window.location.href = "http://finance.yahoo.com/echarts?s=" + scrip;
        };

        model.addScript = function(valid) {
            if (valid) {
                var newEntry = {
                    "intent": $scope.symbolToAdd,
                    "scrip": $scope.intentToAdd,
                    "buyPrice": $scope.buyPriceToAdd
                };

                $http.post('/script', newEntry).then(function(response) {
                    model.addSuccessful=true;
                    // on success add the entry to the array manually to save
                    // a roundtrip call to the db
                    model.companyList.push(newEntry);
                    model.rebuildCharts();
                }, function(response) {
                    // $scope.addStatus = "DB error - Failed to add symbol";
                    model.addSuccessful=false;
                    console.log('add - failure', response);
                });
            }
        }
    };

    angular.module("portfolioCharts",[]).controller("mainController", [ "$scope", "$http", "$window", mainController]);

}());

