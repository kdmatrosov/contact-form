angular.module('contact-form.controllers', [])
    .controller('ContactFormCtrl', ['$scope', 'ContactFormService',
        function ($scope, contactFormService ) {
            $scope.contact = contactFormService.initNewContact();
            $scope.res = undefined;
            $scope.saveContact = function ($valid) {
                if ($valid) {
                    $scope.res = contactFormService.saveContact($scope.contact);
                    
                }
            };
            $scope.resetContact = function () {
                $scope.contact = contactFormService.initNewContact();
            };
        }]);