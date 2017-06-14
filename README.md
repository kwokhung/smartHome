npm install –g gulp
npm install –g typings
npm install -g typescript
npm install -g cordova
npm install -g phonegap
npm install -g ionic

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

ionic cordova platform add android
ionic cordova build android --prod --release

phonegap remote login
phonegap remote build android

# barcode scanner
ionic cordova plugin add phonegap-plugin-barcodescanner
npm install --save @ionic-native/barcode-scanner
npm install @ionic-native/core --save
cordova platform update android