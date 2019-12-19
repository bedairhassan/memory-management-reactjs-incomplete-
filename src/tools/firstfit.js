let firstFit = (blockSize, processSize) => {

    // int []allocation = new int[n]; 
    var allocation = []

    // Initially no block is assigned to any process 
    for (var i = 0; i < allocation.length; i++)
        allocation[i] = -1;

    // pick each process and find suitable blocks 
    // according to its size ad assign to it 
    for (var i = 0; i < processSize.length; i++)
    {
        for (var j = 0; j < blockSize.length; j++)
        {
            if (blockSize[j] >= processSize[i]) {
                // allocate block j to p[i] process 
                allocation[i] = j;

                // Reduce available memory in this block. 
                blockSize[j] -= processSize[i];

                break;
            }
        }
    }

    return [

        allocation,
        processSize
    ]
}

let displayString = (allocation,processSize)=>{

    let string = '\nProcess No.\tProcess Size\tBlock no.\n'
    for (let i = 0; i < processSize.length; i++)
    {        
        string+=`${i+1}\t\t${processSize[i]}\t\t`

        if (allocation[i] != -1)
            string+=`${allocation[i] + 1}`
        else
            string+=`Not Allocated`
        
        string+='\n'
    }

    return string
}

let displayObject = (allocation,processSize)=>{

    //let string = '\nProcess No.\tProcess Size\tBlock no.\n'
    let objects = []

    for (let i = 0; i < processSize.length; i++)
    {        
        objects.push({

            processnumber:i+1,
            processsize:processSize[i],
            blocknumber:allocation[i] != -1?allocation[i]+1:NaN
        })

        //string+=`${i+1}\t\t${processSize[i]}\t\t`

        // if (allocation[i] != -1)
        //     string+=`${allocation[i] + 1}`
        // else
        //     string+=`Not Allocated`
        
        // string+='\n'
    }

    return objects
}

let main = ()=>{

    var blockSize = [ 100, 500, 200, 300, 600];
    var processSize = [ 212, 417, 112, 426]

    var[allocation2,processsize2]=firstFit(blockSize,processSize);
    let str = displayString(allocation2,processsize2)
    console.log(str)
}

let main2=()=>{

    var blockSize = [ 100, 500, 200, 300, 600];
    var processSize = [ 212, 417, 112, 426]

    var[allocation2,processsize2]=firstFit(blockSize,processSize);
    let objects = displayObject(allocation2,processsize2)
    console.log(objects)
}

main()
main2()


// This code is contributed by nitin mittal. 
