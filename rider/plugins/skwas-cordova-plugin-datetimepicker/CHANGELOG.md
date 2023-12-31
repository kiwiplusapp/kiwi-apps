
# Changelog

Changelog for [skwas-cordova-plugin-datetimepicker](./README.md).

## 2.0.1

### Fixes

- fix: Lower API level 26 requirement introduced in v2.0.0 down to API level 19.

## 2.0.0

### New

- Add support to hide the picker from code
- Android: add support for `allowFutureDates`/`allowOldDates`

### Fixes

- Android/iOS: fix `minDate`/`maxDate` to support dates older than 1-1-1970

### Improvements

- Validate and sanitize options

### Breaking

- Android: requires API level 26 (https://developer.android.com/distribute/best-practices/develop/target-sdk)

## 1.1.3

- Android: Due to a [known bug](https://issuetracker.google.com/issues/36951008), when cancelling on Jelly Bean and KitKat, the cancel callback was not called. Instead the success callback was called. Fixes #18.

## 1.1.2

- iOS: fix bug when `minDate` or `maxDate` was NSNull would cause exception.

## 1.1.1

- iOS: fix null reference exception when `minDate` or  `maxDate` was not specified
- iOS: fix `maxDate` not being set when `minDate` was not specified

## 1.1.0

- Android/iOS: add support for min and max date settings
- Add type information for Typescript support

## 1.0.0

- Android/iOS: add support for cancel-event
- Moved callback handlers from method parameters to options while keeping backward compatibility
- Android: add 24 hour clock support

## 0.9.1

- Android: add support for okText/cancelText

## 0.9.0

- Android: fixed datetime mode only showing date picker (see #10)
- Android: added theme support
- Android: added calendar switch

## 0.8.0

- Android: fix @NonNull error when building apk

## 0.7.0

- iOS: use auto layout
- iOS: remove < iOS 7 support (UIActionSheet)
- iOS: remove custom modal picker type
- Android: fix minute spinner for setting minute interval

## 0.6.0

- Android: support Lollipop radial picker (no support for minute interval however)
- Android: overall refactor and improvements

## 0.5.1

- iOS: replace initWithWebView with pluginInitialize (deprecated in cordova-ios-4.0)

## 0.5.0

- Rename repo to conform to npm/cordova plugin naming convention
