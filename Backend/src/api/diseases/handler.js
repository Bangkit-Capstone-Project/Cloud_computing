const ErrorChecker = require('../../utils/ErrorChecker');

class DiseasesHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.getDiseasesHandler = this.getDiseasesHandler.bind(this);
    this.getDiseaseByIdHandler = this.getDiseaseByIdHandler.bind(this);
    this.postDiseaseHandler = this.postDiseaseHandler.bind(this);
    this.putDiseaseByIdHandler = this.putDiseaseByIdHandler.bind(this);
    this.deleteDiseaseByIdHandler = this.deleteDiseaseByIdHandler.bind(this);

  }

  async getDiseasesHandler() {
    const diseases = await this._service.getDiseases();
    return {
      status: 'success',
      data: {
        diseases,
      },
    };
  }

  async getDiseaseByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const disease = await this._service.getDiseaseById(id);

      const response = h.response({
        status: 'success',
        data: {
          disease,
        }
      });

      response.code(200);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async postDiseaseHandler(request, h) {
    try {
      this._validator.validateDiseasePayload(request.payload);

      const { name, description, imageUrl } = request.payload;
      const diseaseId = await this._service.addDisease({ name, description, imageUrl });

      const response = h.response({
        status: 'success',
        message: 'Disease berhasil ditambahkan',
        data: {
          diseaseId,
        }
      });

      response.code(201);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async putDiseaseByIdHandler(request, h) {
    try {
      const { id } = request.params;
      this._validator.validateDiseasePayload(request.payload);

      await this._service.editDiseaseById(id, request.payload);
      return {
        status: 'success',
        message: 'Disease berhasil diubah',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }
  
  async deleteDiseaseByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteDiseaseById(id);
      return {
        status: 'success',
        message: 'Disease berhasil dihapus',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

}

module.exports = DiseasesHandler;