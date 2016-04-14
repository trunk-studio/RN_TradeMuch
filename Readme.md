# Setup

### install package
```
npm install -g npm # if your npm version < 3
npm install -g rnpm
npm install
sudo gem install cocoapods
pod install
rnpm link react-native-search-bar
rnpm link react-native-linear-gradient
```
### edit config.js in config folder


# Run Project （dev）


npm run dev

open `Counter.xcworkspace` in Xcode and run

##Production Mode

1. edit /config/index.js  envMode = 'production'
2. run project


# 實體 iPhone 開發

### bundle.js

Counter/AppDelegate.m
http://localhost:8081/
改為自己的 localhost IP

### 尚未信任開發人員

[解決方法](http://mdsc3c.blogspot.tw/2015/10/ios-9app.html)
#TroubleShooting

Cannot set property userAgent of #<workernavigator> which has only a getter

> sol: disable debug in chrome

pod install failed: undefined method 'to_ary'

> sol: rvm install 2.2.3 --default  
> sudo gem install cocoapods  
> pod install
