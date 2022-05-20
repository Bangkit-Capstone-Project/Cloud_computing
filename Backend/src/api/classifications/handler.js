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
      const { data } = request.payload;
      this._validator.validateClassificationPayload(data.hapi.headers);

      const result = await this._service.getClassification(data, data.hapi);

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