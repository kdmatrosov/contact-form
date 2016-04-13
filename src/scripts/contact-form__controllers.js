angular.module('contact-form.controllers', [])
    .controller('ContactFormCtrl', ['$scope', 'ContactFormService',
        function ($scope, contactFormService ) {
            $scope.contact = {
                name: {
                    first: '',
                    last: ''
                },
                company: {
                    name: '',
                    industry: '',
                    address: {
                        email: '',
                        phone: '',
                        place: ''
                    }
                },
                event: {
                    attendees: '',
                    date: '',
                    description: ''
                }
            };
            $scope.res = undefined;
            $scope.saveContact = function () {
                $scope.res = contactFormService.saveContact($scope.contact);
            };
        }]);