import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ENTRIES } from '../../utils/queries';
import EntryList from '../../components/EntryList';
import Auth from '../../utils/auth';

const Home = () => {
	const { loading, data } = useQuery(QUERY_ENTRIES);

	const entries = data?.entries || [];
	const loggedIn = Auth.loggedIn();

	return (
		<>
			<main>
				<div className='flex-row justify-space-between'>
					<div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
						{loading ? (
							<div>Loading...</div>
						) : (
							<EntryList entries={entries} title='All the latest travel entries from verified users:' />
						)}
					</div>
				</div>
				<img src={require('../../assets/images/Rotating_globe.gif')} alt="spinning globe"></img>
			</main>
		</>
	  );
}

export default Home;