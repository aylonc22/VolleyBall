import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export interface iPlansState {
  plans: Plan[];
  loading: boolean;
  error: string | null;
}

export interface Plan {
  id: string;
  Name: string;
  Workouts: Workout[];
}
export interface Workout {
  id: string;
  Name: string;
  Exercises: Exercise[];
  Dates: Date[];
  Count: number;
}
export interface Exercise {
  id: String;
  Times: { Sets: { Weight: number; Reps: number }; id: string }[];
  Sets: Number;
  Reps: Number;
  Best: Number;
  Start: Number;
}

const initialState: iPlansState = {
  plans: [],
  loading: false,
  error: null,
};

export const getPlans = createAsyncThunk(
  'plans/getPlans',
  async (userId: string, { rejectWithValue }) => {
    try {
      const plans = await axios.get(`http://localhost:4000/`, {
        params: { userId },
      });
      return plans.data.id;
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createPlan = createAsyncThunk(
  'plans/createPlan',
  async (planName: string, { rejectWithValue }) => {
    try {
      const newPlan = await axios.post('http://localhost:4000/createPlan', {
        PlanName: planName,
      });
      return { Name: planName, id: newPlan.data };
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
  extraReducers: {
    [`${getPlans.pending}`]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [`${getPlans.fulfilled}`]: (state, { payload }) => {
      state.plans = payload;
      state.loading = false;
    },
    [`${getPlans.rejected}`]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [`${createPlan.pending}`]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [`${createPlan.fulfilled}`]: (state, { payload }) => {
      state.plans = [
        ...state.plans,
        { id: payload.id, Name: payload.name, Workouts: [] },
      ];
      state.loading = false;
    },
    [`${createPlan.rejected}`]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default plansSlice.reducer;
