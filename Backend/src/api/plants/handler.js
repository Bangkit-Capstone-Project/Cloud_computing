const ErrorChecker = require('../../utils/ErrorChecker');

class PlantsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.getPlantsHandler = this.getPlantsHandler.bind(this);
    this.getPlantByIdHandler = this.getPlantByIdHandler.bind(this);
    this.postPlantHandler = this.postPlantHandler.bind(this);
    this.putPlantByIdHandler = this.putPlantByIdHandler.bind(this);
    this.deletePlantByIdHandler = this.deletePlantByIdHandler.bind(this);
  }

  async getPlantsHandler() {
    const plants = await this._service.getPlants();
    return {
      status: 'success',
      data: {
        plants,
      },
    };
  }

  async getPlantByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const plant = await this._service.getPlantById(id);

      const response = h.response({
        status: 'success',
        data: {
         plant,
        }
      });

      response.code(200);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async postPlantHandler(request, h) {
    try {
      this._validator.validatePlantPayload(request.payload);

      const { name, description, imageUrl } = request.payload;
      const plantId = await this._service.addPlant({ name, description, imageUrl });

      const response = h.response({
        status: 'success',
        message: 'Disease berhasil ditambahkan',
        data: {
          plantId,
        }
      });

      response.code(201);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async putPlantByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._validator.validatePlantPayload(request.payload);

      await this._service.editPlantById(id, request.payload);
      return {
        status: 'success',
        message: 'Plant berhasil diubah',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }
  
  async deletePlantByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deletePlantById(id);
      return {
        status: 'success',
        message: 'Plant berhasil dihapus',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

}

module.exports = PlantsHandler;