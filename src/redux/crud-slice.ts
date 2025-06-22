import { createSlice } from "@reduxjs/toolkit";
import { UsersT } from "./type";

interface CrudState {
  todoList: UsersT[];
}

const initialState: CrudState = {
  todoList: [],
};

const crudSlice = createSlice({
  name: "crud",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      if (!user.id) {
        user.id = Date.now();
      }
      state.todoList.push(user);
    },
    deleteUser: (state, action) => {
      const idToDelete = action.payload;
      state.todoList = state.todoList.filter((user) => user.id !== idToDelete);
    },
  },
});

export const { addUser, deleteUser } = crudSlice.actions;
export default crudSlice.reducer;
