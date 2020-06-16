import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FaUser, FaExclamationTriangle, FaCodeBranch, FaStar} from 'react-icons/fa'
import { fetchPopularRepos } from '../utils/api'

import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

const PopularNav = ({ selected, onUpdateLanguage }) => {

    const languages = ['All', 'Javascript', 'Java', 'Ruby', 'Python', 'CSS']

    return (
        <ul className= "flex-center">
        {
            languages.map((lang, id) => (
                <li key={id}>
                    <button 
                        style = {(lang === selected)
                            ? {color : 'rgb(187,46,31)'} 
                            : null }
                        className= "nav-link btn-clear"
                        onClick= {() => onUpdateLanguage(lang)}
                    >
                        {lang}
                    </button>
                </li>
            ))
        } 
        </ul>
    )
}

PopularNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

const ReposGrid = ({ repos }) => {
    return (
        <ul className= "space-around grid">
            {
                repos.map((repo, index) => {
                    const { owner, name, html_url, stargazers_count, forks, open_issues, } = repo
                    const { login, avatar_url } = owner

                    return (
                        <li key= {html_url}>
                            <Card
                                header= {`#${index+1}`}
                                subheader= {login}
                                avatar= {avatar_url}
                                name= {login}
                                href= {html_url}
                            >
                                <ul className= "card-list">
                                    <li>
                                        <Tooltip text = "Github user">
                                            <FaUser color= 'rgb(255,191,116)' size= {22} />
                                            <a href= {`https://github.com/${login}`}>{login}</a>
                                        </Tooltip>
                                    </li>
                                    <li>
                                        <FaStar color= 'rgb(255,215,0)' size= {22} />
                                        {stargazers_count.toLocaleString()} stars
                                    </li>
                                    <li>
                                        <FaCodeBranch color= 'rgb(129,195,245)' size= {22} />
                                        {forks.toLocaleString()} forks
                                    </li>
                                    <li>
                                        <FaExclamationTriangle color= 'rgb(241,138,147)' size= {22} />
                                        {open_issues.toLocaleString()} open issues
                                    </li>                               
                                </ul>
                            </Card>
                        </li>
                    )
                })
            }
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends Component {

    state = {
        selectedLanguage: 'All',
        error: null,
        repos: {}        
    }

    componentDidMount () {
        this.updateSelection(this.state.selectedLanguage)
    }

    updateSelection = (lang) => {

        this.setState({
            selectedLanguage: lang,
            error: null
        })

        fetchPopularRepos(lang)
            .then((data) => {
                this.setState(({ repos }) => ({
                    repos : {
                        ...this.state.repos,
                        [lang]: data
                    }
                }))
            })
            .catch((error) => {
                console.warn('Error when trying to access repos', error.message)
                this.setState({
                    error: 'There was an error when trying to fetch repositories'
                })
            })
    }

    isLoading = () => {
        const { selectedLanguage, repos, error } = this.state
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { error, repos, selectedLanguage } = this.state
        return (
            <React.Fragment>
                <PopularNav 
                    selected = {selectedLanguage}
                    onUpdateLanguage = {this.updateSelection}
                />
                { this.isLoading() && <Loading text= "Fetching Repos" speed= {300} />}
                { error && <p className= "center-text error">{error}</p> }
                { repos[selectedLanguage] && <ReposGrid repos = {repos[selectedLanguage]}/>}
            </React.Fragment>
        )
    }
}
export default Popular
