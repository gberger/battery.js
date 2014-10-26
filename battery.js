var Battery = function() {
	var self = this;

	self.status = {
		charging: null,
		level: null,
		chargingTime: null,
		dischargingTime: null
	};

	self.handlers = [];

	var eventHandler = function() {
		self.status.charging = self._battery.charging;
		self.status.level = self._battery.level;
		self.status.chargingTime = self._battery.chargingTime;
		self.status.dischargingTime = self._battery.dischargingTime;
		self.handlers.forEach(function(handler) {
			handler(self.status);
		})
	}

	var addListeners = function() {
		self._battery.addEventListener('chargingchange', eventHandler);
		self._battery.addEventListener('chargingtimechange', eventHandler);
		self._battery.addEventListener('dischargingtimechange', eventHandler);
		self._battery.addEventListener('levelchange', eventHandler);
	}

	self._battery;

	if((self._battery = navigator.battery || navigator.mozBattery)) {
		// Firefox
		eventHandler();
		addListeners();
	} else if(navigator.getBattery) {
		// Chrome
		navigator.getBattery().then(function(manager) {
			self._battery = manager;
			eventHandler();
			addListeners();
		});
	}
}

Battery.isSupported = function() {
	return !!(navigator.battery || navigator.mozBattery || navigator.getBattery);
}

Battery.prototype.getStatus = function(handler) {
	handler(this.status);
}

Battery.prototype.onUpdate = function(handler) {
	this.handlers.push(handler);
}
