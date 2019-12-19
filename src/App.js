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

      processnumber: 0,
      processsize: 0,
      blocknumber: 0
    }
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

  existBefore(id){

    for(let i=0;i<this.state.data.length;i++){

      if(this.state.data[i].processnumber===id){
    
        alert(`illegal id : ${id}`)
        return true;
      }
    }
  }

  submit(){

    let processnumber = this.state.processnumber
    let processsize = this.state.processsize
    let blocknumber = this.state.blocknumber

    // validation
    if(this.existBefore(processnumber)){return;}
    if (require('./components/tools').nullable([processnumber,processsize,blocknumber])){return;}
    if (require('./components/tools').IsLetter([processnumber,processsize,blocknumber])){return;}

    let given = {
      processsize,
      processnumber,
      blocknumber
    }

    this.setState({data:[...this.state.data,given]})
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
                  <td><input onChange={(e) => { this.setState({ processnumber: e.target.value }) }} /></td>
                  <td><input onChange={(e) => { this.setState({ processsize: e.target.value }) }} /></td>
                  <td><input onChange={(e) => { this.setState({ blocknumber: e.target.value }) }} /></td>
                  <td><button onClick={() => {this.submit()}}>Submit</button></td>
                </tr>
              </tbody>

            </table>

          </center>
        </center>
      </div>
    )
  }
}

