Breeze-angular-sample
=====================

A sample enterprise web application using ASP.net, EF, BreezeJS, AngularJS.
It's my first experience with this frameworks but it works.

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

MySQL schema name (in web.config): "santa_ef".

The application uses AD authorization.

To start application insert user into MySQL table EmployeeSet: 

INSERT INTO `santa_ef`.`employeeset` (`Surname`, `Name`, `UserName`, `Role`) VALUES ('', '', 'admin', 'admin');

To enable AD authorization set parameter "ADAuth" to "On" in web.config file.


In report view application  tries to retrieve the repoet from the Jasper-server.