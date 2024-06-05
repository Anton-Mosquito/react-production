import { createAsyncThunk } from '@reduxjs/toolkit';
import { type ThunkConfig } from '@/app/providers/StoreProvider';
import { userActions, type User } from '@/entities/User';

interface LoginByNameProps {
    username: string;
    password: string;
}

export const loginByUserName = createAsyncThunk<
    User,
    LoginByNameProps,
    ThunkConfig<string>
>('login/loginByUserName', async (authData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.post<User>('/login', authData);

        if (!response.data) {
            throw new Error();
        }

        dispatch(userActions.setAuthData(response.data));

        // extra.navigate('/profile')

        return response.data;
    } catch (error) {
        console.error('🚀 ~ error:', error);
        return rejectWithValue('Invalid data');
    }
});
