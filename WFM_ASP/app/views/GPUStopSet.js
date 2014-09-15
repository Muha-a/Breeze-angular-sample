var GPUStopSetC = angular.module("app").controller('GPUStopSetC', 
    function controller($scope, $filter) {        
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Остановки ГПУ", saveButtons: false };
        };
        // загрузка данных
        var dc = newDataContext();
        // создать таблицу
        createGrid();

        function cellTemplate(cellExpression) {
            //return '<div class="ngCellText" ng-class="getCellClass(row.entity,col.index,  col.colIndex())"><span ng-cell-text>{{' + cellExpression + '}}</span></div>';
            return '<div class="ngCellText" ng-class="getCellClass(row.entity,col.index)">{{' + cellExpression + '}}</div>';
        }

        function checkCellTemplate(cellExpression) {
            return '<div class="ngCellText" ng-class="getCellClass(row.entity,col.index)">{{' + cellExpression + '}}</div>';
        }

        $scope.getRevocationTime = function (stop) {
            // выводится известное время, если оба - одно в скобках
            /*
            var timeTS;
            var timeOp;
            if (stop.RevocationTime)
                timeTS = $filter('date')(stop.RevocationTime, 'yyyy.MM.dd HH:mm:ss');
            if (stop.CauseDoc) 
                if (stop.CauseDoc.RestartTime)
                    timeOp = $filter('date')(stop.CauseDoc.RestartTime, 'yyyy.MM.dd HH:mm:ss');
            if (timeTS && timeOp)
                return (timeTS + "(" + timeOp + ")");
            else
                return timeTS? timeTS: (timeOp? timeOp: "-");                    
                */
            if (stop.RevocationTime)
                return $filter('date')(stop.RevocationTime, 'yyyy.MM.dd HH:mm:ss');
            return "";
        }

        $scope.getRestartTime = function (stop) {
            if (stop.CauseDoc)
                if (stop.CauseDoc.RestartTime)
                    return $filter('date')(stop.CauseDoc.RestartTime, 'yyyy.MM.dd HH:mm:ss');
            if (stop.RevocationTime)
                return $filter('date')(stop.RevocationTime, 'yyyy.MM.dd HH:mm:ss');
            return "";
        }

        $scope.getEventTime = function (stop) {
           return $filter('date')(stop.EventTime, 'yyyy.MM.dd HH:mm:ss');            
        }

        $scope.getPageData = function (pageSize, page) {
            // можно скорректировать запрос под размер таблицы
            //if (pageSize == 20)
              //  $scope.pagingOptions.pageSize = 30;
            DataQuery.from('GPUStopSet').orderByDesc('EventTime').skip(pageSize * (page - 1)).take(pageSize).inlineCount().expand("CauseDoc.Cause,CauseDoc.Employee,CauseDoc.Replaces").using(dc).execute().then(success);
            function success(data) {
                $scope.stops = data.results;
                $scope.totalServerItems = data.inlineCount;
            }
        };

        $scope.getPageData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        function createGrid() {
            $scope.totalServerItems = 0;
            $scope.pagingOptions = {
                pageSizes: [30],
                pageSize: 30,
                currentPage: 1
            };            
            $scope.$watch('pagingOptions', function (newVal, oldVal) {
                if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                    $scope.getPageData($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                }
            }, true);
            $scope.gridOptions = {
                data: 'stops',
                enablePaging: true,
                showFooter: true,
                totalServerItems: 'totalServerItems',
                pagingOptions: $scope.pagingOptions,
                multiSelect: false,
                enableHighlighting: true,
                enableRowSelection: true,
                enableColumnResize: true,
                rowHeight: 25,
                selectedItems: [],
                i18n: 'ru',
                columnDefs: [{ field: 'ObjName', displayName: 'GPU', cellTemplate: cellTemplate('row.entity.ObjName'), width: "100px" }, //, cellTemplate: "<span>{{row.getProperty('Name')}}</span>" 
                             { field: 'EventTime', displayName: 'Stop time', cellTemplate: cellTemplate('getEventTime(row.entity)'), width: "155px" },
                             //{ field: 'RevocationTime', displayName: 'Пуск (по ТС)', cellTemplate: cellTemplate('getRevocationTime(row.entity)'), width: "155px" },
                             { field: 'RestartTime', displayName: 'Restart time', cellTemplate: cellTemplate('getRestartTime(row.entity)'), width: "155px" },
                             { field: 'cause', displayName: 'Cause', cellTemplate: cellTemplate('getCause(row.entity)'), width: "140px" },
                             { field: 'comment', displayName: 'Comment', cellTemplate: cellTemplate('getComment(row.entity)'), width: "115px" },
                             { field: 'work', displayName: 'Works', cellTemplate: cellTemplate('getWork(row.entity)'), width: "120px" },
                             { field: 'time', displayName: 'Down time', cellTemplate: cellTemplate('getDownTime(row.entity)'), width: "125px" },
                             { field: 'operator', displayName: 'Operator', cellTemplate: cellTemplate('getOperator(row.entity)'), width: "130px" },
                             { field: 'corr', displayName: 'Corr.', cellTemplate: checkCellTemplate('getCorr(row.entity)'), width: "60px" }
                             //,{ field: 'Id', displayName: 'Id', width: "100px" }
                ]
            };

            //$scope.gridOptions.$gridScope.i18n = window.ngGrid.i18n['de'];

        }
        $scope.getCause = function (stop) {
            if (stop.CauseDoc) {
                if (stop.CauseDoc.Cause)
                    return stop.CauseDoc.Cause.Name;
                else
                    return 'не указана';
            }
            else
                return "";
        }
        $scope.getComment = function (stop) {
            if (stop.CauseDoc)
                return stop.CauseDoc.Comment;
            else return ""
        }
        $scope.getWork = function (stop) {
            if (stop.CauseDoc)
                return stop.CauseDoc.Work;
            else return ""
        }
        $scope.getDownTime = function (stop) {
            var stopTime = stop.EventTime;
            // старт введенный вручную, или по ТС, если нет
            var startTime = stop.RevocationTime;
            if (stop.CauseDoc) 
                if (stop.CauseDoc.RestartTime)
                    startTime = stop.CauseDoc.RestartTime;
            if (startTime && stopTime) {
                if (stopTime > startTime)
                    return 'Пуск раньше остановки';
                var totMin = Math.round((startTime - stopTime) / 1000 / 60);
                var days = Math.floor(totMin / 1440);
                var hours = Math.floor((totMin - days * 1440) / 60);
                var min = (totMin - days * 1440 - hours * 60);
                return (days == 0 ? "" : days + 'д. ') + (hours==0? "": hours + 'ч. ') + min + 'м.';
            }
            else
                return '-';
        }

        $scope.getOperator = function (stop) {
            if (stop.CauseDoc)
                if (stop.CauseDoc.Employee)
                    return stop.CauseDoc.Employee.getFIO();
        }
        $scope.getCorr = function (stop) {
            if (stop.CauseDoc)
                if (stop.CauseDoc.Replaces)
                    return "+";

            return '';
        }

        $scope.getCellClass = function (stop, colNum) {            
            //if (colNum >= 3)
                if ($scope.gridOptions.selectedItems.length == 0 || $scope.gridOptions.selectedItems[0] != stop)
                    return (stop.CauseDoc ? 'processedDoc' : 'newDoc');
           return "";
        }
    }
);
