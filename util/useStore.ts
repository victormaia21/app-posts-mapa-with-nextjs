import { create } from 'zustand';

interface State {
  search: string;
  onChangeSearch: (searchText: string) => void;
}

const useStore = create<State>((set) => ({
  search: "",
  onChangeSearch: (searchText) => set(() => ({ search: searchText  })),
}));

export default useStore;
