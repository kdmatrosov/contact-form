angular.module('contact-form.directives', [])
    .directive('resultMessage', function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, elem) {
                scope.$watch('res', function (res) {
                    if (res !== undefined) {
                        scope.res = undefined;
                    }
                });
            }
        }
    });