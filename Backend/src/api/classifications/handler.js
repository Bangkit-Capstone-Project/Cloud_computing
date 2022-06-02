const ErrorChecker = require('../../utils/ErrorChecker');

class ClassificationHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.getClassificationHandler = this.getClassificationHandler.bind(this);
  }

  async getClassificationHandler(request, h) {
    try {
      this._validator.validateClassificationPayload(request.payload);

      const {
        id: credentialsId
      } = request.auth.credentials;

      const result = await this._service.getVegetableClassification(request.payload, credentialsId);

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diklasifikasi',
        data: {
          result,
        }
      });

      response.code(200);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }
}

module.exports = ClassificationHandler;