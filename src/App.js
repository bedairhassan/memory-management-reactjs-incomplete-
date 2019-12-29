import React from 'react';

export default class Welcome extends React.Component {

  constructor(props) {

    super(props)

    this.state = {

      data: [
        { processnumber: 1, processsize: 212, blocknumber: 2 },
        { processnumber: 2, processsize: 417, blocknumber: 5 },
        { processnumber: 3, processsize: 112, blocknumber: 2 },
        { processnumber: 4, processsize: 426, blocknumber: NaN }
      ],
    }
  }



  submit() {

    let processsize = this.state.processsize
    let processnumber = this.state.processnumber
    let blocknumber = this.state.blocknumber

    const nullablearrayitems = require('./components/tools').nullablearrayitems([processnumber, processsize, blocknumber])

    if (nullablearrayitems) {
      alert('failed to submit -> one or two empty fields.')
      return  
    }

    this.setState({
      data: [...this.state.data, { processsize, processnumber, blocknumber }
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
                  <th> blocknumber </th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.data.map(
                    dat =>
                      <tr key={dat.processnumber}>
                        <td>{dat.processnumber}</td>
                        <td>{dat.processsize}</td>
                        <td>{dat.blocknumber}</td>

                        <td><button onClick={() => this.delete(dat.processnumber)}>delete</button></td>
                      </tr>

                  )
                }
                <tr>
                  <td><input onChange={(e) => {

                    let processnumber = e.target.value

                    const seenbefore = require('./components/tools').seenbefore(this.acquireprocessnumber(), parseInt(processnumber))

                    console.log(seenbefore)

                    if (seenbefore) {
                      alert('already exists.')
                      return;
                    }

                    this.setState({ processnumber: processnumber })
                  }} /></td>
                  <td><input onChange={(e) => { this.setState({ processsize: e.target.value }) }} /></td>
                  <td><input onChange={(e) => { this.setState({ blocknumber: e.target.value }) }} /></td>
                  <td><button onClick={() => { this.submit() }}>Submit</button></td>
                </tr>
              </tbody>

            </table>

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

