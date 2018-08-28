import React from 'react';
import { auth } from '../firebase';


const SignOutButton = () => {
    return (
        <button className='btn btn-info'
            type="button"
            onClick={auth.doSignOut}
        >
            Sign Out
    </button>
    )
}

export default SignOutButton;