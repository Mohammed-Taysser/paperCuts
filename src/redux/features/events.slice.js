import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchEventsBySlug = createAsyncThunk(
	'events/single',
	async ({ slug }) => {
		try {
			const response = await axios.get(`/events/${slug}`);
			return {
				status: 'success',
				event: response.data,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
			};
		}
	}
);

const fetchAllEvents = createAsyncThunk('events/all', async () => {
	try {
		const response = await axios.get(`/events`);
		return {
			status: 'success',
			events: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const eventExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchEventsBySlug;

	return {
		[pending]: (state) => {
			state.single.loading = true;
			state.single.events = null;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.event = action.payload.event;
			} else {
				state.single.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.single.loading = false;
			state.single.error = action.error;
		},
	};
};

const allEventsExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAllEvents;

	return {
		[pending]: (state) => {
			state.all.loading = true;
			state.all.events = null;
		},
		[fulfilled]: (state, action) => {
			state.all.loading = false;
			if (action.payload.status === 'success') {
				state.all.events = action.payload.events;
			} else {
				state.all.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.all.loading = false;
			state.all.error = action.error;
		},
	};
};

const eventsSlice = createSlice({
	name: 'events',
	initialState: {
		single: {
			loading: false,
			event: null,
			error: null,
		},
		all: {
			loading: false,
			events: null,
			error: null,
		},
	},
	reducers: {},
	extraReducers: {
		...eventExtraReducers(),
		...allEventsExtraReducers(),
	},
});

// Action creators are generated for each case reducer function
export default eventsSlice.reducer;
export { fetchEventsBySlug, fetchAllEvents };
