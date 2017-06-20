npm install –g gulp
npm install –g typings
npm install -g typescript
npm install -g cordova
npm install -g phonegap
npm install -g ionic
npm install -g typescript cordova phonegap ionic
npm rebuild node-sass

ionic info

git clone https://github.com/kwokhung/smartHome.git

ionic start smartHome blank
npm install --save-dev typescript @ionic/cli-plugin-ionic-angular @ionic/cli-plugin-cordova
npm install --save ng2-mqtt
ionic serve

ionic login
ionic link
ionic upload

ionic g page home
ionic g page led
ionic g page scan
ionic g page bluetooth
ionic g page tts
ionic g page speech
ionic g provider logger

ionic cordova platform add android
ionic cordova build android --prod --release

phonegap remote login
phonegap remote build android

# barcode scanner
ionic cordova plugin add phonegap-plugin-barcodescanner
npm install --save @ionic-native/barcode-scanner
npm install @ionic-native/core --save
cordova platform update android

# bluetooth
ionic cordova plugin add cordova-plugin-bluetooth-serial
npm install --save @ionic-native/bluetooth-serial

# tts
ionic cordova plugin add cordova-plugin-tts
npm install --save @ionic-native/text-to-speech

ionic cordova platform add browser --save
ionic cordova build browser
ionic cordova run browser
ionic cordova run browser --prod