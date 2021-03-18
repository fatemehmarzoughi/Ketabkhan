module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],

    //new line
    plugins: [
      "react-native-classname-to-style",
      ["react-native-platform-specific-extensions", { extensions: ["css", "scss", "sass"] }]
    ],
  };
};
