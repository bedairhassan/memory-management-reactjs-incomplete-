function IsLetter(array){ // for exporting

    let found = (array,guest)=>{

      // [0,1,2,3,4,5,6,7,8,9] , 'q' -> returns false
      // [0,1,2,3,4,5,6,7,8,9] , '1' -> returns true
      // [0,1,2,3,4,5,6,7,8,9] , 1 -> returns true

      for (let i=0;i<array.length;i++){

        if(array[i]===parseInt(guest)){
          return true;
        }
      }

      return false;
    }

    let values = [0,1,2,3,4,5,6,7,8,9]

    for (let i=0;i<array.length;i++){

      if(found(values,array[i])===false){
        return true;
      }
    }
  }

  function nullable(array){ // for exporting

    for(let i=0;i<array.length;i++){

      if(array[i]===null || array[i]==='')
      {
        return true;
      }
    }

    return false
  }

  exports.IsLetter = IsLetter
  exports.nullable=nullable