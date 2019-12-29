import React, { Component } from 'react'
import Sketch from 'react-p5'

export default class App extends Component {

  setup = (p5, canvasParentRef) => {this.setuphank(p5, canvasParentRef)}
  draw = p5 => {this.drawhank(p5)}

  rects = []
  type = ['freespace', 'occupied']

  setuphank(p5, canvasParentRef) {
      
    p5.createCanvas(400, 400).parent(canvasParentRef)
    
    this.rects[0] = { x: 30, y: 20 }

    let processsize = 20 // height
    for (let i = 1; i < 20; i++) {

      this.rects[i] = {

        x: this.rects[i - 1].x,
        y: this.rects[i - 1].y + processsize,
        type: this.type[require('./tools').getRandomInt(2)]
      }
    }
  }

  drawhank(p5) {
    p5.background(220);

    for (let i = 0; i < this.rects.length; i++) {

      let actual = this.rects[i].type === 'freespace' ? 'green' : 'red'
      p5.fill(p5.color(actual)); // Use color variable 'c' as fill color
      p5.noStroke(); // Don't draw a stroke around shapes

      let processsize = 20 // HEIGHT
      p5.rect(this.rects[i].x, this.rects[i].y, 100, processsize);
    }
  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />
  }
}