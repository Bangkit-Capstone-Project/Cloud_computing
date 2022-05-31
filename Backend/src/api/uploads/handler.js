/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */

const ErrorChecker = require('../../utils/ErrorChecker');


class UploadsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.postUploadPictureHandler = this.postUploadPictureHandler.bind(this);
    this.deletePictureHandler = this.deletePictureHandler.bind(this);
  }

  async postUploadPictureHandler(request, h) {
    try {
      const { data } = request.payload;
      this._validator.validateImageHeaders(data.hapi.headers);

      const fileName = await this._service.writeFile(data, data.hapi);

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl: `https://storage.googleapis.com/tanamin-saved-image/${fileName}`,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async deletePictureHandler(request, h) {
    try {
      const { filename } = request.params;
      await this._service.deleteFile(filename);
      return {
        status: 'success',
        message: 'Gambar berhasil dihapus',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }
}

module.exports = UploadsHandler;
