import { create } from "zustand";
import { persist } from "zustand/middleware";

interface EntryPoint {
  id?: any;
  name?: string;
}

interface InitialState {
  entryPoints: EntryPoint[];
  add: (id: any) => void;
  deleteEntry: (id: any) => void;
}

export const useEntryPointsStore = create<InitialState>()(
  persist(
    (set) => ({
      entryPoints: [{ id: 1 }, { id: 2 }, { id: 3 }],
      add: (id: any) =>
        set((state) => ({
          ...state,
          entryPoints: [...state.entryPoints, id],
        })),
      deleteEntry: (id: any) =>
        set((state) => ({
          ...state,
          entryPoints: state.entryPoints?.filter((point) => point.id !== id),
        })),
    }),
    {
      name: "entryPoints-store",
      // skipHydration: true,
    }
  )
);

// export const useEntryPointsStore = create<InitialState>()((set) => ({
//   entryPoints: [{ id: 1 }, { id: 2 }, { id: 3 }],
//   add: (id: any) =>
//     set((state) => ({
//       ...state,
//       entryPoints: [...state.entryPoints, id],
//     })),
//   deleteEntry: (id: any) =>
//     set((state) => ({
//       ...state,
//       entryPoints: state.entryPoints?.filter((point) => point.id !== id),
//     })),
// }));
