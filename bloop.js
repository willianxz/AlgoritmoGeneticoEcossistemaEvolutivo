// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 5: Evolutionary Computing

// Evolution EcoSystem

// Creature class

// Create a "bloop" creature
function Bloop(l, dna_) {
  this.position = l.copy();  // Location
  this.health = 200;  // Life timer
  this.xoff = random(1000);  // For perlin noise
  this.yoff = random(1000);
  this.dna = dna_;   // DNA
  // DNA will determine size and maxspeed
  // The bigger the bloop, the slower it is
  this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0);
  this.r = map(this.dna.genes[0], 0, 1, 0, 50);

  this.run = function() {
    this.update();
    this.borders();
    this.display();
  }

  // A bloop can find food and eat it
  this.eat = function(f) {
    var food = f.getFood();
    // Are we touching any food objects?
    for (var i = food.length-1; i >= 0; i--) {
      var foodLocation = food[i];
      var d = p5.Vector.dist(this.position, foodLocation);
      // If we are, juice up our strength!
      if (d < this.r/2) {
        this.health += 100;
        food.splice(i,1);
      }
    }
  }

  // At any moment there is a teeny, tiny chance a bloop will reproduce
  this.reproduce = function() {
    // asexual reproduction
    if (random(1) < 0.0005) {
      // Child is exact copy of single parent
      var childDNA = this.dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.01);
      return new Bloop(this.position, childDNA);
    }
    else {
      return null;
    }
  }

  // Method to update position
  this.update = function() {
    // Simple movement based on perlin noise
    var vx = map(noise(this.xoff),0,1,-this.maxspeed,this.maxspeed);
    var vy = map(noise(this.yoff),0,1,-this.maxspeed,this.maxspeed);
    var velocity = createVector(vx,vy);
    this.xoff += 0.01;
    this.yoff += 0.01;

    this.position.add(velocity);
    // Death always looming
    this.health -= 0.2;
  }

  // Wraparound
  this.borders = function() {
    if (this.position.x < -this.r) this.position.x = width+this.r;
    if (this.position.y < -this.r) this.position.y = height+this.r;
    if (this.position.x > this.width+this.r) this.position.x = -r;
    if (this.position.y > this.height+this.r) this.position.y = -r;
  }

  // Method to display
  this.display = function() {
    ellipseMode(CENTER);
    stroke(0,this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  // Death
  this.dead = function() {
    if (this.health < 0.0) {
      return true;
    }
    else {
      return false;
    }
  }
}
