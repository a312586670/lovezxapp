cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
        {
            "file": "plugins/notification.js",
            "id": "org.apache.cordova.dialogs.notification",
            "merges": [
                "navigator.notification"
            ]
        },
        {
            "file": "plugins/android/notification.js",
            "id": "org.apache.cordova.dialogs.notification_android",
            "merges": [
                "navigator.notification"
            ]
        },
        {
            "file": "plugins/vibration.js",
            "id": "org.apache.cordova.vibration.notification",
            "merges": [
                "navigator.notification",
                "navigator"
            ]
        }
    ];
    module.exports.metadata =
// TOP OF METADATA
    {
        "org.apache.cordova.dialogs": "0.3.0",
        "org.apache.cordova.vibration": "0.3.13"
    }
// BOTTOM OF METADATA
});
