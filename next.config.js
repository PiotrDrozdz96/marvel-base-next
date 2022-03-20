module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/preview/:databaseName/:alias',
        destination: '/preview/:databaseName?alias=:alias',
      },
    ];
  },
};
