import React, { Component } from 'react';
import EmblaCarouselReact from 'embla-carousel-react'

class Carousel extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.style ={
            position: 'absolute',
            left: '15%',
            width: '70%',
            height: '100%'
        }
        
    }
    /*
    componentDidMount() {
        this.embla.on('select', () => {
          console.log(
            `Current index is ${this.embla.selectedScrollSnap()}`,
          )
        })
      }
*/
    getProjects(){
        //fetch projects from db
        //make div for every project 
        //inset divs into state
        this.setState({projects: {}})
    }
/*
    render() {
    return (
        <div style={this.style}>
        <EmblaCarouselReact
            emblaRef={c => (this.embla = c)}
            options={{ loop: true }}
        >
            <div id="slidecontainer"style={{ display: 'flex' }}>
            {
                this.state.projects.map((Child, index) => (
                    <div className="embla__slide" key={index}>
                        <div className="embla__slide__inner">{Child}</div>
                    </div>
                    ))
            }
            </div>
        </EmblaCarouselReact>
        <button onClick={() => this.embla.scrollPrev()}>Prev</button>
        <button onClick={() => this.embla.scrollNext()}>Next</button>
        </div>
    )
    }
    */
   render() {
       return <p>Ich bin ein Karoussel</p>
   }
}
export default Carousel;