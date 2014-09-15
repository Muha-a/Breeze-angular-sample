
// current authorization info
var authInfo = { userName: null, role: null, };

// reads authorization info from atached to main page cookies
getAuthFromCookie(document.cookie);

function getAuthFromCookie(cookie) {
    var list = cookie.split(";");
    for (var i in list) {
        var c = list[i];
        var name = c.split('=')[0].trim();
        var val = c.split('=')[1].trim();
        if (name == 'userName')
            authInfo.userName = val;
        if (name=='role')
            authInfo.role = val;
    }
}

// angular initialization wrapped to a function
(function () {
    // angular initialization
    angular.module('app', ['breeze.angular', 'ngRoute', 'ngGrid', 'ngDialog', 'ui.bootstrap', ]);

    // root controller initialization
    angular.module("app").controller('mainC',
        function ($rootScope, $scope, $window, $location, $route, ngDialog, datepickerPopupConfig, breeze) {
            var vm = this;
            // save data (on Save button)
            vm.saveInView = function () {
                // get current controller scope for current active view
                var c = getCurrentScope();
                if (c)
                    if (c.saveChanges)
                        c.saveChanges().then(function () {
                            // go to previous view
                            $window.history.back();
                        }).catch(function (mess) {
                            alert('Data saving error: ' + mess);
                        });
            };
            // Cancell button
            vm.cancelInView = function () {
                // cancell changhigs (may be it is not necessary)
                var c = getCurrentScope();
                if (c)
                    if (c.cancellChanges) {
                        c.cancellChanges();
                        // 
                        $window.history.back();
                    }
            };
            // veiw changing processing
            $rootScope.$on("$locationChangeStart", function (event, newUrl, oldUrl) {                
                // authorization: go to login page if user does not have access rights to a new route 
                if (authInfo.userName == null || authInfo.userName == "") {
                    $location.path('/Login')
                    return;
                }                
                var c = getCurrentScope();
                if (c)                
                    if (c.validate) // controller can disable invalid data saving
                    if (!c.validate())
                        event.preventDefault();
            });
            // new view loaging event processing
            $rootScope.$on("$viewContentLoaded", function () {
                var c = getCurrentScope();
                // настройка элементов основного окна для нового представления
                if (c.getOptions) {
                    var opt = c.getOptions()
                    $("#currentViewTitle").html(opt.title);
                    // если требуется сохранение - показать панель и привязать к признакам контроллера
                    if (opt.saveButtons) {
                        $("#viewButtonsDiv").css('display', 'block');
                        $("#viewDiv").css('bottom: 37px');
                    }
                    else {
                        $("#viewButtonsDiv").css('display', 'none');
                        $("#viewDiv").css('bottom', '0px');
                    }
                }
            });
            // Функции для перехода к новому представлению:
            // открыть представление для объекта в строке grid
            vm.openViewForRow = function (viewName, gridOptions) {
                if (gridOptions)
                    if (gridOptions.selectedItems.length > 0)
                        vm.openViewForObject(viewName, gridOptions.selectedItems[0].Id);
            }
            // открыть представление для редактирования указанного объекта
            vm.openViewForObject = function (viewName, objId) {
                $location.path('/' + viewName + '/' + objId);
            }
            // открыть представление для создания нового объекта
            vm.openViewForNew = function (viewName) {
                $location.path('/' + viewName + '/new');
            }
            // открыть указанное представление
            vm.openView = function (viewName) {
                // если путь и так уже открыт - обновить представление
                if ($location.path() == '/' + viewName) {
                    $route.reload();
                }
                else
                    $location.path('/' + viewName);
            }
            // функция для удаления выбранной строки в таблице
            vm.deleteEntity = function (gridOptions, gridData) {
                if (gridOptions)
                    if (gridOptions.selectedItems.length > 0) {
                        var deletedId = gridOptions.selectedItems[0].Id;
                        // в данных найти объект и удалить
                        for (id in gridData) {
                            var obj = gridData[id];
                            if (obj.Id == deletedId) {                                
                                //ngDialog.open({ template: '/app/views/deleteDialog.html' });
                                var delDialog = ngDialog.open({
                                    template: 'deleteDialogId',
                                    className: 'ngdialog-theme-plain',
                                });
                                delDialog.closePromise.then(function (result) {
                                    if (result.value == 'yes') {
                                        obj.entityAspect.setDeleted();
                                        gridData.splice(id, 1);
                                        var c = getCurrentScope();
                                        if (c)
                                            if (c.saveChanges)
                                                c.saveChanges().then(function () {
                                                }).catch(function (mess) {
                                                    alert('Ошибка при сохранении данных: ' + mess);
                                                });

                                        return;
                                    }
                                });
                            }
                        }
                    }
            }
            // найти пользователя, соответствующего текущему логингу
            $scope.getCurrentOperator =  function(employeeSet) {
                for (i in employeeSet) {
                    var e = employeeSet[i];
                    if (e.UserName == vm.authInfo.userName)
                        return e;
                }
                return null;
            }
            
            // включаем в контроллер параметры авторизации для отображения
            vm.authInfo = authInfo;

            // найти модель текущего открытого представления
            vm.getCurrentScope = getCurrentScope;
            function getCurrentScope() {
                var ch = $('#viewDiv').children();
                if (ch.length > 0) {
                    return angular.element(ch[0]).scope();
                }
                return null;
            }
            // русификация компонентов
            datepickerPopupConfig.clearText = 'Очистить';
            datepickerPopupConfig.closeText = 'Закрыть';
            datepickerPopupConfig.currentText = 'Сегодня';

            // логаут текущего пользователя
            vm.logOut = function () {
                    $.post(
                        "/WFM/api/Login/LogOut/",
                        {}, function (data) {
                            authInfo.userName = null;
                            authInfo.role = null;
                            vm.openView('Login');
                            $scope.$apply();
                        }
                    );
            }
        }
    );

    // задаем маршруты к контроллерам
    angular.module('app').config(appRouteConfig).
     // подменяем обработчик ошибок для реакции на отсутствие авторизации
     factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
         return {
            response: function(response){
                if (response.status === 401) {
                    alert("Response 401");
                }
                return response || $q.when(response);
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {                    
                    angular.element("#viewsArea").controller().openView('Login');                    
                }
                return $q.reject(rejection);
            }
        }
     }])        
        .config(['$httpProvider',function($httpProvider) {    
        $httpProvider.interceptors.push('authHttpResponseInterceptor');
        }]);
    // маршруты к представлениям; 
    function appRouteConfig($routeProvider) {
        $routeProvider.
        when('/GPUTypicalCauseSet', {            
            templateUrl: '/WFM/Views/Get/GPUTypicalCauseSet'
        }).
        when('/GPUTypicalCause/:id', {
            templateUrl: '/WFM/Views/Get/GPUTypicalCause'
        }).
        when('/TagTriggerSet', {
            templateUrl: '/WFM/Views/Get/TagTriggerSet'
        }).
        when('/TagTrigger/:id', {
            templateUrl: '/WFM/Views/Get/TagTrigger'
        }).
        when('/EmployeeSet', {
            templateUrl: '/WFM/Views/Get/EmployeeSet'
        }).
        when('/Employee/:id', {
            templateUrl: '/WFM/Views/Get/Employee'
        }).
        when('/GPUStopSet', {
            templateUrl: '/WFM/Views/Get/GPUStopSet'
        }).
        when('/GPUStop/:id', {
            templateUrl: '/WFM/Views/Get/GPUStop'
        }).
        when('/GPUReport', {
            templateUrl: '/WFM/Views/Get/GPUReport'
        }).
        when('/GPUCauseHist/:id', {
            templateUrl: '/WFM/Views/Get/GPUCauseHist'
        }).
        when('/Login', {
            templateUrl: '/WFM/Views/Get/Login'
        }).
        when('/None', {
            templateUrl: '/WFM/Views/Get/None'
        }).
        otherwise({
            redirectTo: '/'+getDefView()//'/None'
        });
    }

})();

