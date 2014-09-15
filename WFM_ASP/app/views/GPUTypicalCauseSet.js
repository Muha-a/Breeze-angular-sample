var GPUTypicalCauseC = angular.module("app").controller('GPUTypicalCauseSetC',
    function ($scope) {
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Типовые причины остановок ГПУ", saveButtons: false };
        };
        $scope.saveChanges = function () {
            return dc.saveChanges();
        }

        function cellTemplate(cellExpression) {            
            return '<div class="ngCellText" ng-class="getCellClass(row.entity,col.index)">{{' + cellExpression + '}}</div>';
        }

        $scope.IsFailure = function (cause) {            
            return cause.IsFailure ? "Аварийная" : "Оператором";
        };
        // загрузка данных
        var dc = newDataContext();
        // создать таблицу
        createGrid();
        DataQuery.from('GPUTypicalCauseSet').using(dc).execute().then(success);
        function success(data) {
            $scope.causes = data.results;
        }
        function createGrid() {
            $scope.gridOptions = {
                data: 'causes',
                multiSelect: false,
                enableHighlighting: true,
                enableRowSelection: true,
                enableColumnResize: true,
                rowHeight: 25,
                selectedItems: [],
                columnDefs: [{ field: 'Name', displayName: 'Наименование', width: "160px" }, 
                             { field: 'Comment', displayName: 'Пояснения', width: "300px" },
                             { field: 'IsFailure', displayName: 'Остановка', cellTemplate: cellTemplate('IsFailure(row.entity)'), width: "120px" }]
            };
        }
    }
);
