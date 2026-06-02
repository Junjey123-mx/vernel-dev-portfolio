import { create } from "zustand";

import type { ProjectFilter } from "@/modules/projects/domain/Project";

interface ProjectFilterState {
  activeFilter: ProjectFilter;
  resetFilter: () => void;
  setFilter: (filter: Partial<ProjectFilter>) => void;
}

const initialFilter: ProjectFilter = {};

export const useProjectFilterStore = create<ProjectFilterState>((set) => ({
  activeFilter: initialFilter,

  resetFilter: () => {
    set({ activeFilter: initialFilter });
  },

  setFilter: (filter) => {
    set((state) => ({
      activeFilter: {
        ...state.activeFilter,
        ...filter,
      },
    }));
  },
}));
