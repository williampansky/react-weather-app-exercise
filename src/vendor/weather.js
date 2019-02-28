/**
 * @see [CodePen]{@link https://codepen.io/mattrussell36/pen/RVzrRG}
 */
export const Weather = (
    clouds = false,
    storm = false,
    rain = false,
    snow = false,
    wind = false
) => {
    var animationId = false;
    var assets = [];
    var canvas = false;
    var context = false;
    var timers = {};

    var imageAssetsLoaded = false;
    var imageAssets = {
        leaf: {
            fileName: 'weather_leaf.png'
        },
        cloud_02: {
            fileName: 'weather_cloud_02.png',
            width: 1792,
            height: 276
        }
    };

    // weather params
    var condition = {
        clouds: clouds,
        lightning: storm,
        rain: rain,
        snow: snow,
        wind: wind
    };

    var spawnedClouds = false;
    var windSpeed = 30;

    // rain
    var rainColor = 'rgba(255, 255, 255, 0.875)';

    /*
|
| Util methods
|
*/
    var randomRange = function(min, max, round) {
        round = round === undefined ? true : false;
        var val = Math.random() * (max - min) + min;
        return round ? Math.floor(val) : val;
    };

    var preLoadImageAssets = function(callback) {
        var imageAssetsCount = 0;
        var imageAssetsLoadedCount = 0;

        if (imageAssetsLoaded) {
            if (callback) {
                callback();
            }
            return;
        }

        var loadedHandler = function() {
            imageAssetsLoadedCount++;
            if (imageAssetsLoadedCount === imageAssetsCount) {
                imageAssetsLoaded = true;
                if (callback) {
                    callback();
                }
            }
        };

        for (var imageAssetName in imageAssets) {
            var imageAsset = imageAssets[imageAssetName];
            imageAssetsCount++;
            imageAsset.image = new Image();
            imageAsset.image.onload = loadedHandler;
            imageAsset.image.src =
                'https://s3.amazonaws.com/gerwins/weather/' +
                imageAsset.fileName;
        }
    };

    /*
|
| Weather control methods
|
*/
    var setConditionReady = function() {
        // stop spawning
        Pause();

        // clear flags
        spawnedClouds = false;

        // clear assets
        for (var i = 0, n = assets.length; i < n; i++) {
            assets.splice(i, 1);
            n--;
            i--;
        }

        // start spawning
        beginSpawning();
    };

    /*
|
| Spawning timers
|
*/
    var beginSpawning = function() {
        if (animationId) {
            return;
        }

        // SPAWN BUNCH OF CLOUDS
        if (condition.clouds && !spawnedClouds) {
            assets.push(new cloud({ x: -400 }));
            assets.push(new cloud({ x: 700 }));
            assets.push(new cloud({ x: 1400 }));

            spawnedClouds = true;
        }

        // SPAWN NEW DROPS CONSISTENTLY
        if (condition.rain) {
            timers.rain = setInterval(function() {
                assets.push(new rainDrop());
            }, 60);
        }

        // SPAWN NEW FLAKES CONSISTENTLY
        if (condition.snow) {
            timers.snow = setInterval(function() {
                assets.push(new snowFlake());
            }, 250);
        }

        // SPORADICALLY SPAWN RANDOM BUNCH OF LEAVES
        if (condition.wind) {
            var spawnLeaves = function() {
                for (var i = 0, n = randomRange(0, 3); i < n; i++) {
                    assets.push(new blowingLeaf());
                }

                timers.wind = setTimeout(spawnLeaves, randomRange(500, 1500));
            };

            spawnLeaves();
        }

        // SPORADICALLY SPAWN LIGHTNING
        if (condition.lightning) {
            var spawnLightning = function() {
                var rand = randomRange(0, 10);
                if (rand > 7) {
                    timers.secondFlash = setTimeout(function() {
                        assets.push(new lightning());
                    }, 200);
                }
                assets.push(new lightning());
                timers.lightning = setTimeout(
                    spawnLightning,
                    randomRange(500, 7000)
                );
            };

            spawnLightning();
        }

        animate();
    };

    /*
|
| Animation methods
|
*/
    function Pause() {
        cancelAnimationFrame(animationId);
        animationId = false;
        let intervalId;

        for (intervalId in timers) {
            if (timers[intervalId]) {
                clearInterval(timers[intervalId]);
                clearTimeout(timers[intervalId]);
            }
        }
    }

    var animate = function() {
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height);

        // draw each asset, if false, remove particle from assets
        for (var i = 0, n = assets.length; i < n; i++) {
            if (!assets[i].draw()) {
                assets.splice(i, 1);
                n--;
                i--;
            }
        }

        // continue
        animationId = window.requestAnimationFrame(animate);
    };

    /*
|
| Cloud particle
|
*/
    var cloud = function(options) {
        this.type = 'cloud';
        this.img = options.img || imageAssets.cloud_02;

        this.width = this.img.width; //randomRange(200, 500);
        this.height = this.img.height; //50;

        var max = 10;
        this.xVelocity = (windSpeed - randomRange(0, max)) / 60;
        this.yVelocity = 0;

        this.x = options.x || randomRange(-100, canvas.width + 100);
        this.y = options.y || randomRange(0 - this.height / 2, -60);
    };

    cloud.prototype.draw = function() {
        this.x += this.xVelocity;
        context.drawImage(
            this.img.image,
            0,
            0,
            this.img.width,
            this.img.height,
            this.x,
            this.y,
            this.img.width,
            this.img.height
        );

        // if (this.xVelocity > 0) {
        //     // >>>
        //     if (this.x > canvas.width) {
        //         this.xVelocity = (windSpeed - randomRange(0, 10)) / 60;
        //         this.x = 0 - this.width;
        //     }
        // } else {
        //     // <<<
        //     if (this.x < 0 - this.width) {
        //         this.xVelocity = (windSpeed - randomRange(0, 10)) / 60;
        //         this.x = canvas.width;
        //     }
        // }

        return true;
    };

    /*
|
| Rain drop particle
|
*/
    var rainDrop = function() {
        this.type = 'rain_drop';
        this.width = 0.5;
        this.height = randomRange(10, 25);

        this.x = randomRange(0, canvas.width);
        this.y = -10;

        this.xVelocity = 0;
        this.yVelocity = 8;
    };

    rainDrop.prototype.draw = function() {
        this.y += this.yVelocity;
        context.fillStyle = rainColor;
        context.fillRect(this.x, this.y, this.width, this.height);

        if (this.y > canvas.height) {
            // occasionally, make a splash!
            if (Math.floor(Math.random() * 10) > 7) {
                for (var i = 0, n = randomRange(3, 5); i < n; i++) {
                    assets.push(new splashDrop(this.x));
                }
            }
            return false;
        }

        return true;
    };

    /*
|
| Splash drop particla
|
*/
    var splashDrop = function(x) {
        this.type = 'splash_drop';
        this.width = 0.475;
        this.height = 0.475;

        this.x = x;
        this.y = canvas.height;

        this.yVelocity = randomRange(-1, -3, false);
        this.xVelocity = randomRange(-2, 2, false);

        this.age = 0;
        this.maxAge = 30;
    };

    splashDrop.prototype.draw = function() {
        this.y += this.yVelocity;
        this.x += this.xVelocity;

        context.fillStyle = rainColor;
        context.fillRect(this.x, this.y, this.width, this.height);

        this.yVelocity += 0.1;

        this.age++;
        if (this.age > this.maxAge) {
            return false;
        }

        return true;
    };

    /*
|
| Snow flake particle
|
*/
    var snowFlake = function() {
        this.type = 'snow_flake';
        this.width = randomRange(10, 30);
        this.height = this.width;

        this.x = randomRange(-200, canvas.width + 200);
        this.y = -30;

        this.xVelocity = (windSpeed - randomRange(0, 10)) / 60;
        this.yVelocity = randomRange(0.8, 1.4, false);

        this.opacity = randomRange(0.3, 0.7, false);
        this.settleLength = 500;
        this.settled = 0;
    };

    snowFlake.prototype.draw = function() {
        this.y += this.yVelocity;
        this.x += this.xVelocity;

        context.beginPath();
        context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
        context.fill();

        if (this.y > canvas.height) {
            this.xVelocity = 0;
            this.yVelocity = 0;
            this.settled++;

            if (this.settled > this.settleLength) {
                return false;
            }
        }

        return true;
    };

    /*
|
| Blowing leaf particle
|
*/
    var blowingLeaf = function() {
        this.type = 'blowing_leaf';
        this.width = randomRange(5, 10);
        this.height = this.width * 2.24;

        this.xVelocity = (windSpeed - randomRange(0, 20)) / 6;
        this.yVelocity = this.xVelocity / 6;

        this.rotation = Math.random() * 1;
        this.rotationVelocity = randomRange(-0.06, 0.06, false);

        if (this.xVelocity > 0) {
            // >>>
            this.x = randomRange(-50, -100);
        } else {
            // <<<
            this.x = randomRange(canvas.width, canvas.width + 100);
        }

        this.gravity = randomRange(-0.06, 0.06, false);
        this.y = randomRange(canvas.height - canvas.height / 4, canvas.height);
        this.yDirectionChangeLength = randomRange(20, 100);
        this.yDirectionTravelled = 0;
    };

    blowingLeaf.prototype.draw = function() {
        // save context
        context.save();

        // move x and y
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // sway
        this.yVelocity = this.yVelocity + this.gravity + -0.01;

        this.yDirectionTravelled++;
        if (this.yDirectionTravelled > this.yDirectionChangeLength) {
            this.yDirectionTravelled = 0;
            this.gravity *= -1;
            this.yDirectionChangeLength = randomRange(20, 100);
        }

        // increment rotation
        this.rotation += this.rotationVelocity;

        // translate context
        var xOffset = this.width / 2;
        var yOffset = this.height / 2;

        context.translate(this.x + xOffset, this.y + yOffset);
        context.rotate(this.rotation);
        context.drawImage(
            imageAssets.leaf.image,
            0,
            0,
            100,
            224,
            0 - xOffset,
            0 - yOffset,
            this.width,
            this.height
        );

        // restore context
        context.restore();

        if (this.xVelocity > 0) {
            // >>>
            if (this.x > canvas.width) {
                return false;
            }
        } else {
            // <<<
            if (this.x < -50) {
                return false;
            }
        }
        return true;
    };

    /*
|
| Lightning particle
|
*/
    var lightning = function() {
        this.type = 'lightning';
        this.x = randomRange(0, canvas.width);
        this.age = 0;
        this.life = 20;
        this.drawFrom = 0;
        this.drawTo = 0;
        this.points = [[this.x, 0]];
        this.totalPoints = 0;
        this.opacity = 1;

        this.flashed = false;
        this.flashOpacity = 0;

        var nextPointX = 0;
        var nextPointY = 0;
        while (nextPointY < canvas.height) {
            var lastPoint = this.points[this.points.length - 1];
            nextPointX =
                lastPoint[0] > this.x
                    ? randomRange(this.x, this.x + 15)
                    : randomRange(this.x + 15, this.x);
            nextPointY = lastPoint[1] + randomRange(10, 50);

            if (nextPointY > canvas.height) {
                nextPointY = canvas.height;
            }

            this.totalPoints++;
            this.points.push([nextPointX, nextPointY]);
        }
    };

    lightning.prototype.draw = function() {
        if (this.drawTo < this.points.length) {
            this.drawTo = this.drawTo + 2;
            if (this.drawTo > this.points.length) {
                this.drawTo = this.points.length;
            }
        } else {
            this.opacity = this.opacity - 0.02;

            if (!this.flashed) {
                this.flashed = true;
                this.flashOpacity = 1;
            }
        }

        if (this.opacity < 0) {
            return false;
        }

        if (this.flashOpacity > 0) {
            context.fillStyle =
                'rgba(255, 255, 255, ' + this.flashOpacity + ')';
            context.fillRect(0, 0, canvas.width, canvas.height);
            this.flashOpacity = this.flashOpacity - 0.1;
        }

        context.beginPath();
        context.moveTo(
            this.points[this.drawFrom][0],
            this.points[this.drawFrom][1]
        );

        for (var i = this.drawFrom; i < this.drawTo; i++) {
            context.lineTo(this.points[i][0], this.points[i][1]);
        }

        context.strokeStyle = 'rgba(255, 255, 255, ' + this.opacity + ')';
        context.lineWidth = 1;
        context.stroke();

        return true;
    };

    /**
     * Initialise
     */
    // document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    preLoadImageAssets(function() {
        setConditionReady();
    });
    // });
};
