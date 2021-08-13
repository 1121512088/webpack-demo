const environment = {
  development: {
    protocol: 'http', // 协议
    host: '192.168.101.84:8000',
    authPrefix: 'Token'
  },
  production: {
    protocol: 'http',
    host: '',
    authPrefix: 'Token',
  },
  testServer: {
    protocol: 'http',
    host: '',
    authPrefix: 'Token',
  },
}[process.env.NODE_ENV || 'development'];

const getHostApi = () => {
  return `${environment.protocol}://${environment.host}/v1`;
};

const getHostUrl = () => {
  return `${environment.protocol}://${environment.host}`;
};

const getWebscoketHost = () => {
  return `ws://${environment.host || window.location.host}`;
};

const config = {
  ...environment,
  getHostApi: getHostApi(),
  getHostUrl: getHostUrl(),
  getWebscoketHost: getWebscoketHost(),
};

export default config;
