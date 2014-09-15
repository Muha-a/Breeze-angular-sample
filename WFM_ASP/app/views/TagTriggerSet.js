var TagTriggerSetC = angular.module("app").controller('TagTriggerSetC',
    function($scope) {        
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Триггеры для тегов iFix", saveButtons: false };
        };
        $scope.saveChanges = function () {
            return dc.saveChanges();
        }
        // загрузка данных
        var dc = newDataContext();
        createGrid();
        DataQuery.from('TagTriggerSet').using(dc).execute().then(success);
        function success(data) {
            $scope.triggers = data.results;                        
        }
        function createGrid() {
            $scope.gridOptions = {
                data: 'triggers',
                multiSelect: false,
                enableHighlighting: true,
                enableRowSelection: true,
                enableColumnResize: true,
                rowHeight: 25,
                selectedItems: [],
                columnDefs: [{ field: 'ObjName', displayName: 'Object', width: "120px" }, 
                             { field: 'Pause', displayName: 'Pause', width: "100px" }]
            };
        }
    }
);
