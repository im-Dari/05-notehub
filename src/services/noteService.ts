import axios from 'axios';
import type { Note} from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const authHeaders = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = '' } = params;

  const response = await axios.get(`${BASE_URL}/notes`, {
    headers: authHeaders,
    params: { page, perPage, search },
  });

  return response.data;
}

// Створити нот.
export async function createNote(note: Omit<Note, 'id' | 'createdAt'>): Promise<Note> {
  const response = await axios.post(`${BASE_URL}/notes`, note, {
    headers: authHeaders,
  });

  return response.data;
}

// Видалити нот.
export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete(`${BASE_URL}/notes/${id}`, {
    headers: authHeaders,
  });

  return response.data;
}