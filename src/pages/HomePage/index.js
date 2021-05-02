import React from 'react';
import {connect} from 'react-redux';


const HomePage = ({user, jwt}) => (
    <div>
        {
            user && jwt ?
            <h1>Welcome, {user.username}</h1> :
            <h1>Home Page</h1>
        }
    </div>
)

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        jwt: state.auth.jwt
    }
}

export default connect(mapStateToProps)(HomePage);
