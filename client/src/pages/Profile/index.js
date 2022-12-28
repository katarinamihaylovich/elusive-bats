// these queries are here for example ONLY
import React from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_USERS, QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import  EntryForm  from '../../components/EntryForm';
import EntryList from '../../components/EntryList';
import Auth from '../../utils/auth';

function Profile() {
	const { username: userParam } = useParams();
	const { loading, data } = useQuery(userParam ? QUERY_USERS : QUERY_ME,
		{variables: {username: userParam }});

	const user = data?.me || data?.user || {};

	const loggedIn = Auth.loggedIn;

	if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
		return <useNavigate to='/profile' />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	if (!user?.username) {
		return (
		  <h4>
			You need to be logged in to see this page. Use the navigation links above to sign up or log in!
		  </h4>
		);
	}

	return (
		<>
			<h1>
				{loading ? (
					<div>Loading ...</div>
				) : (
					<div className='flex-row mb-3'>
						<h2>
							Welcome to your profile.
						</h2>
						{loggedIn && (
							<div className='col-12 mb-3'>
								<EntryForm />
								<EntryList entries={user.entries} title={`${user.username}'s entries:`} />
							</div>
						)}
					</div>
				)}
			</h1>
			<img src={require('../../assets/images/Rotating_globe.gif')} alt="spinning globe"></img>
		</>
	);
}

export default Profile;