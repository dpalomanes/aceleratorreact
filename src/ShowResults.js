import React from "react";
import axios from 'axios';

class Square extends React.Component {

    state = {
        url : "",
        isImage: false
    }

    getRandomColor(){
        let colorValues = ["red", "blue", "green", "yellow", "pink", "orange", "lightblue"];
        return colorValues[Math.floor(Math.random() * colorValues.length)];
    }


    fetchUrl(value){
        var searchWord = value.replace(" ","+")

        var url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + searchWord

        console.log(url)

        axios.get(url)
            .then(res => {

                try{
                    this.setState({
                        url: res.data.results[0].thumbnail
                    })
                } catch (e) {
                    console.log("End of fetching")
                }


            })
    }

    generateRandomNumber(){


        setTimeout(() => {
            this.setState(prevState => ({
                isImage: !prevState.isImage
            }));
        }, Math.floor((Math.random() * 5000) + 1000))
    }


    render(){
        if(this.state.url === ""){
            this.fetchUrl(this.props.value)
        }
        this.generateRandomNumber()

        if (this.state.isImage){
            return (
                <img src={this.state.url} className='square' style={{margin:'10px', width:'130px', height:'130px'}}></img>
            )
        }  else {
            return (
                <button className='square' style={{margin:'10px', width:'130px', height:'130px',backgroundColor:this.getRandomColor()  }}>{this.props.value}</button>
            )
        }


    }
}

class ShowResults extends React.Component {

    state = {
        keywords: Array(45).fill(""),
    }

    componentDidMount() {
        axios.get('https://api.mercadolibre.com/trends/MLA')
            .then(res => {

                var keys = []

                for (let i = 0; i<this.state.keywords.length ; i++){
                    keys.push(res.data[i].keyword)
                }
                this.setState({
                    keywords:keys
                })

            })

    }

    render() {
        return (<div className='main-div' style={{padding:'10px', height:'100px', width:'100px', border:'1px solid black', display:'contents'}}>
            {this.state.keywords.map(keyword => {
                return (
                    <Square value={keyword}/>
                )
            })}
        </div>)
    }
}

export default ShowResults