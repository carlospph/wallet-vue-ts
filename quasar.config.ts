// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from "#q-app";

export default defineConfig((/* ctx */) => {
  return {

    boot: [],

    css: ["app.scss"],

    extras: [

      "roboto-font", // optional, you are not bound to it
      "material-icons" // optional, you are not bound to it
    ],

    build: {
      target: {
      },

      typescript: {
        strict: true,
        vueShim: true
      },

      filenameBasedRouting: true,

      vueRouterMode: "hash" // available values: 'hash', 'history'

    },

    devServer: {
      open: true // opens browser window automatically
    },

    framework: {
      config: {},


      plugins: ['Notify', 'Dialog'],
    },

    animations: [],



     ssr: {

      prodPort: 3000,
      middlewares: [
        "render" // keep this as last one
      ]


    },

     ssg: {

    },

     pwa: {
      workboxMode: "GenerateSW" // 'GenerateSW' or 'InjectManifest'

    },

     cordova: {},

     capacitor: {
      hideSplashscreen: true
    },

     electron: {


      preloadScripts: ["electron-preload"],

      inspectPort: 5858,

      bundler: "packager", // 'packager' or 'builder'

      packager: {

      },

      builder: {

        appId: ""
      }
    },

     bex: {

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: []
    }
  };
});
