var GPUReportC = angular.module("app").controller('GPUReportC',
    function($scope, $filter) {        
        // поддержка функций для представления
        $scope.getOptions = function () {
            return { title: "Отчеты по остановкам ГПУ", saveButtons: false };
        };
        // начальное состояние модели
        $scope.activeTab = '0';
        $scope.selectedMode = 'year';
        $scope.begin = new Date();
        $scope.begin.setHours(0, 0, 0, 0);
        $scope.end = new Date();
        $scope.end.setHours(0, 0, 0, 0);
        $scope.GPUFilter = null;
        $scope.causeFilter = null;
        $scope.typeFilter = null;
        var dc = newDataContext();
        // заполнить список объектов
        DataQuery.from('TagTriggerSet').using(dc).execute().then(success1);
        function success1(data) {
            var objects = [];
            for (id in data.results)
                objects.push({ Name: data.results[id].ObjName });
            $scope.objects = objects;
            // заполнить список причин
            DataQuery.from('GPUTypicalCauseSet').using(dc).execute().then(success2);
        }
        function success2(data) {
            $scope.causes = data.results;
        }
        $scope.loadReport = function () {
                var link = document.createElement("tempDownload");
                link.download = 'Отчет';
                link.href = "/WFM/api/Data/Report?objName=GPUStopReport";
                link.click();            
        }
        $scope.types = ['аварийные','оператором'];

        $scope.openReport = function () {
            var repUrl = "/WFM/api/Data/GPUStopReport/?";
            var repPar = "";
            // добавляем заданные параметры
            if ($scope.GPUFilter)
                repPar += delimiter() + "GPUName=" + $scope.GPUFilter.Name;
            if ($scope.causeFilter)
                repPar += delimiter() + "CauseType=" + $scope.causeFilter.Id;
            if ($scope.typeFilter)
                repPar += delimiter() + "FailType=" + ($scope.typeFilter == 'аварийные' ? 1 : 0);
            var cDate = new Date();
            var begin;
            var end;
            if ($scope.selectedMode == 'year') {
                begin = new Date(cDate.getFullYear(),0,1,0,0,0);
                end = new Date(cDate.getFullYear() + 1, 0, 1, 0, 0, 0);
            }
            else
                if ($scope.selectedMode == 'month') {
                    begin = new Date(cDate.getFullYear(), cDate.getMonth(), 1);
                    var endYear = cDate.getFullYear();
                    var endMonth = cDate.getMonth()+1;
                    if (endMonth>11) {
                        endMonth=0;
                        endYear++;
                    }
                    end = new Date(endYear,endMonth,1,0,0,0);
                }
                else
                    if ($scope.selectedMode == 'week') {
                        begin = new Date(cDate.getFullYear(), cDate.getMonth(), 1);
                        begin = begin.addDays(-begin.getDay()+1);
                        end = begin.addDays(7);
                    }
                    else 
                        if ($scope.selectedMode == 'period') {
                            begin = $scope.begin;
                            end = $scope.end;
                        };
            repPar += delimiter() + "StartTime=" + $filter('date')(begin, 'yyyyMMddHHmmss');
            repPar += delimiter() + "EndTime=" + $filter('date')(end, 'yyyyMMddHHmmss');
            $("#reportEmbed")[0].src = repUrl + repPar;
            // $("#reportEmbed")[0].data = repUrl + repPar;
            function delimiter() {
                return (repPar == "" ? "" : "&");
            }
        }

        $scope.openedBegin = false;
        $scope.openBegin = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedEnd = false;
            $scope.openedBegin = true;
        };
        $scope.openedEnd = false;
        $scope.openEnd = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedBegin = false;
            $scope.openedEnd = true;
        };


    }
);
