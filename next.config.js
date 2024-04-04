/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires

const appEnv = process.env.APP_ENV || 'dev';
const version = process.env.VERSION || '0.1.0';

const API_MAIN_GW = {
  dev: '',
  staging: '',
  production: '',
};

const WSS_URL_CHECK_USER = {
  dev: '',
  staging: '',
  production: '',
};

const WSS_URL_NOTIFICATION = {
  dev: '',
  staging: '',
  production: '',
};

const env = {
  VERSION: version,
  APP_ENV: appEnv,
  API_MAIN_GW: API_MAIN_GW[appEnv],
  WSS_URL_CHECK_USER: WSS_URL_CHECK_USER[appEnv],
  WSS_URL_NOTIFICATION: WSS_URL_NOTIFICATION[appEnv],
};

const nextConfig = {
  reactStrictMode: false,
  env,
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [{ name: 'removeViewBox', active: false }],
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
