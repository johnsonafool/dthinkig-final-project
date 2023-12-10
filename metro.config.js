// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = async () => {
//   await getDefaultConfig(__dirname, {
//     // [Web-only]: Enables CSS support in Metro.
//     isCSSEnabled: true,
//   });

//   return {
//     transformer: {
//       babelTransformerPath: require.resolve("react-native-svg-transformer"),
//     },
//     resolver: {
//       assetExts: assetExts.filter((ext) => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"],
//     },
//   };
// };

// module.exports = config;

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig(__dirname, {
    // [Web-only]: Enables CSS support in Metro.
    isCSSEnabled: true,
  });
  return {
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      assetExts: assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...sourceExts, "svg"],
    },
  };
})();
