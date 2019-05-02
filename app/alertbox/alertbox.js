var alertbox = angular.module("AlertBox", ["ui.bootstrap"]);
alertbox.constant("AlertType", {
    SUCCESS: "success",
    WARNING: "warning",
    DANGER: "danger",
    INFO: "info",
    PRIMARY: "primary",
    DEFAULT: "default"
});
alertbox.controller("ModalInstanceCtrl", function (
    $scope,
    $uibModalInstance,
    modalData
) {
    $scope.modalData = modalData;

    $scope.ok = function () {
        $uibModalInstance.close("ok");
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
        return false;
    };

    $scope.accept = function () {
        $uibModalInstance.close(true);
    };

    $scope.deny = function () {
        $uibModalInstance.close(false);
    };
});

alertbox.factory("AlertService", function (AlertType, $uibModal, $timeout) {
    function AlertBox(heading, message, modalClass, extraOptions) {
        this.heading = heading;
        this.message = message;
        this.modalClass = modalClass;
        this.extraOptions = extraOptions;

        /*
            extraoptions : {
                autoClose: true | false,
                autoCloseTime: > 0
            } 
        */
    }

    AlertBox.prototype = {
        showAlert: function () {
            var modalOptions = {};
            var extraOptions = {};
            modalOptions.heading = this.heading;
            modalOptions.message = this.message;
            modalOptions.modalClass = this.modalClass;

            extraOptions = this.extraOptions ? this.extraOptions : {};
            modalOptions.autoCloseTime = extraOptions.autoCloseTime ? extraOptions.autoCloseTime : 2000;

            var modalInstance = $uibModal.open({
                templateUrl: "app/alertbox/partials/modal-template.html",
                controller: "ModalInstanceCtrl",
                size: "md",
                resolve: {
                    modalData: function () {
                        return modalOptions;
                    }
                }
            });

            if (modalOptions.autoClose || modalOptions.modalClass === AlertType.SUCCESS) {
                $timeout(function () {
                    modalInstance.close("ok");
                }, modalOptions.autoCloseTime);
            }

            modalInstance.result.then(function (selectedItem) {}, function () {});
        },
    };

    function ConfirmBox(heading, message, modalClass, extraOptions) {
        this.heading = heading;
        this.message = message;
        this.modalClass = modalClass;
        this.extraOptions = extraOptions;

        /*
            extraoptions : {
                acceptLabel: string,
                denyLabel: string
            } 
        */
    }
    ConfirmBox.prototype = {
        showConfirm: function () {
            var modalOptions = {};
            var extraOptions = {};
            modalOptions.heading = this.heading;
            modalOptions.message = this.message;
            modalOptions.modalClass = this.modalClass;

            extraOptions = this.extraOptions ? this.extraOptions : {};
            modalOptions.acceptLabel = extraOptions.acceptLabel ? extraOptions.acceptLabel : "Ok";
            modalOptions.denyLabel = extraOptions.denyLabel ? extraOptions.denyLabel : "Cancel";

            var modalInstance = $uibModal.open({
                templateUrl: "app/alertbox/partials/modal-confirm-template.html",
                controller: "ModalInstanceCtrl",
                size: "md",
                resolve: {
                    modalData: function () {
                        return modalOptions;
                    }
                }
            });


            return modalInstance.result;
        }
    };

    function getAlertBox(heading, message, modalClass, extraOptions) {
        var alertBox = new AlertBox(heading, message, modalClass, extraOptions);
        alertBox.showAlert();
    }

    function getConfirmBox(heading, message, modalClass, extraOptions) {
        var confirmBox = new ConfirmBox(heading, message, modalClass, extraOptions);
        return confirmBox.showConfirm();
    }

    return {
        alert: getAlertBox,
        confirm: getConfirmBox
    };
});
