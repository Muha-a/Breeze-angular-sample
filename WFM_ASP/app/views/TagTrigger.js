// регистрируется контроллер
var TagTriggerС = angular.module("app").controller('TagTriggerC',
    function($scope) {                
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Триггер для тегов OPC", saveButtons: true };
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
            DataQuery.from('TagTriggerSet').where('Id', '==', parseInt(objId)).using(dc).execute().then(success);
        else {
            dc.fetchMetadata();
            var newObj = dc.createEntity('TagTrigger');
            success({ results: [newObj] });
        }
        function success(data) {
            $scope.trigger = data.results[0];            
        }
    }
);




