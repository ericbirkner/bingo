module.exports = {
  publicPath: process.env.NODE_ENV === 'production' 
    ? '/bingo/' // Cambia 'bingo' por el nombre de tu repo si es diferente
    : '/',

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
