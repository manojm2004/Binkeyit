import React from 'react';
import { useSelector } from 'react-redux';
import isAdmin from '../utils/isAdmin';

const AdminPermission = ({ children, fallbackMessage = 'Do not have permission', fallbackUI }) => {
    const user = useSelector(state => state.user);

    return (
        <>
            {isAdmin(user.role) ? (
                children
            ) : (
                fallbackUI || <p className='text-red-600 bg-red-100 p-4'>{fallbackMessage}</p>
            )}
        </>
    );
};

export default AdminPermission;
