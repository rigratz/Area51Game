function Level(plan, i, j, gameEngine) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];
  this.iIndex = i;
  this.jIndex = j;

  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      if (ch === "@")

        fieldType = "player";
      else if (ch === "X")
        fieldType = "platform";
      else if (ch === "T")
        fieldType = "platformtop";
      else if (ch === "B")
        fieldType = "bird";
      else if (ch === "b")
        fieldType = "idle_bird";
      else if (ch === "D")
        fieldType = "dragon";
      else if (ch === "O")
        fieldType = "exit";
      else if (ch === "C")
        fieldType = "cat";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }
}
