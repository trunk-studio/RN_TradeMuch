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

@implementation AppDelegate

- (void)applicationDidBecomeActive:(UIApplication *)application
{
  [FBSDKAppEvents activateApp];
}


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  [Fabric with:@[[Crashlytics class]]];

  /**
   * Loading JavaScript code - uncomment the one you want.
   *
   * OPTION 1
   * Load from development server. Start the server from the repository root:
   *
   * $ npm start
   *
   * To run on device, change `localhost` to the IP address of your computer
   * (you can get this by typing `ifconfig` into the terminal and selecting the
   * `inet` value under `en0:`) and make sure your computer and iOS device are
   * on the same Wi-Fi network.
   */
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
#else
  /**
   * OPTION 2
   * Load from pre-bundled file on disk. To re-generate the static bundle
   * from the root of your project directory, run
   *
   * $ react-native bundle --minify
   *
   * see http://facebook.github.io/react-native/docs/runningondevice.html
   */
   #warning "PROD MODE"
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
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

  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                  didFinishLaunchingWithOptions:launchOptions];
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
