import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ENTRY } from '../../utils/mutations';
import { QUERY_ENTRIES, QUERY_ME } from '../../utils/queries';

const EntryForm = () => {
    const [entryText, setText ] = useState('');
    const [characterCount, setCharacterCount ] = useState(0);

    const [addEntry, {error}] = useMutation(ADD_ENTRY, {
        update(cache, {data: {addEntry}}) {
            try {
                const {entries} = cache.readQuery({ query: QUERY_ENTRIES });

                cache.writeQuery({
                    query: QUERY_ENTRIES,
                    data: { entries: [addEntry, ...entries]}
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME, data: { me: { ...me, entries: [...me.entries, addEntry ]}}
            });
        }
    });

    const handleChange = event => {
        if (event.target.value.length <= 600) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        try {
            await addEntry({ variables: {entryText} });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <form className='flew-row justify-center align-stretch' onSubmit={handleFormSubmit}>
                <textarea placeholder='Talk about the last place you visited...' className='form-input' value={entryText} onChange={handleChange}></textarea>
                <button className='btn col-12' type='submit'>Submit Entry</button>
            </form>
        </>
    )
};

export default EntryForm;
