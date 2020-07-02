const path = require('path');

module.exports = ({
  publicRuntimeConfig: {
    ENV: process.env.ENV || 'dev',
    REACT_APP_ROOT: {
      dev: 'http://app.peelinsights.com/api',
      qa: 'http://app.peelinsights.com/api',
      prod: 'http://app.peelinsights.com/api'
    },
  },
  webpack: (config) => {
    config.resolve.mainFields = ['main', 'browser', 'module']
    config.resolve.alias = {
      ...config.resolve.alias,
      '@actions': path.resolve(__dirname, 'src/redux/actions'),
      '@reducers': path.resolve(__dirname, 'src/redux/reducers'),
      '@store': path.resolve(__dirname, 'src/redux/store'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
    };

    return config;
  },
});
