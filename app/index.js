import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css' // This works because we have included style-loader

import Loading from './components/Loading'
import Nav from './components/Nav'

import { ThemeProvider } from './context/theme'
// ReactDOM package is separate from React because 
// React needs to build UI for other environents like
// IOS, Android, XBOX. ReactDOM is for the DOM.

// Component needs 
// UI
// State
// Lifecycle methods

const Popular = React.lazy(() => import('./components/Popular'))
const Battle = React.lazy(() => import('./components/Battle'))
const Results = React.lazy(() => import('./components/Results'))

class App extends React.Component {
    // Render methods allows the component to display the UI

    state = {
        theme: 'light',
        toggleTheme: () => (
            this.setState(({ theme }) => ({
                theme : theme === 'light' ? 'dark' : 'light'
            }))
        )        
    }

    render() {
        return (
            <Router>
                <ThemeProvider value= {this.state}>
                    <div className= {this.state.theme}>
                        <div className= "container">
                            <Nav />
                            <React.Suspense fallback = { <Loading />}>
                                <Switch>
                                    <Route path= "/battle/results" component= {Results} />
                                    <Route exact path= "/battle" component= {Battle} />
                                    <Route exact path= "/" component= {Popular} />
                                    <Route render= {() => <h1>404</h1>} />
                                </Switch>
                            </React.Suspense>
                        </div> 
                    </div> 
                </ThemeProvider>           
            </Router>
        )
    }
}

// Babel will convert the JSX into browser friendly JS.
// React.createElement(
//  "div",
//  null,
//  "Hello World"    
// )

ReactDOM.render(
    <App />, // -> React.createElement()
    document.getElementById('app') // Where to place the component
)

