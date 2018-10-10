var testapp = angular.module("TestApp", ["AlertBox", "ui.bootstrap"]);

testapp.controller("MainController", [
  "$scope",
  "$http",
  "$timeout",
  "$q",
  "$rootScope",
  "$uibModal",
  "AlertService",
  "AlertType",
  function(
    $scope,
    $http,
    $timeout,
    $q,
    $rootScope,
    $uibModal,
    AlertService,
    AlertType
  ) {
    this.showAlert = function() {
      alert("Yeahh");
    };

    $scope.open = function() {
      AlertService.alert("Success", "Success", AlertType.SUCCESS);
      AlertService.alert("DANGER", "DANGER", AlertType.DANGER);
      AlertService.alert("WARNING", "WARNING", AlertType.WARNING);
      AlertService.alert("INFO", "INFO", AlertType.INFO);
    };
  }
]);
