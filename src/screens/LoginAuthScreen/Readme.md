# FingerPrint

#### 패키지 설치

---

    npm install react-native-fingerprint-scanner --save

or
yarn add react-native-fingerprint-scanner

_Github : https://github.com/hieuvp/react-native-fingerprint-scanner_

#### 추가설정

---

> **android**

1. `node_modules/react-native-fingerprint-scanner/android/build.gradle` 수정

    "`compile`" => "`implementation`" 으로 전부변경

    ex)


    	compile 'com.facebook.react:react-native:+' =>
    	implementation 'com.facebook.react:react-native:+'

2.  `AndroidMnifest.xml` 접근권한 추가

        <uses-permission android:name="android.permission.USE_BIOMETRIC" />

3) `android/settings.gradle` 설정추가 (RN < 0.60)


    	include ':react-native-fingerprint-scanner'
    	project(':react-native-fingerprint-scanner').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fingerprint-scanner/android')

4.  `android/app/build.gradle` 설정추가 (RN < 0.60)

        compile project(':react-native-fingerprint-scanner')

> **iOS ( 테스트 필요 )**

---

# PIN Number

#### 패키지 설치

---

    npm install react-native-pins --save
    npm install react-native-screen-keyboard --save

or
yarn add react-native-pins
yarn add react-native-screen-keyboard

_Site : https://www.npmjs.com/package/react-native-pins_
_Site : https://www.npmjs.com/package/react-native-screen-keyboard_
