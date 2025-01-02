
"use client"
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {fetchCreateNewUser} from "@/store/slices/auth/singup/thunk/fetchCreateNewUser";

const RegistrationComponent = ({token}:{token: string}) => {
     const dispatch = useDispatch<AppDispatch>();
     const {data, error, loading} = useSelector((state: RootState) => state.CreateNewUser);
    const [hasDispatched, setHasDispatched] = useState(false);

    useEffect(() => {
        if (!hasDispatched) {
            dispatch(fetchCreateNewUser(token));
            setHasDispatched(true);
        }
    }, [token]);



    return (
        <div>
            {data && <div>{JSON.stringify(data)}</div>}
        </div>
    );
};

export default RegistrationComponent;