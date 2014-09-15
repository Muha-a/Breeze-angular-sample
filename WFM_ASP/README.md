Breeze-angular-sample
=====================

A sample enterprise web application using ASP.net, EF, BreezeJS, AngularJS.
It's my first experience but it works.

Backend:

- MySQL;
- EF model-first;
- Breeze context provider EF6;


Frontend:

- BreezeJS;
- AngularJS;
- Angular UI;
- jsTree;
- Bootstrap, jquery.


VS 2012.

UI and comments language: russian.


Default MySQL schema: "santa_ef".


The application uses AD authorization.

To start application insert user into MySQL table EmployeeSet: 

INSERT INTO `santa_ef`.`employeeset` (`Surname`, `Name`, `UserName`, `Role`) VALUES ('', '', 'admin', 'admin');

To enable AD authorization set parameter "ADAuth" to "On" in web.config file.


The report an application tries to retrieve from the Jasper-server.