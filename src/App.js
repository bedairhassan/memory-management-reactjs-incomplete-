import React from 'react';
import Q from './components/Q'

export default class Welcome extends React.Component {

  constructor(props) {

    super(props)

    this.state = {

      data: [
        { processnumber: 1, processSize: 212, blockSize: 100 },
        { processnumber: 2, processSize: 417, blockSize: 500 },
        { processnumber: 3, processSize: 112, blockSize: 200 },
        { processnumber: 4, processSize: 426, blockSize: 300 },
        { processnumber: 4, processSize: 426, blockSize: 600 }
      ]
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

    this.setState({
      data: [...this.state.data, { processSize, processnumber,blockSize}
      ]
    })
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

                        <td><button onClick={() => this.delete(dat.processnumber)}>delete</button></td>
                      </tr>

                  )
                }
                <tr>
                  <td><input onChange={(e) => {this.setState({ processnumber: e.target.value })}} /></td>
                  <td><input onChange={(e) => { this.setState({ processSize: e.target.value }) }} /></td>
                  <td><input onChange={(e) => { this.setState({ blockSize: e.target.value }) }} /></td>

                  <td><button onClick={() => { this.submit() }}>Submit</button></td>

                </tr>
              </tbody>

            </table>

            <Q GR={this.state.data}/> 
             {/* GR as given rect */}

          </center>
        </center>
      </div>
    )
  }

  delete(id) {

    console.log(`delete(), parameters ${id}`)

    var filtered = []

    for (var k = 0; k < this.state.data.length; k++) {

      if (!(this.state.data[k].processnumber === id)) {

        filtered.push(this.state.data[k])
      }
    }

    this.setState({ data: [...filtered] })
  }

  acquireprocessnumber() {

    let pnumbers = []

    for (let i = 0; i < this.state.data.length; i++) {
      pnumbers.push(this.state.data[i].processnumber)
    }

    return pnumbers
  }
}

