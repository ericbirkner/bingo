module.exports = {
  module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/bingo/'
      : '/'
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Bingo";
      return args;
    });
  }
};
