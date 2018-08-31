var bird;
var score = 0;
var height;
var width;
var pipes;
var freq = 80;

function setup() {
	createCanvas(400, 650);
	bird = new Bird();
	pipes = [];
	pipes.push(new Pipe());
	height = 650;
	width = 400;
}

function draw() {
	background(0);

	for(var i = pipes.length - 1; i >= 0; i--){
		pipes[i].update();
		pipes[i].show();
        if ((pipes[i].x == 49 ) && (pipes[i].topEnd > bird.y || pipes[i].bottomEnd < bird.y)) {
            pipes[i].color = color(255, 0, 0);
            score -= 1;
        }
        else if ((pipes[i].x == 49 ) && (pipes[i].topEnd < bird.y || pipes[i].bottomEnd > bird.y)){
            pipes[i].color = color(0, 255, 0);
            score += 1;
        }
		if (pipes[i].offscreen()) {
			pipes.splice(i, 1);
		}
	}
	bird.update();
	bird.show();
    
    if (score > 5) {
        freq = 70;    
    }
    if (score > 10) {
        freq = 40;
    }
    
    if (score > 0) {
        fill(0, 255, 0);
    }
    else if (score == 0) {
        fill(255);
    }
    else {
        fill(255,0,0);
    }
    textSize(60);
    text(score, 300, 60);
	if (frameCount % freq == 0) {
		pipes.push(new Pipe());
	}

}

function keyPressed() {
	if (key == ' ') {
		bird.up();
	}
}

function Bird() {
  this.y = height / 2;
  this.x = 49;
	this.lift = -11;
	this.velocity = 0;
	this.gravity = 0.4;

  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 40, 40);
  }

	this.update = function() {
		this.velocity += this.gravity;
		this.y += this.velocity;

		if (this.velocity > 20) {
			this.velocity = 20;
		}
		if (this.y > height) {
			this.y = height;
			this.velocity = 0;
		}
		if (this.y <= 15) {
			this.y = 15 ;
			this.velocity = 0;
		}
	}

	this.up = function() {
		this.velocity += this.lift;
		if (this.velocity < -9) {
			this.velocity = -9;
		}
	}
}

function Pipe() {
	this.x = width;
	this.gap = 175;
	this.width = 25;
	this.topEnd = random(20, height - 200);
	this.bottomEnd = this.topEnd + this.gap;
    this.color = color(255);

	this.show = function() {
		fill(this.color);
		rect(this.x, 0, this.width, this.topEnd);

		fill(this.color);
		rect(this.x, this.bottomEnd, this.width, height - this.bottomEnd);
	}
	this.update = function() {
		this.x -= 3;
	}
	this.offscreen = function() {
		if (this.x < -20) {
			return true;
		}
		return false;
	}

}
