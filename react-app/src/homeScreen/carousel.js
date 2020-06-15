import React, { Component } from 'react';
import axios from "axios";
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
    getProjects(){
        axios.get('http://localhost:80/api/Role', {

        }).then(res => {
            console.log(res)
        })
        .catch(err => console.error(err))
        //fetch projects from db
        //make div for every project 
        //inset divs into state
        this.setState({projects: {}})
    }

    componentWillMount(){
        this.getProjects()
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

    
    /*
    componentDidMount() {
        this.embla.on('select', () => {
          console.log(
            `Current index is ${this.embla.selectedScrollSnap()}`,
          )
        })
      }
*/
   render() {
       return <p>Ich bin ein Karoussel</p>
   }
}
export default Carousel;