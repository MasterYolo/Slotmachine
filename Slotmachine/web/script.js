/**
 * @author Michael Lindell, Max Topsholm.
 * 
 * Written by Michael Lindell, Max Topsholm.
 * 
 * This angularjs module fetches an generated object from the back-end
 * application which is used in the front-end application to decide if
 * the user have won or not.
 * 
 * @param {type} The scope variable which is used to get the requested 
 * json object from the back-end application.
 * @param {type} The http variable to fetch the json object from the back-end
 * application.
 */
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

/**
 * JQuery function that handles the animation.
 * 
 * It uses a external library called jquery-spritely for the animation.
 * More info about the library can be found at http://spritely.net/documentation/.
 * 
 * The code that was developed here has sources in http://jsfiddle.net/bekasawr/fatXJ/.
 * 
 * TODO:
 * For-loop and Lists instead of the if-else statments
 * (Possibly) Lists for the pictures instead of object now.
 * 
 * 
 * @returns NOTHING.
 */
$(function() {
    var positions = new Object();
    positions.lotf = 0;
    positions.dollar = 80; //dollar
    positions.bolt = 175; //bolt
    positions.gold = 260; //gold
    positions.box = 370; //box
    positions.goldhelm = 465; //goldhelm
    positions.hammer = 545; //hammer

    /* PositionArray */
    var positionsArray = [];
    positionsArray.push(positions.dollar);
    positionsArray.push(positions.bolt);
    positionsArray.push(positions.gold);
    positionsArray.push(positions.box);
    positionsArray.push(positions.goldhelm);
    positionsArray.push(positions.hammer);

    var wordArray = [];
    wordArray.push("dollar");
    wordArray.push("bolt");
    wordArray.push("gold");
    wordArray.push("box");
    wordArray.push("goldhelm");
    wordArray.push("hammer");

    var slot1 = angular.element($("#slot1")).scope();
    var slot2 = angular.element($("#slot2")).scope();
    var slot3 = angular.element($("#slot3")).scope();

    var one = new Slot('.slot#one', 20, 10, 'up', 700);
    var two = new Slot('.slot#two', 13, 7, 'down', 800);
    var three = new Slot('.slot#three', 17, 8, 'up', 600);

    one.go();
    two.go();
    three.go();

    $('input').click(function() {
        $('input:submit').attr("disabled", true);

        var position1;
        var position2;
        var position3;

        for (var i = 0; i < 5; i++)
        {
            /* First slot */
            if (slot1.result.Column1 === wordArray[i])
            {
                position1 = positionsArray[i];
            }
            /* Second slot */
            if (slot1.result.Column2 === wordArray[i])
            {
                position2 = positionsArray[i];
            }
            /* Third slot */
            if (slot1.result.Column3 === wordArray[i])
            {
                position3 = positionsArray[i];
            }
        }

        one.stop(position1);
        two.stop(position2);
        three.stop(position3);

        setTimeout(function() {
            $('input:submit').attr("disabled", false);
            /* Later on this is where the function to the adding money to the
             * user-account.
             */
            setTimeout(function() {
                location.reload();
            }, 3000);
        }, 3000);
    });
});

/** 
 * Function to animate the three slots.
 * 
 * @param {type} slot The variable that combines the slot with the slot css.
 * @param {type} maxSpeed The maxspeed the slot can have
 * @param {type} initialSpeed The initial speed that the slot has.
 * @param {type} direction The desired direction the slot shall move.
 * @param {type} timer How often the slot is going to be updated.
 * @returns {Slot} Returns a desired slot.
 */
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
        if (that.direction === 'down') {
            while (actualPosition < backgroundPos) {
                actualPosition += slotImageHeight;
            }
        }

        if (that.direction === 'up') {
            while (actualPosition > backgroundPos) {
                actualPosition -= slotImageHeight;
            }
        }

        $slot.animate({backgroundPosition: '0 ' + actualPosition + 'px'}, 1000);
    };

    $(this.slot).pan({fps: '30', speed: this.speed, dir: this.direction});
    $(this.slot).spStop();
}