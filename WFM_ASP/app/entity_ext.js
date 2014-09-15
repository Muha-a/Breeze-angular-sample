// warning: test constructor cbreeze can fail with unknown error if there is some error in constructor !!!

// Constructors for model objects

// В этом файле описываются контрукторы для объектов модели для того, чтобы добавить методы к объектам.
// В JS конструктор - это функция к которой добавляются методы в поле "prototype".
// После описания конструктор нужно передать в breeze.

function GPUStop() {
}
GPUStop.prototype.getCauseDesc = function () {
    if (this.CauseDoc)
        if (this.CauseDoc.Cause) {
            return this.this.CauseDoc.Cause.Name;
        }
        else
            return "";
};
metadataStore.registerEntityTypeCtor('GPUStop', GPUStop);


function Employee() {
}
Employee.prototype.getFIO = function () {
    return this.Surname + ' ' + this.Name.substr(0, 1) + '.' + this.Patronymic.substr(0, 1) + '.';
}
metadataStore.registerEntityTypeCtor('Employee', Employee);