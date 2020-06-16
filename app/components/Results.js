import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { battle } from '../utils/api'
import { FaCompass, FaBriefcase, FaUsers, FaUser, FaUserFriends, FaCode, } from 'react-icons/fa'
import queryString from 'query-string'
import PropTypes from 'prop-types'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

const ProfileList = ({ profile }) => {
    return (
        <ul className= "card-list">
            <li>
                <FaUser color= "rgb(239, 115, 115)" size= {22} />
                {profile.name}
            </li>
            {profile.location && (
                <li>
                    <Tooltip text = "User's location">
                        <FaCompass color= "rgb(144, 115, 255)" size= {22} />
                        {profile.location}
                    </Tooltip>
                </li>
            )}
            {profile.company && (
                <li>
                    <Tooltip text= "User's company">
                        <FaBriefcase color= "#795548" size= {22} />
                        {profile.company}
                    </Tooltip>
                </li>
            )}
            <li>
                <FaUsers color= "rgb(129, 195, 245)" size= {22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color= "rgb(64, 183, 95)" size= {22} />
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
}

class Results extends Component {

    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true       
    }

    componentDidMount() {
        const strings = queryString.parse(this.props.location.search)
        const { playerOne, playerTwo } = strings

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({ message }) => {
                this.setState({ error: message, loading: false})
            })
    }

    render() {
        const { winner, loser, loading, error } = this.state

        if (loading) {
            return <Loading />
        }

        if (error) {
            return <p className= "error center-text">{error}</p>
        }
        return (
            <React.Fragment>
                <div className= "container-sm grid space-around">
                    <Card
                    header= { winner.score === loser.score ? 'Tie' : 'Winner'} 
                    subheader= {`Score : ${winner.score.toLocaleString()}`}
                    avatar= {winner.profile.avatar_url}
                    name= {winner.profile.login}
                    href= {winner.profile.html_url}
                    >
                        <ProfileList profile= {winner.profile} />
                    </Card>
                    <Card
                        header= { winner.score === loser.score ? 'Tie' : 'Loser'}
                        subheader= {`Score : ${loser.score.toLocaleString()}`}
                        avatar= {loser.profile.avatar_url}
                        href= {winner.profile.html_url}
                        name= {loser.profile.login}
                    >
                        <ProfileList profile= {loser.profile} />
                    </Card>
                </div> 
                <Link
                    to= "/battle"
                    className= "btn dark-btn btn-space"
                >
                    RESET
                </Link> 
            </React.Fragment>          
        );
    }
}


export default Results;