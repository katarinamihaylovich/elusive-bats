// these queries are here for example ONLY
import { QUERY_USERS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
// END example

function About() {
	const { loading, data } = useQuery(QUERY_USERS);

	const users = data?.users || [];

	return (
		<h1>
			This is the about page for my website

			{loading ? (
				<div>Loading ...</div>
			) : (
					<div>
						
					</div>
			)}
		</h1>
	);
}

export default About;