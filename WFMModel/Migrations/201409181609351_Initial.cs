namespace WFMModel.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Employee",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Surname = c.String(unicode: false),
                        Name = c.String(unicode: false),
                        Patronymic = c.String(unicode: false),
                        UserName = c.String(unicode: false),
                        Role = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.GPUCause",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Comment = c.String(unicode: false),
                        RestartTime = c.DateTime(precision: 0),
                        Work = c.String(unicode: false),
                        CreationTime = c.DateTime(precision: 0),
                        EmployeeID = c.Int(),
                        CauseID = c.Int(),
                        ReplacesID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.GPUTypicalCause", t => t.CauseID)
                .ForeignKey("dbo.Employee", t => t.EmployeeID)
                .ForeignKey("dbo.GPUCause", t => t.ReplacesID)
                .Index(t => t.EmployeeID)
                .Index(t => t.CauseID)
                .Index(t => t.ReplacesID);
            
            CreateTable(
                "dbo.GPUTypicalCause",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(unicode: false),
                        Comment = c.String(unicode: false),
                        IsFailure = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.GPUStop",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ObjName = c.String(unicode: false),
                        EventTime = c.DateTime(precision: 0),
                        RevocationTime = c.DateTime(precision: 0),
                        GPUCauseId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.GPUCause", t => t.GPUCauseId)
                .Index(t => t.GPUCauseId);
            
            CreateTable(
                "dbo.TagTrigger",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CondExpression = c.String(unicode: false),
                        Pause = c.Int(),
                        ObjName = c.String(unicode: false),
                        DocClass = c.String(unicode: false),
                        DocContent = c.String(unicode: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.GPUStop", "GPUCauseId", "dbo.GPUCause");
            DropForeignKey("dbo.GPUCause", "ReplacesID", "dbo.GPUCause");
            DropForeignKey("dbo.GPUCause", "EmployeeID", "dbo.Employee");
            DropForeignKey("dbo.GPUCause", "CauseID", "dbo.GPUTypicalCause");
            DropIndex("dbo.GPUStop", new[] { "GPUCauseId" });
            DropIndex("dbo.GPUCause", new[] { "ReplacesID" });
            DropIndex("dbo.GPUCause", new[] { "CauseID" });
            DropIndex("dbo.GPUCause", new[] { "EmployeeID" });
            DropTable("dbo.TagTrigger");
            DropTable("dbo.GPUStop");
            DropTable("dbo.GPUTypicalCause");
            DropTable("dbo.GPUCause");
            DropTable("dbo.Employee");
        }
    }
}
