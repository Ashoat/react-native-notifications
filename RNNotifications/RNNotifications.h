@import UIKit;

#import <React/RCTBridgeModule.h>
#import <PushKit/PushKit.h>

@interface RNNotifications : NSObject <RCTBridgeModule>

typedef void (^RCTRemoteNotificationCallback)(UIBackgroundFetchResult result);

+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(id)deviceToken;
+ (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error;
+ (void)didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings;
+ (void)didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(NSString *)type;

+ (void)didReceiveRemoteNotification:(NSDictionary *)notification
              fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler;
+ (void)didReceiveLocalNotification:(UILocalNotification *)notification;

+ (void)handleActionWithIdentifier:(NSString *)identifier forRemoteNotification:(NSDictionary *)userInfo withResponseInfo:(NSDictionary *)responseInfo completionHandler:(void (^)())completionHandler;
+ (void)handleActionWithIdentifier:(NSString *)identifier forLocalNotification:(UILocalNotification *)notification withResponseInfo:(NSDictionary *)responseInfo completionHandler:(void (^)())completionHandler;

@end
