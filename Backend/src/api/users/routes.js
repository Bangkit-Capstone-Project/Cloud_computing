const routes = (handler) => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getUsersByUsernameHandler,
  },
  {
    method: 'PUT',
    path: '/users/{id}/profile-picture',
    handler: handler.updateProfilePictureHandler,
    options: {
      auth: 'songsapp_jwt',
    },
  },
];

module.exports = routes;
