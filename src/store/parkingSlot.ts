import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parkingSlot } from "@/helpers/parkingslot";

interface Occupant {
  id: string;
  name: string;
  vehiclePlate: string;
  vehicleType: "small" | "medium" | "large";
  timeIn: Date;
}

interface ParkingSlot {
  id: number;
  name: string;
  occupied: boolean;
  distances: number[];
  size: number;
  occupant?: Occupant;
}

interface InitialState {
  parkingSlot: ParkingSlot[];
  add?: (id: any) => void;
  deleteEntry?: (id: any) => void;
}

export const useParkingSlotStore = create<InitialState>()(
  persist(
    (set) => ({
      parkingSlot: parkingSlot,
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
    }),
    {
      name: "parkingSlot-store",
      // skipHydration: true,
    }
  )
);
