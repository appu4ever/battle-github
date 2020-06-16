import React from 'react'
import { ThemeConsumer } from '../context/theme'
import { NavLink } from 'react-router-dom'

const activeSyle = {
    color: 'rgb(187, 46, 31'
}

const Nav = () => {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className= "row space-between">
                    <ul className= "row nav">
                        <li>
                            <NavLink 
                                exact
                                to= "/" 
                                className= "nav-link"
                                activeStyle= {activeSyle}
                            >Popular</NavLink>
                        </li>
                        <li>
                             <NavLink 
                                exact
                                to= "/battle" 
                                className= "nav-link"
                                activeStyle= {activeSyle}
                            >Battle</NavLink>
                        </li>
                    </ul>
                    <button
                        style = {{ fontSize: 30}}
                        className= 'btn-clear'
                        onClick= {toggleTheme}
                    >
                        { theme === 'light' ? '🔦' : '💡' }
                    </button>
                </nav>
            )}
        </ThemeConsumer>
    )
}

export default Nav