import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  searchTasks: string;
}

const initialState: TaskState = {
  searchTasks: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,

  reducers: {
    setSearchTask: (state, action: PayloadAction<string>) => {
      state.searchTasks = action.payload;
    },
  },
});

export const { setSearchTask } = taskSlice.actions;

export default taskSlice.reducer;
