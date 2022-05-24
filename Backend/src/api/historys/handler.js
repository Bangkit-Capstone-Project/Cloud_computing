const ErrorChecker = require('../../utils/ErrorChecker');

class HistorysHandler {
  constructor(historysService, diseasesService, plantsService, validator) {
    this._historysService = historysService;
    this._diseasesService = diseasesService;
    this._plantsService = plantsService;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.postPredictionHistorysHandler = this.postPredictionHistorysHandler.bind(this);
    this.getPredictionHistoryHandler = this.getPredictionHistoryHandler.bind(this);
    this.getPredictionHistorysByPlantIdHandler = this.getPredictionHistorysByPlantIdHandler.bind(this);
    this.getPredictionHistorysByPlantIdDiseaseIdHandler = this.getPredictionHistorysByPlantIdDiseaseIdHandler.bind(this);
    this.getPredictionHistoryById = this.getPredictionHistoryById.bind(this);
    this.deletePredictionHistoryById = this.deletePredictionHistoryById.bind(this);
  }

  async postPredictionHistorysHandler(request, h) {
    try {
      this._validator.validatePredictionHistorysPayload(request.payload);
      const {
        id: credentialsId
      } = request.auth.credentials;
      const {
        diseaseId,
        plantId,
        accuracy,
        imageUrl
      } = request.payload;

      await this._diseasesService.getDiseaseById(diseaseId);
      await this._plantsService.getPlantById(plantId);
      const predictionHistoryId = await this._historysService.addPredictionHistorys(
                                  plantId, 
                                  diseaseId, 
                                  credentialsId, 
                                  accuracy, 
                                  imageUrl
                                );

      const response = h.response({
        status: 'success',
        message: 'Prediction history berhasil ditambahkan',
        data: {
          predictionHistoryId,
        }
      });
      response.code(201);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async getPredictionHistoryHandler(request, h) {
    try {
      const {
        id: credentialsId
      } = request.auth.credentials;
      const predictionHistorys = await this._historysService.getPredictionHistorys(credentialsId);
      return {
        status: 'success',
        message: 'Prediction history berhasil diambil',
        data: {
          predictionHistorys,
        }
      }
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async getPredictionHistorysByPlantIdHandler(request, h) {
    try {
      const {
        plantsId
      } = request.params;
      const {
        id: credentialsId
      } = request.auth.credentials;
      await this._plantsService.getPlantById(plantsId);
      const predictionHistory = await this._historysService.getPredictionHistorysByPlantId(plantsId, credentialsId);

      return {
        status: 'success',
        message: 'Prediction historys berhasil diambil',
        data: {
          predictionHistory,
        },
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async getPredictionHistorysByPlantIdDiseaseIdHandler(request, h) {
    try {
      const {
        plantsId,
        diseaseId
      } = request.params;
      const {
        id: credentialsId
      } = request.auth.credentials;
      await this._plantsService.getPlantById(plantsId);
      await this._diseasesService.getDiseaseById(diseaseId);
      const predictionHistorys = await this._historysService.getPredictionHistorysByPlantIdDiseaseId(plantsId, diseaseId, credentialsId);

      return {
        status: 'success',
        message: 'Prediction historys berhasil diambil',
        data: {
          predictionHistorys,
        },
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async getPredictionHistoryById(request, h) {
    try {
      const {
        id
      } = request.params;
      const predictionHistory = await this._historysService.getPredictionHistoryById(id);

      return {
        status: 'success',
        message: 'Prediction history berhasil diambil',
        data: {
          predictionHistory,
        },
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async deletePredictionHistoryById(request, h) {
    try {
      const {
        id
      } = request.params;
      const {
        id: credentialsId
      } = request.auth.credentials;

      // await this._historysService.verifyPredictionHistoryOwner(id, credentialsId);
      await this._historysService.deletePredictionHistoryById(id);

      return {
        status: 'success',
        message: 'Prediction history berhasil dihapus',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }
}

module.exports = HistorysHandler;