// регистрируется контроллер
var EmployeeC = angular.module("app").controller('LoginC', 
    function($scope) {
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Авторизация пользователя", saveButtons: false };
        };
        $scope.userName = "";
        $scope.password = "";
        $scope.sucess = false;
        $scope.error = false;

        $scope.login = function() {
            $.post(
                "/WFM/api/Login/Login/?user=" + $scope.userName + '&password=' + $scope.password,
                {},
                    function (data) {
                        if (data == 'fail') {
                            $scope.error = true;
                            $scope.$apply();
                        }
                        else {
                            if (data.indexOf("userName=") >-1) {
                            $scope.error = false;
                                // прочитать пользователя и роль из ответа
                                getAuthFromCookie(data);
                                var scope = angular.element("#viewsArea").scope();
                                $scope.sucess = true;
                                $scope.$apply();
                                buildMenu();
                                // перейти к дефолтному представлению
                                var view = getDefView();
                                if (view != "None") {
                                    var timer = setInterval(function () {
                                        clearInterval(timer);
                                        if (window.location.href.indexOf('Login', this.length - 5) != -1) {
                                            var el = angular.element("#viewsArea");
                                            el.controller().openView(view);
                                            el.scope().$apply();
                                        }
                                    }, 1000);
                                }
                            }
                            else {
                                alert(data);
                            }
                        }
                    }
        );
        };

        $scope.focusNext = function() {
            $('#passInput').focus();
        };

    }
);
