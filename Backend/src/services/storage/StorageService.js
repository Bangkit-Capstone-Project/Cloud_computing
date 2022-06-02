const {Storage} = require('@google-cloud/storage');
const NotFoundError = require('../../exceptions/NotFoundError');

class StorageService {
  constructor() {
    const serviceAccount = require('./tanamin-68de16fa8772.json');
    const storage = new Storage({
      keyFile: serviceAccount,
      projectId: 'tanamin',
    });

    this._bucket = storage.bucket("tanamin-saved-image");
  }

  async writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    await this._bucket.file(filename).save(file._data);

    return filename;
  }

  async deleteFile(filename) {
    try {
      await this._bucket.file(filename).delete();
    } catch (error) {
      if (error.code === 404) {
        throw new NotFoundError('File tidak ditemukan');
      }
      throw error;
    }
  }
}

module.exports = StorageService;
