npm install -g gulp
npm install -g typings
npm install -g typescript cordova phonegap ionic
npm install -g typescript
npm install -g cordova
npm install -g phonegap
npm install -g ionic
npm install -g @ionic/cli-plugin-proxy
npm rebuild node-sass

ionic info

git clone https://github.com/kwokhung/smartHome.git

ionic start smartHome blank
npm install --save-dev --save-exact typescript@latest
npm install --save-dev --save-exact ionic@latest
npm install --save-dev --save-exact @ionic/app-scripts@latest
npm install --save-dev --save-exact @ionic/app-scripts@1.3.12
npm install --save-dev --save-exact @ionic/cli-plugin-cordova@latest
npm uninstall --save-dev --save-exact @ionic/cli-plugin-cordova
npm install --save-dev --save-exact @ionic/cli-plugin-ionic-angular@latest
npm uninstall --save-dev --save-exact @ionic/cli-plugin-ionic-angular
npm install --save ng2-mqtt
ionic serve

ionic login
ionic link
ionic upload

ionic g page home
ionic g page led
ionic g page scan
ionic g page bluetooth
ionic g page speech
ionic g page tts
ionic g page config
ionic g page ble
ionic g page bleScan
ionic g page bleConnect
ionic g page bleConnectDetails
ionic g page bleLight
ionic g page bleLightDetails
ionic g page bleButton
ionic g page bleButtonDetails
ionic g page bleThermo
ionic g page bleThermoDetails
ionic g provider logger
ionic g provider mqtt

ionic cordova platform add android
ionic cordova build android --prod --release

phonegap remote login
phonegap remote build android

# barcode scanner
ionic cordova plugin add phonegap-plugin-barcodescanner
npm install --save @ionic-native/barcode-scanner
npm install @ionic-native/core --save

# bluetooth
ionic cordova plugin add cordova-plugin-bluetooth-serial
npm install --save @ionic-native/bluetooth-serial

# tts
ionic cordova plugin add cordova-plugin-tts
npm install --save @ionic-native/text-to-speech

# speech
ionic cordova plugin add cordova-plugin-speechrecognition
npm install --save @ionic-native/speech-recognition

# fcm
ionic cordova plugin add cordova-plugin-fcm
npm install --save @ionic-native/fcm

# ble
ionic cordova plugin add cordova-plugin-ble-central
npm install --save @ionic-native/ble

ionic cordova platform update android
ionic cordova build android

ionic cordova platform add browser --save
ionic cordova build browser
ionic cordova run browser
ionic cordova run browser --prod

# Global
npm install -g typescript
npm install -g cordova
npm install -g phonegap
npm install -g ionic
npm install -g @ionic/cli-plugin-proxy

# Tools
npm install --save-dev --save-exact typescript@latest
npm install --save-dev --save-exact ionic@latest
#npm i -D -E ionic@latest
#npm i --save -E ionic@3.19.1
npm install --save-dev --save-exact @ionic/app-scripts@latest

# Rebuild
npm rebuild node-sass

npm install -g ionic@latest
npm install ionic-angular@3.7.0 --save
npm install @ionic/app-scripts@3.0.0 --save-dev
npm install @angular/core@4.4.3 --save
npm install @angular/common@4.4.3 --save
npm install @angular/compiler@4.4.3 --save
npm install @angular/compiler-cli@4.4.3 --save
npm install @angular/forms@4.4.3 --save
npm install @angular/http@4.4.3 --save
npm install @angular/platform-browser@4.4.3 --save
npm install @angular/platform-browser-dynamic@4.4.3 --save
npm install rxjs@5.4.3 --save
npm install zone.js@0.8.17 --save
npm rebuild node-sass

ionic cordova plugin rm cordova-plugin-WKWebView-engine
ionic cordova plugin add cordova-plugin-ionic-webview --save
