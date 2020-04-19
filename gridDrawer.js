



var grid = clickableGrid(20,20,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);
    console.log("You clicked on item #:",i);

    if(el.classList.contains('clicked'))
    {
        el.classList.remove('clicked');
    }
    else{
        el.classList.add('clicked');
    }

  
});
    window.onload = function(){
    var container = document.getElementById("pcgrid");
    document.body.appendChild(grid);
    
    }
    
    function clickableGrid( rows, cols, callback ){
        var i=0;
        var grid = document.createElement('table');
        grid.className = 'grid';
        for (var r=0;r<rows;++r){
            if(r%5==0)
            {
                var temp = document.createElement('tr');
                temp.classList.add('boldtr');
                var tr = grid.appendChild(temp);
            }
            else
            {
                var tr = grid.appendChild(document.createElement('tr'));
            }
            
            for (var c=0;c<cols;++c){
                if(c%5==0)
                {
                    var temp = document.createElement('td');
                    temp.classList.add('boldtd');
                    var cell = tr.appendChild(temp);
                }
                else{
                    var cell = tr.appendChild(document.createElement('td'));
                }
                
                
                cell.addEventListener('click',(function(el,r,c,i){
                    return function(){
                        callback(el,r,c,i);
                    }
                })(cell,r,c,i),false);
            }
        }
        return grid;
    }


    function changeClassName(cell)
    {
        console.log(cell.className);
        if(cell.className !='clicked')
        {
            cell.className = 'clicked';
        }
    }




