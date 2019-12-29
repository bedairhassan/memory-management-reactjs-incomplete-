import React from 'react';
import Q from './components/Q'

export default class Welcome extends React.Component {

  constructor(props) {

    super(props)

    this.state = {

      data: [
        { processnumber: 1, processsize: 212 },
        { processnumber: 2, processsize: 417 },
        { processnumber: 3, processsize: 112 },
        { processnumber: 4, processsize: 426 }
      ],
    }
  }



  submit() {

    let processsize = this.state.processsize
    let processnumber = this.state.processnumber

    // validation
    const nullablearrayitems = require('./components/tools').nullablearrayitems([processnumber, processsize])

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
      data: [...this.state.data, { processsize, processnumber}
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
                  <th> processsize </th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map(
                    dat =>
                      <tr key={dat.processnumber}>
                        <td>{dat.processnumber}</td>
                        <td>{dat.processsize}</td>

                        <td><button onClick={() => this.delete(dat.processnumber)}>delete</button></td>
                      </tr>

                  )
                }
                <tr>
                  <td><input onChange={(e) => {
                    this.setState({ processnumber: e.target.value })
                  }} /></td>
                  <td><input onChange={(e) => { this.setState({ processsize: e.target.value }) }} /></td>

                  <td><button onClick={() => { this.submit() }}>Submit</button></td>
                </tr>
              </tbody>

            </table>

            <Q />

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

