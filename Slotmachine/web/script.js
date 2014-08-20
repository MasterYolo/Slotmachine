angular.module('ControllerModule', []).
        controller('UserController', ['$scope', '$http', function($scope, $http)
            {

                $scope.user = {};

                $scope.fetchData = function()
                {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8080/Slotmachine/IOServlet'
                    }).success(function(data)
                    {
                        $scope.result = data;
                    });
                };
                /* if i ever need the pics alone */
                $scope.imgsrc1 = "http://www.nonstop-games.com/examples/slot/img/gold-64.png";
                $scope.imgsrc2 = "http://www.nonstop-games.com/examples/slot/img/energy-64.png";
                $scope.imgsrc3 = "http://www.nonstop-games.com/examples/slot/img/staff-64.png";
                $scope.imgsrc4 = "http://www.nonstop-games.com/examples/slot/img/cash-64.png";
                $scope.imgsrc5 = "http://www.nonstop-games.com/examples/slot/img/build-64.png";
                $scope.imgsrc6 = "http://www.nonstop-games.com/examples/slot/img/goods-64.png";
            }]);
        
/* Animation part */
$(function() {
    var positions = new Object();
    positions.lotf = 0;
    positions.gardenparty = 80;
    positions.kendalcalling = 175;
    positions.vfestival = 260;
    positions.creamfields = 350;
    positions.readingleeds = 450;
    positions.bestival = 540;

    var scope = angular.element("#slot1").scope();
    
    var one = new Slot('.slot#one', 20, 10, 'up', 700);
    var two = new Slot('.slot#two', 13, 7, 'down', 800);
    var three = new Slot('.slot#three', 17, 8, 'up', 600);

    one.go();
    two.go();
    three.go();

    $('#slot-machine').click(function() {
        var position = positions.bestival;
        one.stop(position);
        two.stop(position);
        three.stop(position);
    });
});

function Slot(slot, maxSpeed, timer) {


    this.slot = slot;
    this.speed = 0;
    this.maxSpeed = maxSpeed;
    this.timer = timer;
    this.interval = null;

    var self = this;

    this.go = function() {
        var $slot = $(this.slot);
        $slot.spStart();

        this.interval = window.setInterval(function() {
            var step = Math.floor(Math.random() * self.speed + 1);
            if (self.speed < (self.maxSpeed)) {
                self.speed += step;
            }

            $slot.spSpeed(self.speed);
        }, self.timer);
    };
    
    
    this.stop = function(position) {
        var $slot = $(this.slot);
        var step = self.speed / 5;
        var counter = 0;

        $slot.spSpeed(this.maxSpeed);
        $slot.spStart();

        this.interval = window.setInterval(function() {
            counter++;
            self.speed -= step;
            $slot.spSpeed(self.speed);

            if (counter == 3) {
                $slot.spSpeed(1);
                clearInterval(self.interval);
                $slot.spSpeed(0);
                $slot.spStop();
                self.speed = 0;
            }
        }, self.timer);
    };

    $(self.slot).pan({fps: '30', dir: 'down'});
    $(self.slot).spStop();
}
/* End of animation part */