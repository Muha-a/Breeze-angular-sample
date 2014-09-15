// регистрируется контроллер
var GPUTypicalCauseС = angular.module("app").controller('GPUTypicalCauseC',
    function($scope) {                
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Типовая причина остановки ГПУ", saveButtons: true };
        };

        $scope.saveChanges = function () {
            return dc.saveChanges();
        }
        $scope.cancellChanges = function () {
            return dc.rejectChanges();
        }
        // загрузка данных
        var dc = newDataContext();
        objId = parseObjId();
        if (objId != 'new')
            DataQuery.from('GPUTypicalCauseSet').where('Id', '==', parseInt(objId)).using(dc).execute().then(success);
        else {
            dc.fetchMetadata();
            var newObj = dc.createEntity('GPUTypicalCause');
            success({ results: [newObj] });
        }
        function success(data) {
            $scope.cause = data.results[0];
        }
    }
);




