module.exports = {
  publicPath: "",

  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Bienvenido a Lota";
      return args;
    });
  },

  pluginOptions: {
    cordovaPath: "src-cordova"
  }
};
