import React from 'react'


class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(36).fill({type:"",text:""}),
            keywords: []
        }
    }

    componentDidMount() {
        fetch('https://api.mercadolibre.com/trends/MLA')
            .then(res => res.json())
            .then((data) => {
                this.setState({
                    keywords:JSON.parse(data)
                })

                console.log(this.state.keywords)

                for(let i = 0; i<36; i++) {
                    this.state.squares.push({
                        type: 'text',
                        text: this.state.keywords[i].keyword
                    })
                }
            })
            .catch(console.log("error:"))
    }


    renderSquares(){
        return (

            this.state.squares.map(square => {
                return (square.type = "image" ? <img className='square' src={square.text}/> : <label className='square'>{square.text}</label>)
                })
        )

        //return (<Square value={this.state.squares[i]}></Square>)
    }



    render(){
        return (
            <div style={{height:'650px', width:'650px', border:'solid 1px black', textAlign: 'center'}}>
                {this.renderSquares()}
            </div>
        )
    }
}

class ImageKeyword extends React.Component{



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


export default ImageKeyword