const ErrorChecker = require('../../utils/ErrorChecker');

class VegetablesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.getVegetablesHandler = this.getVegetablesHandler.bind(this);
    this.getVegetableByIdHandler = this.getVegetableByIdHandler.bind(this);
    this.postVegetableHandler = this.postVegetableHandler.bind(this);
    this.putVegetableByIdHandler = this.putVegetableByIdHandler.bind(this);
    this.deleteVegetableByIdHandler = this.deleteVegetableByIdHandler.bind(this);
  }

  async getVegetablesHandler() {
    const vegetables = await this._service.getVegetables();
    return {
      status: 'success',
      data: {
        vegetables,
      },
    };
  }

  async getVegetableByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const vegetable = await this._service.getVegetableById(id);

      const response = h.response({
        status: 'success',
        data: {
          vegetable,
        }
      });

      response.code(200);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async postVegetableHandler(request, h) {
    try {
      this._validator.validateVegetablePayload(request.payload);

      const { name, description, imageUrl } = request.payload;
      const vegetableId = await this._service.addVegetable({ name, description, imageUrl });

      const response = h.response({
        status: 'success',
        message: 'Vegetable berhasil ditambahkan',
        data: {
          vegetableId,
        }
      });

      response.code(201);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async putVegetableByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._validator.validateVegetablePayload(request.payload);

      await this._service.editVegetableById(id, request.payload);
      return {
        status: 'success',
        message: 'Vegetable berhasil diubah',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }
  
  async deleteVegetableByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteVegetableById(id);
      return {
        status: 'success',
        message: 'Vegetable berhasil dihapus',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

}

module.exports = VegetablesHandler;