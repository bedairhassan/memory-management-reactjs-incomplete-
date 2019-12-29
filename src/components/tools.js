exports.seenbefore = function (array,guest){

  for (let i=0;i<array.length;i++){

    if (array[i]===guest){

      return true
    }
  }

  return false
}

exports.nullablearrayitems = function(array){

  for (let i=0;i<array.length;i++){

    if(array[i]==='' || array[i]===undefined || parseInt(array[i])===0){
      return true
    }
  }

  return false  
}