export function number(arr){
  return arr.map((item, index)=>({...item, index:index}));
}

function moveArrayItem(array, from, to) {
  if(to>=array.length){
    return array;
  }
  const newItems=[...array];
  newItems[to]=newItems[from];

  var pointer=0;
  for(var i=0; i<array.length; i++){
    if(pointer==from) pointer++;
    if(i==to) continue;
    newItems[i]=array[pointer++];
  }
  return newItems;
}

export function dropItem(setState, from, to) {
  setState(state=>({...state, items:number(moveArrayItem(state.items, from, to)) }));
}