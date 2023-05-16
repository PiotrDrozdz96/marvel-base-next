module.exports = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: '/preview/:databaseName/:alias',
        destination: '/preview/:databaseName?alias=:alias',
      },
    ];
  },
};
