/*
 * This program was produced for the U.S. Agency for International Development. It was prepared by the USAID | DELIVER PROJECT, Task Order 4. It is part of a project which utilizes code originally licensed under the terms of the Mozilla Public License (MPL) v2 and therefore is licensed under MPL v2 or later.
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the Mozilla Public License as published by the Mozilla Foundation, either version 2 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the Mozilla Public License for more details.
 *
 * You should have received a copy of the Mozilla Public License along with this program. If not, see http://www.mozilla.org/MPL/
 */
function CustomReportController($scope, reports, CustomReportValue) {

  $scope.reports = reports;
  $scope.displayReports = _.groupBy(reports, 'category');
  $scope.categories = _.uniq(_.pluck(reports, 'category'));

  $scope.isReady = true;
  if (!angular.isUndefined($scope.filter) && angular.isUndefined($scope.filter.report_key)) {
    $scope.OnFilterChanged();
  }

  $scope.OnReportTypeChanged = function(){
    $scope.OnFilterChanged();
  }

  function updateFilterSection($scope) {

    // avoid having the blinking effect if the report has not been changed.
    if ($scope.previous_report_key != $scope.filter.report_key) {
      $scope.previous_report_key = $scope.filter.report_key;

      $scope.report = _.findWhere($scope.reports, {reportkey: $scope.filter.report_key});

      $scope.report.columns = angular.fromJson($scope.report.columnoptions);
      if ($scope.report.filters !== null && $scope.report.filters !== '') {
        $scope.report.currentFilters = angular.fromJson($scope.report.filters);
        var required = _.pluck($scope.report.currentFilters,'name');
        $scope.requiredFilters = [];
        angular.forEach(required, function(r){
          $scope.requiredFilters[r] = r;
        });
      } else {
        $scope.report.currentFilters = [];
          $scope.requiredFilters = [];
      }
    }
  }

  $scope.OnFilterChanged = function () {
    if (angular.isUndefined($scope.filter) || angular.isUndefined($scope.filter.report_key) || !$scope.isReady) {
      return;
    }
    $scope.applyUrl();
    updateFilterSection($scope);


    //clear existing data
    $scope.data = [];
    $scope.meta = undefined;
    CustomReportValue.get($scope.getSanitizedParameter(), function (data) {
      $scope.meta = data;
      $scope.data = data.values;
    });

  };

}


CustomReportController.resolve = {
  reports: function ($q, $timeout, CustomReportList) {
    var deferred = $q.defer();
    $timeout(function () {

      CustomReportList.get(function (data) {
        deferred.resolve(data.reports);
      });
    }, 100);
    return deferred.promise;
  }
};
