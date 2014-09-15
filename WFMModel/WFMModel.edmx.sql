



-- -----------------------------------------------------------
-- Entity Designer DDL Script for MySQL Server 4.1 and higher
-- -----------------------------------------------------------
-- Date Created: 09/15/2014 22:44:07
-- Generated from EDMX file: D:\Programs\ba_sample\WFMModel\WFMModel.edmx
-- Target version: 2.0.0.0
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- NOTE: if the constraint does not exist, an ignorable error will be reported.
-- --------------------------------------------------

--    ALTER TABLE `GPUCauseSet` DROP CONSTRAINT `FK_EmployeeGPUCause`;
--    ALTER TABLE `GPUCauseSet` DROP CONSTRAINT `FK_GPUTypicalCauseGPUCause`;
--    ALTER TABLE `GPUStopSet` DROP CONSTRAINT `FK_GPUCauseGPUStop`;
--    ALTER TABLE `GPUCauseSet` DROP CONSTRAINT `FK_GPUCauseGPUCause`;

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------
SET foreign_key_checks = 0;
    DROP TABLE IF EXISTS `TagTriggerSet`;
    DROP TABLE IF EXISTS `GPUTypicalCauseSet`;
    DROP TABLE IF EXISTS `EmployeeSet`;
    DROP TABLE IF EXISTS `GPUCauseSet`;
    DROP TABLE IF EXISTS `GPUStopSet`;
SET foreign_key_checks = 1;

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

CREATE TABLE `TagTriggerSet`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`CondExpression` longtext, 
	`Pause` int, 
	`ObjName` char (100), 
	`DocClass` char (80), 
	`DocContent` longtext);

ALTER TABLE `TagTriggerSet` ADD PRIMARY KEY (Id);




CREATE TABLE `GPUTypicalCauseSet`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Name` varchar (100), 
	`Comment` varchar (100), 
	`IsFailure` bool NOT NULL);

ALTER TABLE `GPUTypicalCauseSet` ADD PRIMARY KEY (Id);




CREATE TABLE `EmployeeSet`(
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`Surname` varchar (60), 
	`Name` varchar (60), 
	`Patronymic` varchar (60), 
	`UserName` varchar (70), 
	`Role` varchar (40));

ALTER TABLE `EmployeeSet` ADD PRIMARY KEY (Id);




CREATE TABLE `GPUCauseSet`(
	`Comment` longtext, 
	`RestartTime` datetime, 
	`EmployeeId` int, 
	`GPUTypicalCauseId` int, 
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`ReplacedDoc` int NOT NULL, 
	`GPUCauseId` int, 
	`Work` longtext, 
	`CreationTime` datetime);

ALTER TABLE `GPUCauseSet` ADD PRIMARY KEY (Id);




CREATE TABLE `GPUStopSet`(
	`ObjName` varchar (100), 
	`EventTime` datetime, 
	`RevocationTime` datetime, 
	`Id` int NOT NULL AUTO_INCREMENT UNIQUE, 
	`GPUCauseId` int);

ALTER TABLE `GPUStopSet` ADD PRIMARY KEY (Id);






-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on `EmployeeId` in table 'GPUCauseSet'

ALTER TABLE `GPUCauseSet`
ADD CONSTRAINT `FK_EmployeeGPUCause`
    FOREIGN KEY (`EmployeeId`)
    REFERENCES `EmployeeSet`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_EmployeeGPUCause'

CREATE INDEX `IX_FK_EmployeeGPUCause` 
    ON `GPUCauseSet`
    (`EmployeeId`);

-- Creating foreign key on `GPUTypicalCauseId` in table 'GPUCauseSet'

ALTER TABLE `GPUCauseSet`
ADD CONSTRAINT `FK_GPUTypicalCauseGPUCause`
    FOREIGN KEY (`GPUTypicalCauseId`)
    REFERENCES `GPUTypicalCauseSet`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_GPUTypicalCauseGPUCause'

CREATE INDEX `IX_FK_GPUTypicalCauseGPUCause` 
    ON `GPUCauseSet`
    (`GPUTypicalCauseId`);

-- Creating foreign key on `GPUCauseId` in table 'GPUStopSet'

ALTER TABLE `GPUStopSet`
ADD CONSTRAINT `FK_GPUCauseGPUStop`
    FOREIGN KEY (`GPUCauseId`)
    REFERENCES `GPUCauseSet`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_GPUCauseGPUStop'

CREATE INDEX `IX_FK_GPUCauseGPUStop` 
    ON `GPUStopSet`
    (`GPUCauseId`);

-- Creating foreign key on `GPUCauseId` in table 'GPUCauseSet'

ALTER TABLE `GPUCauseSet`
ADD CONSTRAINT `FK_GPUCauseGPUCause`
    FOREIGN KEY (`GPUCauseId`)
    REFERENCES `GPUCauseSet`
        (`Id`)
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Creating non-clustered index for FOREIGN KEY 'FK_GPUCauseGPUCause'

CREATE INDEX `IX_FK_GPUCauseGPUCause` 
    ON `GPUCauseSet`
    (`GPUCauseId`);

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------
