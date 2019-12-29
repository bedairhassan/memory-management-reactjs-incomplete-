import React, { Component } from 'react'
import Sketch from 'react-p5'

export default class App extends Component {

    constructor(props) {

        super(props)

        this.state = {

            GIVEN: props.GR
        }
    }

    setup = (p5, canvasParentRef) => { this.setuphank(p5, canvasParentRef) }
    draw = p5 => { this.drawhank(p5) }

    //   rects = []
    type = ['freespace', 'occupied']

    setuphank(p5, canvasParentRef) {
        p5.createCanvas(400, 400).parent(canvasParentRef)
    }


    drawhank(p5) {
        p5.background(220);

        let constantX = 30

        p5.fill(p5.color('green'));
        p5.noStroke();

        // starting position 
        let yold = 30
        let heightold = this.state.GIVEN[0].processSize / 10

        p5.rect(
            constantX,
            yold,
            20,
            heightold
        );

        for (let i = 1; i < this.state.GIVEN.length; i++) {
           
            yold=yold + heightold

            heightold=this.state.GIVEN[i].processSize / 10  // for-next-iteration

            // let type = this.type[require('./tools').getRandomInt(2)]
            // let type = this.state.GIVEN[i].type

            // let color = type==='freespace' ? 'green':'red'
            p5.fill(p5.color('white'));

            p5.noStroke();
            p5.rect(constantX, yold, 20, heightold);
        }
    }

    render() {
        return <Sketch setup={this.setup} draw={this.draw} />
    }
}