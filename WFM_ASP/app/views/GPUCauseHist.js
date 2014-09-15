var GPUCauseHistC = angular.module("app").controller('GPUCauseHistC', 
    function($scope) {                
        $scope.getOptions = function () {
            return { title: "История корректировок документа", saveButtons: false };
        };        
        var dc = newDataContext();
        objId = parseObjId();
        // reading history ot the document (recursively)
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
                $scope.corrDocs = corrDocs.reverse();
            }
        }
    }
);




