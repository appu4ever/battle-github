import React from 'react'
import PropTypes from 'prop-types'

const styles = {
    content : {
        fontSize: '40px',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        marginTop: '20px'
    }
}

class Loading extends React.Component {

    state = {
        content: this.props.text 
    }

    componentDidMount() {
        const { text, speed } = this.props

        this.interval = window.setInterval(() => {
            this.state.content === text + '...' 
            ? this.setState({ content: text })
            : this.setState(({ content }) => ({
                content: content + '.'
            }))
        }, speed)
    }
    componentWillUnmount() {
        window.clearInterval(this.interval)
    }
    render() {
        return (
           <p style = {styles.content}>{this.state.content}</p> 
        );
    }
}

Loading.propTypes = {
    speed: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}

Loading.defaultProps = {
    speed: 300,
    text: 'Loading'
}

export default Loading;