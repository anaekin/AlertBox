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
  function (
    $scope,
    $http,
    $timeout,
    $q,
    $rootScope,
    $uibModal,
    AlertService,
    AlertType
  ) {
    $scope.success = function () {
      AlertService.alert(
        "Success",
        "This is success message",
        AlertType.SUCCESS
      );
    };
    $scope.danger = function () {
      AlertService.alert("Danger", "This is danger message", AlertType.DANGER);
    };
    $scope.warning = function () {
      AlertService.alert(
        "Warning",
        "This is warning message",
        AlertType.WARNING
      );
    };
    $scope.info = function () {
      AlertService.alert("Info", "This is info message", AlertType.INFO);
    };
    $scope.default = function () {
      AlertService.alert(
        "Default",
        "This is default message",
        AlertType.DEFAULT
      );
    };

    $scope.confirmation = function () {
      AlertService.confirm("Warning", "Are you sure?", AlertType.WARNING).then(function (selectedItem) {
        if(selectedItem){
          AlertService.alert(
            "YES",
            "You pressed <b>YES</b>",
            AlertType.SUCCESS
          );
        }else {
          AlertService.alert(
            "NO",
            "You pressed <b>CANCEL</b>",
            AlertType.DANGER
          );
        }
      }, function () {

      });
    };
  }
]);
