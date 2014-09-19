Breeze-angular-sample
=====================

A sample enterprise web application using ASP.net, EF, BreezeJS, AngularJS.
It's my first experience with this frameworks but it works. 

Backend:

- MySQL;
- EF code-first;
- Breeze context provider EF6;


Frontend:

- BreezeJS;
- AngularJS;
- Angular UI;
- jsTree;
- Bootstrap, jquery.


VS 2012.

MySQL schema name (in web.config): "santa_ef".

The application uses AD authorization. To enable AD authorization set parameter "ADAuth" to "On" in web.config file.
Default user name: admin.

In report view application tries to retrieve a report from the Jasper-server.
