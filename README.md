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



The application uses AD authorization.

To start application commentout 

1. comment out condition "if (Membership.ValidateUser(parameters.user, parameters.password))" in LoginController.cs;

2. insert user into table EmployeeSet: INSERT INTO `santa_ef`.`employeeset` (`Surname`, `Name`, `UserName`, `Role`) VALUES ('', '', 'admin', 'admin');
