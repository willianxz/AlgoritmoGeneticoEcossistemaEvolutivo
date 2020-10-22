// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 5: Evolutionary Computing

// Evolution EcoSystem

// The World we live in
// Has bloops and food

// Constructor
function World(num) {
  // Start with initial food and creatures
  this.food = new Food(num);
  this.bloops = [];        // An array for all creatures
  for (var i = 0; i < num; i++) {
    var l = createVector(random(width), random(height));
    var dna = new DNA();
    this.bloops.push(new Bloop(l, dna));
  }


  // Make a new creature
  this.born = function(x, y) {
    var l = createVector(x, y);
    var dna = new DNA();
    this.bloops.push(new Bloop(l, dna));
  }

  // Run the world
  this.run = function() {
    // Deal with food
    this.food.run();

    // Cycle through the ArrayList backwards b/c we are deleting
    for (var i = this.bloops.length-1; i >= 0; i--) {
      // All bloops run and eat
      var b = this.bloops[i];
      b.run();
      b.eat(this.food);
      // If it's dead, kill it and make food
      if (b.dead()) {
        this.bloops.splice(i, 1);
        this.food.add(b.position);
      }
      // Perhaps this bloop would like to make a baby?
      var child = b.reproduce();
      if (child != null) this.bloops.push(child);
    }
  }
}
