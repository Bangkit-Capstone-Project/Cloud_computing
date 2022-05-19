/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const ClientError = require('../../exceptions/ClientError');
const ErrorChecker = require('../../utils/ErrorChecker');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this._errorCheck = ErrorChecker;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.getUsersByUsernameHandler = this.getUsersByUsernameHandler.bind(this);
    this.updateProfilePictureHandler = this.updateProfilePictureHandler.bind(this);
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);

      const {
        email, username, password, fullname, profilPicture,
      } = request.payload;

      const userId = await this._service.addUser({
        email, username, password, fullname, profilPicture,
      });

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });

      response.code(201);
      return response;
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async updateProfilePictureHandler(request, h) {
    try {
      this._validator.validateUpdateProfilePayload(request.payload);
      const { profilPicture } = request.payload;
      const { id: userId } = request.auth.credentials;

      await this._service.updateProfilePicture(profilPicture, userId);
      return {
        status: 'success',
        message: 'Profile picture berhasil diperbarui',
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async getUserByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const user = await this._service.getUserById(id);

      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }

  async getUsersByUsernameHandler(request, h) {
    try {
      const { username = '' } = request.query;
      const user = await this._service.getUsersByUsername(username);
      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (error) {
      return this._errorCheck.errorHandler(h, error);
    }
  }
}

module.exports = UsersHandler;
