import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: string;
  category: string;
  content: string;
  createdAt: number;
}

export interface Category {
  name: string;
  count: number;
}

interface NotesState {
  notes: Note[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  categories: [],
  loading: false,
  error: null
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ category: string; content: string }>) => {
      state.notes.unshift({
        id: Date.now().toString(),
        createdAt: Date.now(),
        ...action.payload
      });
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    deleteAllNotes: (state) => {
      state.notes = [];
    },
    updateNote: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const noteIndex = state.notes.findIndex(note => note.id === action.payload.id);
      if (noteIndex !== -1) {
        state.notes[noteIndex].content = action.payload.content;
      }
    }
  }
});

export const { addNote, deleteNote, deleteAllNotes, updateNote } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
