import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ENTRIES, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const EntryList = ({ entries, title }) => {
    // const {loading, data } = useQuery(QUERY_ME, {variables: {id: entries._id}});

    // const entry = data?.entry || {};

    if (!entries.length) {
        return <h4>Travel entries coming soon!</h4>
    }

    return (
        <>
            <h2>{title}</h2>
            {entries && entries.map(entry => (
                <div key={entry._id} className='card mb-3'>
                    <p className='card-header'>
                        <Link 
                            to={`/profile`} style={{fontWeight: 600}} className='text-light'
                        >{entry.username}
                        </Link>{'  '}
                        entry from {entry.createdAt}
                    </p>
                    <div className='card-body'>
                        <Link
                            to={`/entry/${entry._id}`}
                        >
                            <p>{entry.entryText}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}

export default EntryList;