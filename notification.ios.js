import { NativeModules } from "react-native";

const NativeRNNotifications = NativeModules.RNNotifications; // eslint-disable-line no-unused-vars

export default class IOSNotification {
  _data: Object;
  _alert: string | Object | null | undefined;
  _sound: ?string;
  _badge: ?number;
  _category: ?string;
  _type: ?string; // regular / managed
  _thread: ?string;
  _id: ?string;
  _remoteNotificationCompleteCallbackCalled: boolean;

  constructor(notification: Object) {
    this._data = {};
    this._id = notification.id;
    this._remoteNotificationCompleteCallbackCalled = false;

    if (notification.aps &&
      notification.aps["content-available"] &&
      notification.aps["content-available"] === 1 &&
      !notification.aps.alert &&
      !notification.aps.sound &&
      notification.managedAps) {
      // managed notification
      this._alert = notification.managedAps.alert;
      this._sound = notification.managedAps.sound;
      this._badge = notification.aps.badge;
      this._category = notification.managedAps.category;
      this._type = "managed";
      this._thread = notification.aps["thread-id"];
    } else if (
      notification.aps &&
      notification.aps.alert) {
      // regular notification
      this._alert = notification.aps.alert;
      this._sound = notification.aps.sound;
      this._badge = notification.aps.badge;
      this._category = notification.aps.category;
      this._type = "regular";
      this._thread = notification.aps["thread-id"];
    }

    Object.keys(notification).filter(key => key !== "aps").forEach(key => {
      this._data[key] = notification[key];
    });
  }

  getMessage(): ?string | ?Object {
    return this._alert;
  }

  getSound(): ?string {
    return this._sound;
  }

  getBadgeCount(): ?number {
    return this._badge;
  }

  getCategory(): ?string {
    return this._category;
  }

  getData(): ?Object {
    return this._data;
  }

  getType(): ?string {
    return this._type;
  }

  getThread(): ?string {
    return this._thread;
  }

  finish(fetchResult: string) {
    if (!this._id || this._remoteNotificationCompleteCallbackCalled) {
      return;
    }
    this._remoteNotificationCompleteCallbackCalled = true;

    NativeRNNotifications.completeNotif(this._id, fetchResult);
  }
}
