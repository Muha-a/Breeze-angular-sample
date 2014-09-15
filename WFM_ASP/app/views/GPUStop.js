// регистрируется контроллер
var GPUStopC = angular.module("app").controller('GPUStopC',
    function($scope) {                
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Остановка ГПУ", saveButtons: true };
        };
        $scope.saveChanges = function () {
            // костыль для localtime:
            if ($scope.stop.CauseDoc)
                if ($scope.stop.CauseDoc.RestartTime) {
                    var t = $scope.stop.CauseDoc.RestartTime;
                    $scope.stop.CauseDoc.RestartTime = t.setTime(t.getTime() + (3 * 60 * 60 * 1000));
                }
            // сохранить время
            if ($scope.stop.CauseDoc) 
                if ($scope.stop.CauseDoc.CreationTime === null || $scope.stop.CauseDoc.CreationTime === undefined) {
                    var time = new Date();                    
                    $scope.stop.CauseDoc.CreationTime = time.setTime(time.getTime() + (3 * 60 * 60 * 1000));
                }
            var res = dc.saveChanges();
            return res;
        }
        $scope.cancellChanges = function () {
            return dc.rejectChanges();            
        }
        // загрузка данных
        var dc = newDataContext();
        objId = parseObjId();
        DataQuery.from('EmployeeSet').using(dc).execute().then(success1);
        function success1(data) {
            $scope.operators = data.results;
            DataQuery.from('GPUTypicalCauseSet').using(dc).execute().then(success2);
            function success2(data) {
                $scope.causes = data.results;
                DataQuery.from('GPUStopSet').where('Id', '==', parseInt(objId)).expand("CauseDoc.Cause").using(dc).execute().then(success3);
                function success3(data) {
                    $scope.stop = data.results[0];
                    // создать объект для причин остановки, если еще нет
                    if ($scope.stop.CauseDoc == null) {
                        var cause = dc.createEntity('GPUCause');
                        $scope.stop.CauseDoc = cause;
                        cause.Employee = $scope.$parent.getCurrentOperator($scope.operators);
                        cause.RestartTime = $scope.stop.RevocationTime;
                        $scope.readonly = false;
                    }
                    else
                        $scope.readonly = true;
                }
            }                                    
        }
        $scope.correctDoc = function () {
            var oldDoc = $scope.stop.CauseDoc;
            var cause = dc.createEntity('GPUCause');
            // переписываем поля в новый документ
            cause.Comment = oldDoc.Comment;
            cause.RestartTime = oldDoc.RestartTime;
            cause.Employee = $scope.$parent.getCurrentOperator($scope.operators);
            cause.Cause = oldDoc.Cause;
            cause.Work = oldDoc.Work;            
            // старый отмечаем, новый привязываем к старому
            oldDoc.ReplacedDoc = 1;
            cause.Replaces = oldDoc;
            // заменяем на новый
            $scope.stop.CauseDoc = cause;
            $scope.readonly = false;            
        }

        $scope.openedTime = false;
        $scope.openTime = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedTime = true;
        };


    }

);
