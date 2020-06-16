import React from 'react'
import PropTypes from 'prop-types'
import WithHover from './withHover'

const styles = {
    container: {
      position: 'relative',
      display: 'flex'
    },
    tooltip: {
      boxSizing: 'border-box',
      position: 'absolute',
      width: '160px',
      bottom: '100%',
      left: '50%',
      marginLeft: '-80px',
      borderRadius: '3px',
      backgroundColor: 'hsla(0, 0%, 20%, 0.9)',
      padding: '7px',
      marginBottom: '5px',
      color: '#fff',
      textAlign: 'center',
      fontSize: '14px',
    }
}

const Tooltip = ({ text, children }) => {        
    return (
        <WithHover>
            {(hovering) => (
                <div style = {styles.container}>
                    { hovering === true && <div style= {styles.tooltip}>{ text }</div> }
                    { children }
                </div>
            )}
        </WithHover>
    );
}

Tooltip.propTypes = {
    text: PropTypes.string.isRequired,
    // hovering: PropTypes.bool.isRequired
}

export default Tooltip;