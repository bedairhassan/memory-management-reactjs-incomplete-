import React, { Component } from 'react'
import Sketch from 'react-p5'

export default class App extends Component {
    
  x = 50
  y = 50

  setup = (p5, canvasParentRef) => {
    // p5.createCanvas(500, 500).parent(canvasParentRef)

    this.setuphank(p5, canvasParentRef)
  }
  draw = p5 => {

    this.drawhank(p5)
  }

  rects = []
  type = ['freespace', 'occupied']


  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  setuphank(p5, canvasParentRef) {
    p5.createCanvas(400, 400).parent(canvasParentRef)
    
    this.rects[0] = { x: 30, y: 30 }

    for (let i = 1; i < 20; i++) {

      this.rects[i] = {

        x: this.rects[i - 1].x,
        y: this.rects[i - 1].y + 20,
        type: this.type[this.getRandomInt(2)]
      }
    }
  }

  drawhank(p5) {
    p5.background(220);

    for (let i = 0; i < this.rects.length; i++) {

      let actual = this.rects[i].type === 'freespace' ? 'green' : 'red'
      p5.fill(p5.color(actual)); // Use color variable 'c' as fill color

      p5.noStroke(); // Don't draw a stroke around shapes

      p5.rect(this.rects[i].x, this.rects[i].y, 20, 20);
    }
  }

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />
  }
}