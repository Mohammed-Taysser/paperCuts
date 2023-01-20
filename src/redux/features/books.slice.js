import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchBook = createAsyncThunk('books/single', async ({ slug }) => {
	try {
		const response = await axios.get(`/books/${slug}`);
		return {
			status: 'success',
			book: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const fetchBookByQuery = createAsyncThunk('books/all', async ({ query }) => {
	try {
		const response = await axios.get(`/books/search?${query}`);
		return {
			status: 'success',
			books: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const fetchLatestBooks = createAsyncThunk('books/latest', async () => {
	try {
		const response = await axios.get('/books/latest');
		return {
			status: 'success',
			books: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const fetchRelatedBooks = createAsyncThunk('books/related', async () => {
	try {
		const response = await axios.get('/books/related');
		return {
			status: 'success',
			books: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const fetchAuthorBooks = createAsyncThunk(
	'books/author',
	async ({ username }) => {
		try {
			const response = await axios.get(`/books/search?author=${username}`);
			return {
				status: 'success',
				books: response.data,
			};
		} catch (error) {
			return {
				status: 'error',
				error: error.response.data.error,
			};
		}
	}
);

const fetchTop5Books = createAsyncThunk('books/top5', async () => {
	try {
		const response = await axios.get(`/books/top5`);
		return {
			status: 'success',
			books: response.data,
		};
	} catch (error) {
		return {
			status: 'error',
			error: error.response.data.error,
		};
	}
});

const top5BooksExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchTop5Books;

	return {
		[pending]: (state) => {
			state.top5.books = null;
			state.top5.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.top5.loading = false;
			if (action.payload.status === 'success') {
				state.top5.books = action.payload.books;
			} else {
				state.top5.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.top5.loading = false;
			state.top5.error = action.error;
		},
	};
};

const booksExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchBook;

	return {
		[pending]: (state) => {
			state.single.book = null;
			state.single.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.single.loading = false;
			if (action.payload.status === 'success') {
				state.single.book = action.payload.book;
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

const searchBooksByQueryExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchBookByQuery;

	return {
		[pending]: (state) => {
			state.all.books = null;
			state.all.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.all.loading = false;
			if (action.payload.status === 'success') {
				state.all.books = action.payload.books;
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

const latestBooksExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchLatestBooks;

	return {
		[pending]: (state) => {
			state.latest.books = null;
			state.latest.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.latest.loading = false;
			if (action.payload.status === 'success') {
				state.latest.books = action.payload.books;
			} else {
				state.latest.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.latest.loading = false;
			state.latest.error = action.error;
		},
	};
};

const relatedBooksExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchRelatedBooks;

	return {
		[pending]: (state) => {
			state.related.books = null;
			state.related.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.related.loading = false;
			if (action.payload.status === 'success') {
				state.related.books = action.payload.books;
			} else {
				state.related.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.related.loading = false;
			state.related.error = action.error;
		},
	};
};

const authorBooksExtraReducers = () => {
	const { pending, fulfilled, rejected } = fetchAuthorBooks;

	return {
		[pending]: (state) => {
			state.author.books = null;
			state.author.loading = true;
		},
		[fulfilled]: (state, action) => {
			state.author.loading = false;
			if (action.payload.status === 'success') {
				state.author.books = action.payload.books;
			} else {
				state.author.error = action.payload.error;
			}
		},
		[rejected]: (state, action) => {
			state.author.loading = false;
			state.author.error = action.error;
		},
	};
};

const booksSlice = createSlice({
	name: 'books',
	initialState: {
		single: {
			loading: false,
			book: null,
			error: null,
		},
		all: {
			loading: false,
			books: null,
			error: null,
		},
		latest: {
			loading: false,
			books: null,
			error: null,
		},
		related: {
			loading: false,
			books: null,
			error: null,
		},
		top5: {
			loading: false,
			books: null,
			error: null,
		},
		author: {
			loading: false,
			books: null,
			error: null,
		},
	},
	reducers: {
		sortAllBooks: (state, action) => {
			const sortedBooks = [...state.all.books];
			switch (action.payload.sortValue) {
				case 'price':
					sortedBooks.sort((a, b) => a.price - b.price);
					break;
				case 'price-desc':
					sortedBooks.sort((a, b) => b.price - a.price);
					break;
				case 'stars':
					sortedBooks.sort((a, b) => b.stars - a.stars);
					break;
				case 'date':
				default:
					sortedBooks.sort((a, b) => {
						let a_date = new Date(a.publishedAt),
							b_date = new Date(b.publishedAt);
						return a_date.getTime() - b_date.getTime();
					});
					break;
			}
			state.all.books = sortedBooks;
		},
	},
	extraReducers: {
		...booksExtraReducers(),
		...searchBooksByQueryExtraReducers(),
		...latestBooksExtraReducers(),
		...relatedBooksExtraReducers(),
		...authorBooksExtraReducers(),
		...top5BooksExtraReducers(),
	},
});

// Action creators are generated for each case reducer function
export default booksSlice.reducer;
export const { sortAllBooks } = booksSlice.actions;
export {
	fetchBook,
	fetchBookByQuery,
	fetchLatestBooks,
	fetchAuthorBooks,
	fetchRelatedBooks,
	fetchTop5Books,
};
