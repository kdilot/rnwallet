
# Qr Code (Scanner)


#### 패키지 설치
---
  

	 npm install react-native-camera@git+https://git@github.com/react-native-community/react-native-camera.git --save
	 npm install react-native-qrcode-scanner --save
	 npm install react-native-permissions --save
or
			
	 yarn add react-native-camera@git+https://git@github.com/react-native-community/react-native-camera.git
	 yarn add react-native-qrcode-scanner
	 yarn add react-native-permissions

*Github : https://github.com/moaazsidat/react-native-qrcode-scanner*

  
 
#### 추가설정
---

> **android**

1. `AndroidMnifest.xml` 접근권한 추가

		<uses-permission  android:name="android.permission.VIBRATE"/>
		<uses-permission  android:name="android.permission.CAMERA"/> 

2. `android/app/build.gradle`  설정 추가

		defaultConfig {
			...
			missingDimensionStrategy 'react-native-camera', 'general'
			missingDimensionStrategy 'react-native-camera', 'mlkit'
			...
		}


> **iOS ( 테스트 필요 )**