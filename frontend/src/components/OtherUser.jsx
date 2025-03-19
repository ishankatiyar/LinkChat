import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user , key}) => {

    // other way
    //  const OtherUser = (props) => {
    //     const user = props.user;

// key is a special prop in React and is not passed to components.
// If you need key, use the user._id directly.
// If you must access key, pass it as a separate prop (e.g., userKey={user._id}).


    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id); // return s true or false, true if onlineUsers has id as "user._id"
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    return (
        <>
            <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : '' }`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2 '>
                        <p>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1'></div>
        </>
    )
}

export default OtherUser