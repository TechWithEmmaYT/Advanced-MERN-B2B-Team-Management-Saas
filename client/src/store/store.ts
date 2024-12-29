import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import createSelectors from "./selectors";

type WorkspaceState = {
  isOpenAddWorkspace: boolean;
  onOpenAddWorkspace: () => void;
  // onCloseAddWorkspace: () => void;
};

const createWorkspaceSlice: StateCreator<WorkspaceState> = (set) => ({
  isOpenAddWorkspace: false,
  onOpenAddWorkspace: () => set({ isOpenAddWorkspace: true }),
  // onCloseAddWorkspace: () => set({ isOpenAddWorkspace: false }),
});

type StoreType = WorkspaceState;

export const useStoreBase = create<StoreType>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createWorkspaceSlice(...a),
      })),
      {
        name: "session-storage", // Name of the item in localStorage (or sessionStorage)
        getStorage: () => sessionStorage, // (optional) by default it's localStorage
      }
    )
  )
);

export const useStore = createSelectors(useStoreBase);
