var cluesLeft = [];
var cluesTop = [];

function drawableGrid(rows, cols, callback) {
  var i = 0;
  var grid = document.createElement("table");
  grid.className = "grid";
  grid.id = "grid";
  for (var r = 0; r < rows; ++r) {
    if (r % 5 == 0) {
      var temp = document.createElement("tr");
      temp.classList.add("boldtr");
      var tr = grid.appendChild(temp);
    } else {
      var tr = grid.appendChild(document.createElement("tr"));
    }

    for (var c = 0; c < cols; ++c) {
      if (c % 5 == 0) {
        var temp = document.createElement("td");
        temp.classList.add("boldtd");
        var cell = tr.appendChild(temp);
      } else {
        var cell = tr.appendChild(document.createElement("td"));
      }

      cell.addEventListener(
        "click",
        (function (el, r, c, i) {
          return function () {
            callback(el, r, c, i);
          };
        })(cell, r, c, i),
        false
      );
    }
  }
  return grid;
}
function createGrid() {
  document.getElementById("pcgrid").innerHTML = "";
  var width = document.getElementById("gridWidth").value;
  var height = document.getElementById("gridHeight").value;

  var grid = drawableGrid(height, width, function (el, row, col, i) {
    console.log("You clicked on element:", el);
    console.log("You clicked on row:", row);
    console.log("You clicked on col:", col);
    console.log("You clicked on item #:", i);

    if (el.classList.contains("clicked")) {
      el.classList.remove("clicked");
    } else {
      el.classList.add("clicked");
    }
  });
  var container = document.getElementById("pcgrid");
  container.appendChild(grid);
}

function createClues() {
  var table = document.getElementById("grid");
 
  var whichRow;
  var clue = 0;
  var prev = false;
  var temp = [];
  for (var r = 0, row; (row = table.rows[r]); r++) {
    whichRow = r;
    for (var c = 0, col; (col = row.cells[c]); c++) {
      if (col.classList.contains("clicked")) {
        clue++;
        prev = true;
      } else if (!col.classList.contains("clicked") && prev && clue > 0) {
        temp.push(clue);
        clue = 0;
      }
    }
    if(temp.length==0)
    {
      cluesLeft.push('0');
    }
    else{
      cluesLeft.push(temp);
    }
    
    temp = [];
  }

  temp=[];
  clue=0;
  temp=[];
  prev=false;

  var h = document.getElementById("gridHeight").value;
  var w = document.getElementById("gridWidth").value;

  for(var i =0;i<h;i++)
  {
    for(var j=0;j<w;j++)
    {
      var x = document.getElementById("grid").rows[j].cells[i];
      if(x.classList.contains('clicked'))
      {
        clue++;
        prev = true;
      }
      else if (!x.classList.contains("clicked") && prev && clue > 0) {
        temp.push(clue);
        clue = 0;
      }
    }
    cluesTop.push(temp);
    temp = [];
  }


 
}

function drawClues()
{
  createClues();

  

  for(i=0;i<cluesLeft.length;i++)
  {
    var temp = document.getElementById('grid').rows[i];
    
    var tempStr = cluesLeft[i];
    tempStr = tempStr.toString().replace(',',' ');
    
    var x = temp.insertCell(0);
    x.innerHTML=tempStr;
    x.classList.add('clues');
    
    
  }
  
  
}


