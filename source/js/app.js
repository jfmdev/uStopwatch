var module = angular.module('myApp', ['onsen']);

module.controller('mainCtrl', function ($scope) {
    // Initialize variables.
    $scope.timer = 0;
    $scope.interval = null;
    $scope.list = [];
    $scope.start = null;
    
    // Private function for update the timer.
    function updateTimer() {
        var now = new Date();
        $scope.timer = now.getTime() - $scope.start.toDate().getTime();
        $scope.$apply();
    }
    
    // Define behaviour for stopwatch buttons.
    $scope.play = function() {
        // Verify if the clock is not already running.
        if($scope.interval === null) {
            // Set interval.
            $scope.interval = setInterval(updateTimer, 155);
            
            // Define start date.
            if($scope.start === null) $scope.start = moment();
        }
    };
    $scope.pause = function() {
        // Stop interval.
        clearInterval($scope.interval);
        $scope.interval = null;
    };
    $scope.stop = function() {
        // Stop interval.
        clearInterval($scope.interval);
        $scope.interval = null;
        
        // Create register.
        if($scope.start !== null) {
            $scope.list.unshift({
                start: $scope.start,
                end: moment(),
                time: $scope.timer
            });
        }
    
        // Clear start date and timer..
        $scope.timer = 0;
        $scope.start = null;
    };

    // Parse number to an integer with at least two digits.
    $scope.parseIntBis = function(number) {
        var res = parseInt(number, 10);
        if(res < 10) {
            res = '0' + res;
        }
        return res;
    };
    
    // Returns an string with the number of minutes and seconds.
    $scope.formatTime = function(time) {
        // Calculate minutes and seconds.
        var sec = parseInt((time/1000)%60, 10);
        var min = parseInt(time/60000, 10);

        // Generate string.
        var res = sec + " sec" + (sec > 1? 's' : '');
        if(min > 0) {
            res = min + " min" + (min > 1? 's' : '') + " and " + res;
        }
        
        return res;
    };
});