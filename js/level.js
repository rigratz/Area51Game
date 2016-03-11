function Level(plan, i, j, gameEngine) {
  this.width = plan[0].length;
  this.height = plan.length;
  this.grid = [];
  this.iIndex = i;
  this.jIndex = j;
  this.visited = false;
  this.saveRoom = false;
  this.bossRoom = false;
  this.portalRoom = false;

  for (var y = 0; y < this.height; y++) {
    var line = plan[y], gridLine = [];
    for (var x = 0; x < this.width; x++) {
      var ch = line[x], fieldType = null;
      if (ch === "N")
        fieldType = "playernorth";
      if (ch === "S")
        fieldType = "playersouth";
      if (ch === "E")
        fieldType = "playereast";
      if (ch === "W")
        fieldType = "playerwest";
      else if (ch === "X")
        fieldType = "platform";
      else if (ch === "T")
        fieldType = "platformtop";
      else if (ch === "x")
        fieldType = "bosstile";
      else if (ch === "B")
        fieldType = "bird";
      else if (ch === "*")
        fieldType = "shadow_bird";
      else if (ch === "b")
        fieldType = "idle_bird";
      else if (ch === "D")
        fieldType = "dragon";
      else if (ch === "O")
        fieldType = "exit";
      else if (ch === "C")
        fieldType = "catbird";
      else if (ch === "s")
        fieldType = "speedboost";
      else if (ch === "u")
        fieldType = "bullet_upgrade";
      else if (ch === "j")
        fieldType = "doublejump";
      else if (ch === "q")
        fieldType = "smallcrazycat";
      else if (ch === "Q")
        fieldType = "bigcrazycat";
      else if (ch === "e")
        fieldType = "shadow_enemy";
      else if (ch === "i")
        fieldType = "shadow_enemy_bound";
      else if (ch === "$")
        fieldType = "eye_boss";
      else if (ch === "&")
        fieldType = "eye_boss_weakspot";
      else if (ch === ">")
         fieldType = "eye_boss_tile";
      else if (ch === "r")
        fieldType = "shotgun";
      else if (ch === "0")
        fieldType = "portal0";
      else if (ch === "1")
        fieldType = "portal1";
      else if (ch === "2")
        fieldType = "portal2";
      else if (ch === "3")
        fieldType = "portal3";
      else if (ch === "4")
        fieldType = "portal4";
      else if (ch === "H")
        fieldType = "tree_boss";
      else if (ch === "P")
        fieldType = "healthpackP";
      else if (ch === "a")
        fieldType = "healthpacka";
      else if (ch === "c")
        fieldType = "healthpackc";
      else if (ch === "z")
        fieldType = "healthpackz";
      else if (ch === "Z")
        fieldType = "healthpackZ";
      else if (ch === "v")
        fieldType = "healthpackv";
      else if (ch === "V")
        fieldType = "healthpackV";
      else if (ch === "9")
        fieldType = "healthpack9";
      else if (ch === "8")
        fieldType = "healthpack8";
      else if (ch === "7")
        fieldType = "healthpack7";
      else if (ch === "6")
        fieldType = "healthpack6";
      else if (ch === "5")
        fieldType = "healthpack5";
      else if (ch === "(")
        fieldType = "healthpack(";
      else if (ch === ")")
        fieldType = "healthpack)";
      else if (ch === "~")
        fieldType = "healthpack~";
      else if (ch === "k")
        fieldType = "snake_enemy";
      else if (ch === "K")
        fieldType = "snake_boss";
      else if (ch === "n")
        fieldType = "snail";
      else if (ch === "p")
        fieldType = "password";
      else if (ch === "[")
        fieldType = "boss1block";
      else if (ch === "]")
        fieldType = "boss2block";
      else if (ch === "|")
        fieldType = "boss3block";
      else if (ch === "t")
        fieldType = "shrink";
      else if (ch === "F")
        fieldType = "rapidfire";
      gridLine.push(fieldType);
    }
    this.grid.push(gridLine);
  }
}
