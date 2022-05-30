
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getProfile } from '../../Actions/UserActions';
import { useGlobalState } from '../../State/State';

const ProfileComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [profile] = useGlobalState('profile');
    useEffect(() => {
        if (profile.id === null) {
            getProfile(setLoading);
        }
    }, [])

    return (
        profile.id !== null ?
            <main className='main_profile'>
                <h1>hello world</h1>
            </main>
            : null
    );
}

export { ProfileComponent }