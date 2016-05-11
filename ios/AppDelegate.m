/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <FBSDKCoreKit/FBSDKCoreKit.h>

#import "RCTRootView.h"
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>
#import "ReactNativeAutoUpdater.h"

@interface AppDelegate()
@end

@implementation AppDelegate

- (void)applicationDidBecomeActive:(UIApplication *)application
{
  [FBSDKAppEvents activateApp];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  [Fabric with:@[[Crashlytics class]]];
#if DEBUG
  #warning "DEV MODE"

  #if TARGET_OS_SIMULATOR
    #warning "DEBUG SIMULATOR"
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle?platform=ios"];

  #else
    #warning "DEBUG DEVICE"
    NSString *serverIP = [[NSBundle mainBundle] objectForInfoDictionaryKey:@"SERVER_IP"];
    NSString *jsCodeUrlString = [NSString stringWithFormat:@"http://%@:8081/index.ios.bundle?platform=ios&dev=true", serverIP];
    NSString *jsBundleUrlString = [jsCodeUrlString stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    jsCodeLocation = [NSURL URLWithString:jsBundleUrlString];
  #endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"TradeMuch"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

#else
  #warning "PROD MODE"
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    ReactNativeAutoUpdater* updater = [ReactNativeAutoUpdater sharedInstance];
    [updater setDelegate:self];
    NSURL* defaultMetadataFileLocation = [[NSBundle mainBundle] URLForResource:@"metadata" withExtension:@"json"];
    [updater initializeWithUpdateMetadataUrl:[NSURL URLWithString:@"https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/trademuch/qa/packager/metadata.json"]
                     defaultJSCodeLocation:jsCodeLocation
               defaultMetadataFileLocation:defaultMetadataFileLocation ];
    [updater setHostnameForRelativeDownloadURLs:@"https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/trademuch"];
    [updater checkUpdate];

    NSURL* latestJSCodeLocation = [updater latestJSCodeLocation];

    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    self.window.rootViewController = rootViewController;
    [self createReactRootViewFromURL:latestJSCodeLocation];
    [self.window makeKeyAndVisible];

#endif

  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                  didFinishLaunchingWithOptions:launchOptions];
}

- (void)createReactRootViewFromURL:(NSURL*)url {
  // Make sure this runs on main thread. Apple does not want you to change the UI from background thread.
  dispatch_async(dispatch_get_main_queue(), ^{
    RCTBridge* bridge = [[RCTBridge alloc] initWithBundleURL:url moduleProvider:nil launchOptions:nil];
    RCTRootView* rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"TradeMuch" initialProperties:nil];
    self.window.rootViewController.view = rootView;
  });
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation
{
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation];
}

@end
