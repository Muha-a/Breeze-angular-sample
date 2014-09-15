// регистрируется контроллер
var NoneC = angular.module("app").controller('NoneC',
    function ($scope) {
        $scope.getOptions = function () {
            return { title: "   ", saveButtons: false };
        };
    }
);




