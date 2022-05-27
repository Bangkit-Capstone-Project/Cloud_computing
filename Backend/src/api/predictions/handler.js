const ErrorChecker = require('../../utils/ErrorChecker');

class PredictionsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.getRicePredictionHandler = this.getRicePredictionHandler.bind(this);
    this.getCassavaPredictionHandler = this.getCassavaPredictionHandler.bind(this);
  }

  async getRicePredictionHandler(request, h) {
    try {
      const { data } = request.payload;
      this._validator.validatePredictionPayload(request.payload);

      const result = await this._service.getRicePrediction(request.payload);

      const response = h.response({
        status: 'success',
        message: 'Gambar padi berhasil diprediksi',
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

  async getCassavaPredictionHandler(request, h) {
    try {
      const { data } = request.payload;
      this._validator.validatePredictionPayload(data.hapi.headers);

      const result = await this._service.getCassavaPrediction(data, data.hapi);

      const response = h.response({
        status: 'success',
        message: 'Gambar cassava berhasil diprediksi',
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

module.exports = PredictionsHandler;