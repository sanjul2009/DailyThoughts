import * as utils from 'tns-core-modules/utils/utils';

export function getResource(name: string, folder?: string): { id: string, uri: android.net.Uri } {
  const context = utils.ad.getApplicationContext();
  const packageName = context.getPackageName();
  const id = context.getResources().getIdentifier(name, folder || 'raw', packageName);
  const uri = android.net.Uri.parse(`${android.content.ContentResolver.SCHEME_ANDROID_RESOURCE}://${packageName}/${id}`);
  return { id, uri };
}

export function createNotificationChannel(channel: { id: string, name: string, description: string, soundFilename: string }) {
  const ANDROID_OREO_SDK_VERSION = 26;
  if (android.os.Build.VERSION.SDK_INT >= ANDROID_OREO_SDK_VERSION) {
    const notificationChannel = new android.app.NotificationChannel(channel.id, channel.name, android.app.NotificationManager.IMPORTANCE_HIGH);
    notificationChannel.setDescription(channel.description);
    if (channel.soundFilename) {
      const audioAttributes = new android.media.AudioAttributes.Builder()
        .setContentType(android.media.AudioAttributes.CONTENT_TYPE_SPEECH)
        .setUsage(android.media.AudioAttributes.USAGE_NOTIFICATION)
        .build();
      notificationChannel.setSound(getResource(channel.soundFilename).uri, audioAttributes);
    }
    const context = utils.ad.getApplicationContext();
    const notificationManager = context.getSystemService(android.app.NotificationManager.class);
    notificationManager.createNotificationChannel(notificationChannel);
  }
}