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
    positions.dollar = 80; //dollar
    positions.bolt = 175; //bolt
    positions.gold = 260; //gold
    positions.box = 370; //box
    positions.goldhelm = 465; //goldhelm
    positions.hammer = 545; //hammer

    var slot1 = angular.element($("#slot1")).scope();
    var slot2 = angular.element($("#slot2")).scope();
    var slot3 = angular.element($("#slot3")).scope();

    var one = new Slot('.slot#one', 20, 10, 'up', 700);
    var two = new Slot('.slot#two', 13, 7, 'down', 800);
    var three = new Slot('.slot#three', 17, 8, 'up', 600);

    one.go();
    two.go();
    three.go();

    $('#slot-machine').click(function() {
        var position1;
        var position2;
        var position3;
        
        /* First slot */
        //alert(slot1.result.Column1); debug purpose only
        if (slot1.result.Column1 == "Cherry")
        {
            alert(slot1.result.Column1);
            position1 = positions.dollar;
        }
        else if (slot1.result.Column1 == "Orange")
        {
            alert(slot1.result.Column1);
            position1 = positions.bolt;
        }
        else if (slot1.result.Column1 == "Plum")
        {
            alert(slot1.result.Column1);
            position1 = positions.gold;
        }
        else if (slot1.result.Column1 == "Bell")
        {
            alert(slot1.result.Column1);
            position1 = positions.hammer;
        }
        else if (slot1.result.Column1 == "Melon")
        {
            alert(slot1.result.Column1);
            position1 = positions.box;
        }
        else
        {
            alert(slot1.result.Column1);
            position1 = positions.goldhelm;
        }

        /* Second slot */
        if (slot2.result.Column2 == "Cherry")
        {
            alert(slot2.result.Column2);
            position2 = positions.dollar;
        }
        else if (slot2.result.Column2 == "Orange")
        {
            alert(slot1.result.Column1);
            position2 = positions.bolt;
        }
        else if (slot2.result.Column2 == "Plum")
        {
            alert(slot2.result.Column2);
            position2 = positions.gold;
        }
        else if (slot2.result.Column2 == "Bell")
        {
            alert(slot2.result.Column2);
            position2 = positions.hammer;
        }
        else if (slot2.result.Column2 == "Melon")
        {
            alert(slot2.result.Column2);
            position2 = positions.box;
        }
        else
        {
            alert(slot2.result.Column2);
            position2 = positions.goldhelm;
        }
        
        /* Third slot */
        if (slot3.result.Column3 == "Cherry")
        {
            alert(slot3.result.Column3);
            position3 = positions.dollar;
        }
        else if (slot3.result.Column3 == "Orange")
        {
            alert(slot3.result.Column3);
            position3 = positions.bolt;
        }
        else if (slot3.result.Column3 == "Plum")
        {
            alert(slot3.result.Column3);
            position3 = positions.gold;
        }
        else if (slot3.result.Column3 == "Bell")
        {
            alert(slot3.result.Column3);
            position3 = positions.gold;
        }
        else if (slot3.result.Column3 == "Melon")
        {
            alert(slot3.result.Column3);
            position3 = positions.box;
        }
        else
        {
            alert(slot3.result.Column3);
            position3 = positions.goldhelm;
        }

        one.stop(position1);
        two.stop(position2);
        three.stop(position3);
    });
});

function Slot(slot, maxSpeed, initialSpeed, direction, timer) {
    this.slot = slot;
    this.speed = initialSpeed;
    this.maxSpeed = maxSpeed;
    this.direction = direction;
    this.timer = timer;
    this.interval = null;

    var that = this;

    this.go = function() {
        var $slot = $(this.slot);
        $slot.spStart();

        this.interval = window.setInterval(function() {
            var step = Math.floor(Math.random() * that.speed + 1);
            if (that.speed < (that.maxSpeed)) {
                that.speed += step;
            }

            $slot.spSpeed(that.speed);
        }, that.timer);
    };

    this.stop = function(position) {
        var $slot = $(this.slot);
        var step = this.speed / 5;
        var counter = 0;

        $slot.spSpeed(this.maxSpeed);
        $slot.spStart();

        this.interval = window.setInterval(function() {
            counter++;
            that.speed -= step;
            $slot.spSpeed(that.speed);

            if (counter == 3) {
                $slot.spSpeed(1);
                clearInterval(that.interval);
                land(position);
                $slot.spSpeed(0);
                $slot.spStop();
                that.speed = 0;
            }
        }, that.timer);
    };

    /* private */
    var land = function(position) {
        var $slot = $(that.slot);
        var element_id = $slot.attr('id');
        var slotImage, slotImageHeight, repeated, actualPosition;
        backgroundPos = document.getElementById(element_id).style.backgroundPosition;
        backgroundPos = backgroundPos.split(' ')[1];
        backgroundPos = parseInt(backgroundPos, 10);

        // get height of the slots background image
        slotImage = new Image();
        slotImage.src = $slot.css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
        slotImageHeight = slotImage.height;

        repeated = parseInt(backgroundPos / slotImageHeight, 10);

        actualPosition = (slotImageHeight * repeated) - position;
        if (that.direction == 'down') {
            while (actualPosition < backgroundPos) {
                actualPosition += slotImageHeight;
            }
        }

        if (that.direction == 'up') {
            while (actualPosition > backgroundPos) {
                actualPosition -= slotImageHeight;
            }
        }

        $slot.animate({backgroundPosition: '0 ' + actualPosition + 'px'}, 1000);
    }

    $(this.slot).pan({fps: '30', speed: this.speed, dir: this.direction});
    $(this.slot).spStop();
}