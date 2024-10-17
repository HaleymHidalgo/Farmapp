import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Farmapp',
  webDir: 'www',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    LocalNotifications: {
      smallIcon: 'res://drawable/farmapp_icon',
      iconColor: '#4C9BA2',
      sound: 'beep.wav',
    },
  }
};

export default config;
