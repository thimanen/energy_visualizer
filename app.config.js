import 'dotenv/config'

export default {
  expo: {
    name: 'EFlowViz',
    slug: 'energy_visualizer',
    version: '1.0.0',
    platforms: ['android'],
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.thimanen.energyvisualizer',
      usesCleartextTraffic: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: 'f4a4ff4d-0d2c-4813-81ac-4bb623f95d52',
      },
      server_uri: process.env.SERVER_URI,
    },
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],
  },
}
