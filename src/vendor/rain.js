export const Rain = bool => {
    var ctx;
    var cW;
    var cH;
    var raindrops;
    var rainStrength = 5;

    function initCanvas() {
        ctx = document.getElementById('canvas').getContext('2d');
        document.getElementById('canvas').setAttribute('style', '');

        ctx.canvas.width = 1280 * 0.75; //690
        ctx.canvas.height = 720 * 0.75; //540

        cW = ctx.canvas.width;
        cH = ctx.canvas.height;
    }

    if (bool === true) {
        function Raindrops() {
            this.x;
            this.y;
            this.s;
            this.width;
            this.height;

            this.drops = [];
            this.splashes = [];
        }

        Raindrops.prototype.addDrop = function() {
            this.x = Math.random() * (cW + 100) - 100;
            this.y = 0;
            this.s = Math.random() * 7 + 2;

            this.drops.push({
                x: this.x,
                y: this.y,
                velY: 2,
                width: this.s / 3,
                height: this.s * 1.2,
                speed: this.s,
                life: 10
            });
        };

        Raindrops.prototype.render = function() {
            for (var i = 0; i < rainStrength; i++) {
                this.addDrop();
            }

            ctx.save();

            ctx.clearRect(0, 0, cW, cH);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
            for (var l = 0; l < this.drops.length; l++) {
                var drop = this.drops[l];

                ctx.fillRect(drop.x, drop.y, drop.width, drop.height);
                drop.y += drop.speed * 2;
                drop.x += 2;

                if (drop.y + drop.height > cH) {
                    this.drops.splice(l, 1);
                }
            }

            ctx.restore();
        };

        function init() {
            raindrops = new Raindrops();
            loop();
        }

        function render() {
            raindrops.render();
        }

        function loop() {
            requestAnimationFrame(loop);
            render();
        }

        initCanvas();
        init();
    } else {
        document.getElementById('canvas').style.display = 'none';
    }
};
