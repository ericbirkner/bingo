module.exports = {
  publicPath: "/bingo/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Bingo";
      return args;
    });
  }
};
