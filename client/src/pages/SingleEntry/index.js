import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { DELETE_ENTRY, UPDATE_ENTRY } from '../../utils/mutations';
import { QUERY_ENTRY, QUERY_ME } from '../../utils/queries';
import { removeEntryId } from '../../utils/localStorage';
import Auth from '../../utils/auth';

const SingleEntry = props => {
    const { id: entryId } = useParams();

    const { loading, data } = useQuery(QUERY_ENTRY, { variables: { id: entryId }});

    const entry = data?.entry || {};
    

    const [deleteEntry ] = useMutation(DELETE_ENTRY, {
        update(cache, {data: {deleteEntry}}) {
            try { 
                cache.writeQuery({
                    query: QUERY_ME,
                    data: {me: deleteEntry},
                });
            } catch (err) {
                console.error(err)
            }
        }
    })

    const [updateEntry] = useMutation(UPDATE_ENTRY, {
        update(cache, {data: {updateEntry}}) {
            try {
                const {entry} = cache.readQuery({ query: QUERY_ENTRY});

                cache.writeQuery({
                    query: QUERY_ENTRY,
                    data: { entry: [updateEntry, ...entry]}
                });
            } catch (error) {
                console.error(error);
            }

            const { me } = cache.readQuery({ query: QUERY_ME});
            cache.writeQuery({
                query: QUERY_ME, data: {me: { ...me, entry: [...me.entry, updateEntry]}} 
            })
        }
    })

    const handleDeleteEntry = async (entryId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const {data} = await deleteEntry({
                variables: {entryId}
            });

            removeEntryId(entryId);
        } catch (err) {
            console.error(err)
        }
    };
    
    const handleUpdateEntry = async event => {
        event.preventDefault();

        try {
            await updateEntry({ variables: entry.entryId});
        } catch (e) {
            console.error(e)
        }
    };

    if (loading) {
        return <div>Thank you for your patience...</div>
    }

    return (
        <div>
          <div className="card mb-3">
            <p className="card-header">
              <span style={{ fontWeight: 700 }} className="text-light">
                {entry.username}
              </span>{' '}
              Entry created: {entry.createdAt}
            </p>
            <div className="card-body">
              <p>{entry.entryText}</p>
            </div>
            <button className='btn' onClick={() => handleDeleteEntry(entry.entryId)}> Delete </button>
            <button className='btn' onClick={() => handleUpdateEntry(entry.entryId)}> Edit </button>
          </div>
          {Auth.loggedIn()}
        </div>
      );

}

export default SingleEntry;