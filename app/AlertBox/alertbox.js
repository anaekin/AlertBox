var alertbox = angular.module("AlertBox", ["ui.bootstrap"]);
alertbox.constant("AlertType", {
  SUCCESS: "success",
  WARNING: "warning",
  DANGER: "danger",
  INFO: "info",
  PRIMARY: "primary",
  DEFAULT: "default"
});
alertbox.controller("ModalInstanceCtrl", function(
  $scope,
  $uibModalInstance,
  modalData
) {
  $scope.modalData = modalData;

  $scope.ok = function() {
    $uibModalInstance.close("ok");
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss("cancel");
  };
});

alertbox.factory("AlertService", function(AlertType, $uibModal) {
  function AlertBox(heading, message, modalClass) {
    this.heading = heading;
    this.message = message;
    this.modalClass = modalClass;
  }

  AlertBox.prototype = {
    showAlert: function() {
      var modalOptions = {};
      modalOptions.heading = this.heading;
      modalOptions.message = this.message;
      modalOptions.modalClass = this.modalClass;
      var modalInstance = $uibModal.open({
        templateUrl: "app/AlertBox/partials/modal-template.html",
        controller: "ModalInstanceCtrl",
        size: "lg",
        resolve: {
          modalData: function() {
            return modalOptions;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {}, function() {});
    }
  };

  function getAlertBox(heading, message, modalClass) {
    var alertBox = new AlertBox(heading, message, modalClass);
    alertBox.showAlert();
  }

  return {
    alert: getAlertBox
  };
});
