const ErrorChecker = require('../../utils/ErrorChecker');

class PredictionsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.getRicePredictionHandler = this.getRicePredictionHandler.bind(this);
    this.getCassavaPredictionHandler = this.getCassavaPredictionHandler.bind(this);
    this.getTomatoPredictionHandler = this.getTomatoPredictionHandler.bind(this);
  }

  async getRicePredictionHandler(request, h) {
    try {
      const { data } = request.payload;
      this._validator.validatePredictionPayload(request.payload);

      const {
        id: credentialsId
      } = request.auth.credentials;

      const result = await this._service.getRicePrediction(request.payload, credentialsId);

      const response = h.response({
        status: 'success',
        message: 'Gambar daun padi berhasil diprediksi',
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
      this._validator.validatePredictionPayload(request.payload);

      const {
        id: credentialsId
      } = request.auth.credentials;

      const result = await this._service.getCassavaPrediction(request.payload, credentialsId);

      const response = h.response({
        status: 'success',
        message: 'Gambar daun singkong berhasil diprediksi',
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

  async getTomatoPredictionHandler(request, h) {
    try {
      const { data } = request.payload;
      this._validator.validatePredictionPayload(request.payload);

      const {
        id: credentialsId
      } = request.auth.credentials;

      const result = await this._service.getTomatoPrediction(request.payload, credentialsId);

      const response = h.response({
        status: 'success',
        message: 'Gambar daun tomat berhasil diprediksi',
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