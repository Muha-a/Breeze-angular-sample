var EmployeeSetC = angular.module("app").controller('EmployeeSetC', 
    function($scope) {        
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Операторы ГПУ", saveButtons: false };
        };
        $scope.saveChanges = function () {
            return dc.saveChanges();
        }
        // загрузка данных
        var dc = newDataContext();
        // создать таблицу
        createGrid();
        DataQuery.from('EmployeeSet').using(dc).execute().then(success);
        function success(data) {
            $scope.employees = data.results;            
        }
        function createGrid() {
            $scope.gridOptions = {
                data: 'employees',
                multiSelect: false,
                enableHighlighting: true,
                enableRowSelection: true,
                enableColumnResize: true,
                rowHeight: 25,
                selectedItems: [],
                columnDefs: [{ field: 'Surname', displayName: 'Фамилия', width: "120px" }, //, cellTemplate: "<span>{{row.getProperty('Name')}}</span>" 
                             { field: 'Name', displayName: 'Имя', width: "120px" },
                             { field: 'Patronymic', displayName: 'Отчество', width: "120px" },
                             { field: 'UserName', displayName: 'Пользователь', width: "120px" },
                             { field: 'Role', displayName: 'Роль', width: "120px" }]
            };
        }
    }
);
