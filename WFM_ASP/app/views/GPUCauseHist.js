// регистрируется контроллер
var GPUCauseHistC = angular.module("app").controller('GPUCauseHistC', 
    function($scope) {        
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "История корректировок документа", saveButtons: false };
        };
        // загрузка данных
        var dc = newDataContext();
        objId = parseObjId();
        // рекурсивно читаем историю корректировок
        $scope.corrDocs = [];
        var corrDocs = [];
        readNextDoc(objId);
        function readNextDoc(objId) {
            DataQuery.from('GPUCauseSet').where('Id', '==', parseInt(objId)).expand('Replaces,Employee,Cause').using(dc).execute().then(success);            
        }
        function success(data) {
            var doc = data.results[0];
            corrDocs.push(doc);
            if (doc.Replaces)
                readNextDoc(doc.Replaces.Id);
            else {
                // последний прочитан
                $scope.corrDocs = corrDocs.reverse();
            }
        }
    }
);