// инициализация breeze
var dataService = new breeze.DataService({
    serviceName: "/WFM/breeze/Model",
    hasServerMetadata: true 
});
var DataQuery = breeze.EntityQuery;
var metadataStore = new breeze.MetadataStore();


// Создать новый котекст для доступа к данным.
function newDataContext() {
    return new breeze.EntityManager({
        dataService: dataService,
        metadataStore: metadataStore
    });
}

// сформировать меню
buildMenu();
function buildMenu() {
    // заполнить меню (пока хардкодим)
    if (authInfo.role == 'admin') {
        var ul = $("<ul></ul>");
        var it1 = $("<li>Admin<ul><li view_name='TagTriggerSet'>Events processing</li><li view_name='EmployeeSet'>GPU operators</li><li view_name='GPUTypicalCauseSet'>GPU stop causes</li></ul></li>");
        var it5 = $("<li view_name='GPUStopSet'>Log of GPU stops</li>");
        var it6 = $("<li view_name='GPUReport'>GPU stops report</li>");
        ul.append(it1);
        ul.append(it5);
        ul.append(it6);
    }
    else
        if (authInfo.role == 'operator') {
            var ul = $("<ul></ul>");
            var it5 = $("<li view_name='GPUStopSet'>Log of GPU stops</li>");
            var it6 = $("<li view_name='GPUReport'>GPU stops report</li>");
            ul.append(it5);
            ul.append(it6);
        }
        else
            if (authInfo.role == 'manager') {
                var ul = $("<ul></ul>");                
                var it6 = $("<li view_name='GPUReport'>GPU stops report</li>");
                ul.append(it6);
            }
    $('#mainMenu').jstree("destroy");

    $('#mainMenu').html("");
    $('#mainMenu').append(ul);
    // создать меню
    
    $('#mainMenu').jstree();
    // обработка выбора пунктов меню: загрузить выбранное представление
    $('#mainMenu').on("changed.jstree", OnMenuItemClick);
}

// Открытие представлений по выбору пунктов меню
function OnMenuItemClick(e, data) {
    if (data.action == "select_node")
        var viewName = $("#" + data.selected[0]).attr("view_name");
    //applyInAngular(getMainController().openView(viewName));
    if (viewName) {
        var scope = angular.element("#viewsArea").scope();
        var cont = angular.element("#viewsArea").controller();
        scope.$apply(cont.openView(viewName));
    }
}


// ------------------  другие глобальные функции ------------------------

// для добавления к дате дней
Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf())

    var hour1 = dat.getHours()
    dat.setTime(dat.getTime() + days * 86400000) // 24*60*60*1000 = 24 hours
    var hour2 = dat.getHours()

    if (hour1 != hour2) // summertime occured +/- a WHOLE number of hours thank god!
        dat.setTime(dat.getTime() + (hour1 - hour2) * 3600000) // 60*60*1000 = 1 hour

    return dat
    or
    this.setTime(dat.getTime()) // to modify the object directly
}


// Возвращает стартовую страницу, которая должна быть открыта после загрузки
function getDefView() {
    if (authInfo.role == 'operator')
        return "GPUStopSet"
    else
        if (authInfo.role == 'manager')
            return "GPUReport";
    return "None";
}

function parseObjId() {
    // число после имени представления
    var s = window.location.href;
    return s.split('/').pop();
}
