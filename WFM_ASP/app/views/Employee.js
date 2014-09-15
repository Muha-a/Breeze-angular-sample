// регистрируется контроллер
var EmployeeC = angular.module("app").controller('EmployeeC', 
    function ($scope) {
        $scope.roles = [{ name: 'administrator', value: 'admin' }, { name: 'operator', value: 'operator' }, { name: 'manager', value: 'manager' }];
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "GPU operator", saveButtons: true };
        };
        $scope.saveChanges = function () {
            if ($scope.Role)
                $scope.employee.Role = $scope.Role.value;
            else
                $scope.employee.Role = null;
            return dc.saveChanges();
        }
        $scope.cancellChanges = function () {
            return dc.rejectChanges();
        }
        // загрузка данных
        var dc = newDataContext();
        objId = parseObjId();
        if (objId != 'new')
            DataQuery.from('EmployeeSet').where('Id', '==', parseInt(objId)).using(dc).execute().then(success);
        else {
            dc.fetchMetadata();
            var newObj = dc.createEntity('Employee');
            success({ results: [newObj] });
        }
        function success(data) {
            $scope.employee = data.results[0];
            for (id in $scope.roles)
                if ($scope.roles[id].value == $scope.employee.Role)
                    $scope.Role = $scope.roles[id];
            //$scope.$apply();
        }
    }
);




