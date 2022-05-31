const routes = (handler) => [
  {
    method: 'POST',
    path: '/upload/pictures',
    handler: handler.postUploadPictureHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 10000000,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/upload/pictures/{filename}',
    handler: handler.deletePictureHandler,
  },
];

module.exports = routes;
