import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/plugin-notification"
import nSong from "../static/notification.mp3"
const notifySong = new Audio(nSong)

export async function notify(description: string) {
  // Do you have permission to send a notification?
  let permissionGranted = await isPermissionGranted()

  // If not we need to request it
  if (!permissionGranted) {
    const permission = await requestPermission()
    permissionGranted = permission === "granted"
  }

  // Once permission has been granted we can send the notification
  if (permissionGranted) {
    sendNotification({ title: "Focus", body: description, icon: "./icon.png" })
    notifySong.play()
  }
}
