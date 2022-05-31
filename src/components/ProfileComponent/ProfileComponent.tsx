
import { TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
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
        loading ? <h2>Wait...</h2> :
            profile.id !== null ?
                <main className='main_profile'>
                    <Container sx={{ py: 8 }} maxWidth="md">
                        <Typography>Contact Info</Typography>
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="name" variant="outlined" disabled value={profile.name} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="username" variant="outlined" disabled value={profile.username} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="email" variant="outlined" disabled value={profile.email} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="phone" variant="outlined" disabled value={profile.phone} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="website" variant="outlined" disabled value={profile.website} />
                        <Typography>Address</Typography>
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="street" variant="outlined" disabled value={profile.address.street} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="city" variant="outlined" disabled value={profile.address.suite} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="city" variant="outlined" disabled value={profile.address.city} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="zipcode" variant="outlined" disabled value={profile.address.zipcode} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField sx={{ width: '45%', my: '10px' }} id="outlined-basic" label="geo lat" variant="outlined" disabled value={profile.address.geo.lat} />
                            <TextField sx={{ width: '45%', my: '10px' }} id="outlined-basic" label="geo lng" variant="outlined" disabled value={profile.address.geo.lng} />
                        </Box>
                        <Typography>Company</Typography>
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="name" variant="outlined" disabled value={profile.company.name} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="catch phrase" variant="outlined" disabled value={profile.company.catchPhrase} />
                        <TextField sx={{ width: '100%', my: '10px' }} id="outlined-basic" label="bs" variant="outlined" disabled value={profile.company.bs} />
                    </Container>
                </main>
                : null
    );
}

export { ProfileComponent }