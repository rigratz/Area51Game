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
        fieldType = "catbird";
      else if (ch === "q")
        fieldType = "smallcrazycat";
      else if (ch === "Q")
        fieldType = "bigcrazycat";
      else if (ch === "S")
        fieldType = "speedboost";
      else if (ch === "0")
        fieldType = "portal0";
      else if (ch === "1")
        fieldType = "portal1";
      else if (ch === "2")
        fieldType = "portal2";
      else if (ch === "3")
        fieldType = "portal3";
      else if (ch === "H")
        fieldType = "tree_boss";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }
}
