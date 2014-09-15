var EmployeeSetC = angular.module("app").controller('EmployeeSetC', 
    function($scope) {                
        $scope.getOptions = function () {
            return { title: "Операторы ГПУ", saveButtons: false };
        };
        $scope.saveChanges = function () {
            return dc.saveChanges();
        }
        // data loading
        var dc = newDataContext();        
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
                columnDefs: [{ field: 'Surname', displayName: 'Surname', width: "120px" }, //, cellTemplate: "<span>{{row.getProperty('Name')}}</span>" 
                             { field: 'Name', displayName: 'Name', width: "120px" },
                             { field: 'Patronymic', displayName: 'Patronymic', width: "120px" },
                             { field: 'UserName', displayName: 'UserName', width: "120px" },
                             { field: 'Role', displayName: 'Role', width: "120px" }]
            };
        }
    }
);
