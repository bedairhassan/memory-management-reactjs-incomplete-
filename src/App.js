import React from 'react';
import Q from './components/Q'

export default class Welcome extends React.Component {

  constructor(props) {

    super(props)

    this.state = {

      data: [
        { processnumber: 1, processSize: 212, blockSize: 100, type: 'occupied' },
        { processnumber: 2, processSize: 417, blockSize: 500, type: 'occupied' },
        { processnumber: 3, processSize: 112, blockSize: 200, type: 'occupied' },
        { processnumber: 4, processSize: 426, blockSize: 300, type: 'occupied' }
      ],
      output: []
    }
  }

  submit() {

    let processSize = this.state.processSize
    let processnumber = this.state.processnumber
    let blockSize = this.state.blockSize

    // validation
    const nullablearrayitems = require('./components/tools').nullablearrayitems([processnumber, processSize])

    if (nullablearrayitems) {
      alert('failed to submit -> one or two empty fields.')
      return
    }
    // validation2
    const seenbefore = require('./components/tools').seenbefore(this.acquireprocessnumber(), parseInt(processnumber))

    if (seenbefore) {
      alert(`${processnumber} already exists.`)
      return;
    }

    // user input 
    this.setState({
      data: [...this.state.data, { processSize, processnumber, blockSize, type: 'occupied' }
      ]
    })
    // output
    this.applymain3()
  }

  displayObject2(allocation, processSize) {

    //let string = '\nProcess No.\tProcess Size\tBlock no.\n'
    let objects = []

    for (let i = 0; i < processSize.length; i++) {
      objects.push({

        processnumber: i + 1,
        processSize: processSize[i],
        // blocknumber:allocation[i] != -1?allocation[i]+1:NaN
      })
    }

    return objects
  }

  applymain3() {

    // OUT'S
    var [allocation2, processsize2] = this.firstFit(
      this.getBlockSize(), 
      this.getProcessSize()
      );

    var objects = this.displayObject2(allocation2, processsize2)

    // add attr type
    for (let i = 0; i < objects.length; i++) {

      if (objects[i].processnumber === this.state.data[i].processnumber) 
      {
        objects[i] = {
          processSize: objects[i].processSize,
          processnumber: objects[i].processnumber,
          type: this.state.data[i].type
        }
      }
    }


    // visualization
    this.setState({ output: objects })
    this.setState({ acquired2nd: true })
  }

  render() {

    return (
      <div>
        <center>
          <h1>Memory Management Visualization</h1>
          <center>

            <table>
              <thead>
                <tr>
                  <th> processnumber </th>
                  <th> processSize </th>
                  <th> blockSize </th>
                  <th>type</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map(
                    dat =>
                      <tr key={dat.processnumber}>
                        <td>{dat.processnumber}</td>
                        <td>{dat.processSize}</td>
                        <td>{dat.blockSize}</td>
                        <td>{dat.type}</td>

                        <td><button onClick={() => {
                          this.delete(dat.processnumber)

                        }}>delete</button></td>
                      </tr>

                  )
                }
                <tr>
                  <td><input onChange={(e) => { this.setState({ processnumber: e.target.value }) }} /></td>
                  <td><input onChange={(e) => { this.setState({ processSize: e.target.value }) }} /></td>
                  <td><input onChange={(e) => { this.setState({ blockSize: e.target.value }) }} /></td>
                  <td><input disabled /></td>

                  <td><button onClick={() => { this.submit() }}>Submit</button></td>

                </tr>
              </tbody>

            </table>

            <h2>TABLE 2</h2>
            {(this.state.acquired2nd) ? (<table>
              <thead>
                <tr>
                  <th> processnumber </th>
                  <th> processSize </th>
                  <th>type</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.output.map(
                    dat =>
                      <tr key={dat.processnumber}>
                        <td>{dat.processnumber}</td>
                        <td>{dat.processSize}</td>
                        <td>{dat.type}</td>
                      </tr>

                  )
                }

              </tbody>

            </table>) : (
                (<h2>Data not ready yet</h2>)
              )}

            {
              (this.state.acquired2nd) ? (<Q GR={this.state.output} />) : (<h2>can't draw yet</h2>)
            }
            {/* GR as given rect */}

          </center>
        </center>
      </div>
    )
  }

  delete(processnumber) {

    let start = [...this.state.data]

    for (let i = 0; i < start.length; i++) {

      if (start[i].processnumber === processnumber) {
        // logic
        start[i].type = 'freespace'

        // the end 
        this.setState({ data: [...start] })
        return;
      }
    }
  }

  acquireprocessnumber() {

    let pnumbers = []

    for (let i = 0; i < this.state.data.length; i++) {
      pnumbers.push(this.state.data[i].processnumber)
    }

    return pnumbers
  }

  firstFit(blockSize, processSize) {

    // int []allocation = new int[n]; 
    var allocation = []

    // Initially no block is assigned to any process 
    for (let i = 0; i < allocation.length; i++)
      allocation[i] = -1;

    // pick each process and find suitable blocks 
    // according to its size ad assign to it 
    for (let i = 0; i < processSize.length; i++) {
      for (let j = 0; j < blockSize.length; j++) {
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

  getProcessSize() {

    let processSize = []
    for (let i = 0; i < this.state.data.length; i++) {
      processSize.push(this.state.data[i].processSize)
    }
    return processSize
  }

  getBlockSize() {

    let blockSize = []
    for (let i = 0; i < this.state.data.length; i++) {
      blockSize.push(this.state.data[i].blockSize)
    }
    return blockSize
  }
}

