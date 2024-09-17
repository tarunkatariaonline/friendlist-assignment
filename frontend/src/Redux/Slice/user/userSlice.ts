import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  _id:string|null,
  avatar:string
  name: string|null;
  email: string|null;
  phoneno: string|null;
  username: string|null;
  hobbies: [string]
}

// Initial state can be null or UserState
const initialState: UserState={
  _id:null,
  avatar: '',
    name: null,
    email: null,
    phoneno: null,
    username: null,
    hobbies:['']
    
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state , action: PayloadAction<UserState>) => {
        console.log("hello i am dispatched")
     state.email = action.payload.email; 
     state.name = action.payload.name;
     state.phoneno = action.payload.phoneno;
     state.username = action.payload.username;
     state.hobbies = action.payload.hobbies;
     state._id = action.payload._id
     state.avatar = action.payload.avatar
     // Set the user state to a valid UserState
    }
    
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
