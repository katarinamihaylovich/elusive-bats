import React from 'react';
import { Link } from 'react-router-dom';

const EntryList = ({ entries, title }) => {
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
                            to={`/profile/${entry.username}`} style={{fontWeight: 600}} className='text-light'
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