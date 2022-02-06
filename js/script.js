const tableColumns = document.getElementsByClassName('col');
const draggablesItems = document.getElementsByClassName('item');

//Constants for maintianing the state
var draggedElement = null;
var sourceColumn = null;      // source cell from where the element is dragged
var destinationColumn = null; // destination cell where dragged element is dropped

for(item of draggablesItems){

    // for every draggable item

    // when any item is dragged 
    item.addEventListener('dragstart', (e)=>{
        console.log("Drag started for " + e.target.id + ", parent - " + e.target.parentElement.id);
        draggedElement = e.target;
        sourceColumn = e.target.parentElement;
        draggedElement.className += ' dragStart';
    })
    item.addEventListener('dragend', (e)=>{
        console.log("Drag ended for " + e.target.id + ", parent - " + e.target.parentElement.id);
        setTimeout(()=>{

            //remove animations
            draggedElement.className = 'item';
            sourceColumn.children[0].className = 'item'

            //remove states
            draggedElement = null;
            sourceColumn = null;
            destinationColumn = null;
        },500)
        
    })
}

for (col of tableColumns){
   
    col.addEventListener('dragover', (e) => {
        e.preventDefault();    // By default dragged element cannot be dropped over any element
    });

    col.addEventListener('dragenter', (e) => {
        if(e.target.hasAttribute('droppable')){
            destinationColumn = e.target;
        }
    })


    col.addEventListener('drop', (e) => {

        //Exchange cells
        sourceColumn.appendChild(destinationColumn.children[0]);
        destinationColumn.appendChild(draggedElement);

        //adding animations
        draggedElement.className = 'item jello-horizontal';
        sourceColumn.children[0].className += ' jello-horizontal'
        
    })
}