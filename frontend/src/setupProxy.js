const {createProxyMiddleware} = require('http-proxy-middleware');

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // Update the target to point to the backend container's hostname within Docker network
      target: 'http://cleowoman/backend:4000', // Replace 'backend-container-name' with the actual name of your backend container
      changeOrigin: true,
    }),
  );
};


// module.exports = function (app) {
//   app.use(
//     '/api',
//     createProxyMiddleware({
//       // 👇️ make sure to update your target
//       target: 'http://localhost:4000',
//       changeOrigin: true,
//     }),
//   );
// };
