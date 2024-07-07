import { configureStore, createSlice } from '@reduxjs/toolkit';



let user = createSlice({
    name : 'user',
    initialState: 'kim',
    reducers : {

        changeName(state){
            state.name = 'dd'
        }
    }

})

export let {changeName} = user.actions




export default  configureStore({
    reducer : {
        user : user.reducer 
    }
})