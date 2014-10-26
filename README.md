# battery.js

A small JavaScript wrapper for the [HTML5 Battery Status API](http://www.w3.org/TR/battery-status/).

## Compatibility

- **Chrome 38+**
- **Firefox 11+** on Windows/Linux
- **Firefox 18+** on MacOSX

## Usage

```JavaScript
if(Battery.isSupported()) {
	var b = new Battery();

	// Get the battery status
	b.getStatus(function(status) {
		console.log('Level: ' + Math.floor(status.level * 100) + '%'); // 30%
		console.log('Charging: ' + status.charging);                   // true
		console.log('Time until charged: ' + status.chargingTime);     // 3600 (seconds) or Infinity
		console.log('Battery time left: ' + status.dischargingTime);   // 3600 (seconds) or Infinity
	});
	
	// Register a handler to get notified when battery status changes
	b.onUpdate = function(status) {
		console.log(status); // {level, charging, chargingTime, dischargingTime}
	};
}
```
