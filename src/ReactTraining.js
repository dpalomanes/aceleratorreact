import React from 'react'

class ReactTraining extends React.Component {
    render(){

        return(
            React.createElement("div", {className:"react-training"}),
            React.createElement("h1", null, "Objetivos del curso."),
            React.createElement("ul", null,
                React.createElement("li", null, "Configurar React..."),
                React.createElement("li", null, "Revisar los fundamentos"),
                React.createElement("li", null, "Construir una aplicacion de ejemplo")
            )
        )
    }
}

export default ReactTraining