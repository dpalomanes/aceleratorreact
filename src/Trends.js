import React from 'react'
import axios from "axios";
import Fade from 'react-reveal/Fade'
import Flip from 'react-reveal/Flip'
import Roll from 'react-reveal/Roll'
import Bounce from 'react-reveal/Bounce'




class Square extends React.Component {

    getRandomColor(){
        let colorValues = ["red", "blue", "green", "yellow", "pink", "orange", "lightblue"];
        return colorValues[Math.floor(Math.random() * colorValues.length)];
    }

    render(){
        if(this.props.value.isImage){
            return (

                <Bounce><img style={{height:"150px", width:"150px", margin:"0px"}} src={this.props.value.url} className='square'>
                </img></Bounce>


            )
        } else {
            return (
                <Flip>
                    <button style={{height:"150px", width:"150px", margin:"0px", backgroundColor:this.getRandomColor()}} className='square'>
                        {this.props.value.keyword}
                    </button>
                </Flip>

            )
        }


    }
}



class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(25).fill({
                keyword:"empty",
                url:"empty",
                isImage: true,
                square:["left", "right", "top", "bottom"]
            }),
            allData: []
        }
    }


    renderSquare(square, index){

        square.square = [index - 1, index + 1, index - 5, index + 5]

        return (<Square style={{padding:"0px"}} value={square}></Square>)
    }

    fetchUrl(){
        for (let i = 0; i < this.state.squares.length ; i++){

            var url = 'https://api.mercadolibre.com/sites/MLA/search?q=' + this.state.squares[i].keyword

            //console.log(url)

            axios.get(url)
                .then(res => {
                    try{

                        var keys = this.state.squares.slice()

                        keys[i].url = res.data.results[0].thumbnail

                        this.setState({
                            squares: keys
                        })
                    } catch (e) {
                        console.log("End of fetching with error")
                    }
                })
        }
    }

    selectRandom(){
        var keys = []
        for (let i = 0; i < this.state.squares.length ; i++){
            //console.log("selecting random word:" + i)
            keys [i] = {
                keyword: this.state.allData[Math.floor((Math.random() * this.state.allData.length) + 0)].keyword,
                url:"empty",
                isImage:false
            }
        }
        this.setState({
            squares:keys
        })

        this.fetchUrl()
    }

    switchAllComponents(isImage, index){
        console.log("isImage: " + isImage + " index: " + index)
        if (!isImage) {
            return false
        } else {


            var keys = this.state.squares.slice()


            keys[index].isImage = isImage

            for(let i=0; i < keys[index].square.length; i++){
                if (keys[index].square[i] > -1 && keys[index].square[i] < 24){
                    let ind = keys[index].square[i]
                    keys[ind].isImage = false
                }
            }

            this.setState({
                squares:keys
            })
        }
    }

    switchImageText(){
        setInterval(() => {
            var index = parseInt(Math.random() * (24))
            var isImage = Math.random() >= 0.5

            this.switchAllComponents(isImage, index)

        }, 500);
    }

    componentDidMount() {

        //console.log("componentDidMount()")

        axios.get('https://api.mercadolibre.com/trends/MLA')
            .then(res => {
                //console.log("Fetching trends:" + res.data[0].keyword)

                this.setState({
                    allData: res.data
                })

                this.selectRandom()

                this.switchImageText()
            })
    }

    render(){

        return (
            <div style={{textAlign:"center", display:"block"}}>
                <div className='board-row' style={{display:"inline-flex"}}>
                    {this.renderSquare(this.state.squares[0], 0)}
                    {this.renderSquare(this.state.squares[1], 1)}
                    {this.renderSquare(this.state.squares[2], 2)}
                    {this.renderSquare(this.state.squares[3], 3)}
                    {this.renderSquare(this.state.squares[4], 4)}
                </div>
                <div className='board-row' style={{display:"inline-flex"}}>
                    {this.renderSquare(this.state.squares[5], 5)}
                    {this.renderSquare(this.state.squares[6], 6)}
                    {this.renderSquare(this.state.squares[7], 7)}
                    {this.renderSquare(this.state.squares[8], 8)}
                    {this.renderSquare(this.state.squares[9], 9)}
                </div>
                <div className='board-row' style={{display:"inline-flex"}}>
                    {this.renderSquare(this.state.squares[10], 10)}
                    {this.renderSquare(this.state.squares[11], 11)}
                    {this.renderSquare(this.state.squares[12], 12)}
                    {this.renderSquare(this.state.squares[13], 13)}
                    {this.renderSquare(this.state.squares[14], 14)}
                </div>
                <div className='board-row' style={{display:"inline-flex"}}>
                    {this.renderSquare(this.state.squares[15], 15)}
                    {this.renderSquare(this.state.squares[16], 16)}
                    {this.renderSquare(this.state.squares[17],17)}
                    {this.renderSquare(this.state.squares[18],18)}
                    {this.renderSquare(this.state.squares[19],19)}
                </div>
                <div className='board-row' style={{display:"inline-flex"}}>
                    {this.renderSquare(this.state.squares[20], 20)}
                    {this.renderSquare(this.state.squares[21], 21)}
                    {this.renderSquare(this.state.squares[22], 22)}
                    {this.renderSquare(this.state.squares[23], 23)}
                    {this.renderSquare(this.state.squares[24], 24)}
                </div>
            </div>
        )
    }
}

class Game extends React.Component{
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board></Board>
                </div>
                <div className="game-info">
                    <div></div>
                    <ol></ol>
                </div>
            </div>
        )
    }
}


export default Game