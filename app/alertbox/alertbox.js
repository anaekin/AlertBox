angular.module("AlertBox", ["ui.bootstrap"]);
angular.module("AlertBox").constant("AlertType", {
    SUCCESS: "success",
    WARNING: "warning",
    DANGER: "danger",
    INFO: "info",
    PRIMARY: "primary",
    DEFAULT: "default"
});

angular.module("AlertBox").run(["$templateCache", function($templateCache) {
    $templateCache.put("modal-template.html", '<div class="alert-modal">' +
        '<div class="modal-header" ng-class="modalData.modalClass">' +
        '<span class="modal-header-label">{{modalData.heading}}</span>' +
        '<button class="close" ng-click="cancel()">&times;</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<span class="modal-description" ng-bind-html="modalData.message | trustHtml"></span>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<div class="button-row">' +
        '<button class="btn btn-close" ng-click="cancel()">OK</button>' +
        '</div>' +
        '</div>' +
        '</div>');


    $templateCache.put("modal-confirm-template.html", '<div class="alert-modal">' +
        '<div class="modal-header" ng-class="modalData.modalClass">' +
        '<span class="modal-header-label">{{modalData.heading}}</span>' +
        '<button class="close" ng-click="cancel()">&times;</button>' +
        '</div>' +
        '<div class="modal-body">' +
        '<span class="modal-description" ng-bind-html="modalData.message | trustHtml"></span>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<div class="button-row">' +
        '<button class="btn btn-danger" ng-click="accept()">{{modalData.acceptLabel}}</button>' +
        '<button class="btn btn-close" ng-click="deny()">{{modalData.denyLabel}}</button>' +
        '</div>' +
        '</div>' +
        '</div>');
}]);
angular.module("AlertBox").controller("ModalInstanceCtrl", ["$scope", "$uibModalInstance", "modalData", function($scope, $uibModalInstance, modalData) {
    $scope.modalData = modalData;

    $scope.ok = function() {
        $uibModalInstance.close("ok");    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss("cancel");
        return false;
    };

    $scope.accept = function() {
        $uibModalInstance.close(true);
    };

    $scope.deny = function() {
        $uibModalInstance.close(false);
    };
}]);
angular.module("AlertBox").filter("trustHtml", ["$sce", function($sce) {
    return function(html) {
        return $sce.trustAsHtml(html)
    }
}]);
angular.module("AlertBox").factory("AlertService", ["AlertType", "$uibModal", "$timeout", function(AlertType, $uibModal, $timeout) {
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
        showAlert: function() {
            var modalOptions = {};
            var extraOptions = {};
            modalOptions.heading = this.heading;
            modalOptions.message = this.message;
            modalOptions.modalClass = this.modalClass;

            extraOptions = this.extraOptions ? this.extraOptions : {};
            modalOptions.autoCloseTime = extraOptions.autoCloseTime ? extraOptions.autoCloseTime : 2000;

            var modalInstance = $uibModal.open({
                templateUrl: "modal-template.html",
                controller: "ModalInstanceCtrl",
                size: "md",
                resolve: {
                    modalData: function() {
                        return modalOptions;
                    }
                }
            });

            if (modalOptions.autoClose || modalOptions.modalClass === AlertType.SUCCESS) {
                $timeout(function() {
                    modalInstance.close("ok");
                }, modalOptions.autoCloseTime);
            }

            modalInstance.result.then(function(selectedItem) {}, function() {});
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
        showConfirm: function() {
            var modalOptions = {};
            var extraOptions = {};
            modalOptions.heading = this.heading;
            modalOptions.message = this.message;
            modalOptions.modalClass = this.modalClass;

            extraOptions = this.extraOptions ? this.extraOptions : {};
            modalOptions.acceptLabel = extraOptions.acceptLabel ? extraOptions.acceptLabel : "OK";
            modalOptions.denyLabel = extraOptions.denyLabel ? extraOptions.denyLabel : "Cancel";

            var modalInstance = $uibModal.open({
                templateUrl: "modal-confirm-template.html",
                controller: "ModalInstanceCtrl",
                size: "md",
                resolve: {
                    modalData: function() {
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
}]);
