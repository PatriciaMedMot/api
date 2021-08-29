const candidatosModel = require('../models/candidatosModel')
function candidatosController() { }


candidatosController.prototype.listar = async (request, response) => {
    await candidatosModel.listar(request, response);
}
candidatosController.prototype.id = async (request, response) => {
    await candidatosModel.id(request, response);
}
candidatosController.prototype.cadastrar = async (request, response) => {
    await candidatosModel.cadastrar(request, response);
}
candidatosController.prototype.editar = async (request, response) => {
    await candidatosModel.editar(request, response);
}
candidatosController.prototype.deletar = async (request, response) => {
    await candidatosModel.deletar(request, response);
}


module.exports = candidatosController;