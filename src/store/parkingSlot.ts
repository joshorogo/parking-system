import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parkingSlot } from "@/helpers/parkingslot";

interface Occupant {
  id?: string;
  name?: string;
  vehiclePlate?: string;
  vehicleType?: "small" | "medium" | "large";
  timeIn?: any;
  timeOut?: any;
  isParked?: boolean;
}

interface ParkingSlot {
  id: number;
  name?: string;
  occupied: boolean;
  distances: number[];
  size: number;
  occupant?: Occupant;
}

interface InitialState {
  parkingSlot: ParkingSlot[];
  updatePSList: (updatedList: any) => void;
}

export const useParkingSlotStore = create<InitialState>()(
  persist(
    (set) => ({
      parkingSlot: parkingSlot,
      updatePSList: (updatedList) =>
        set((state) => ({
          ...state,
          parkingSlot: updatedList,
        })),
    }),
    {
      name: "parkingSlot-store",
      // skipHydration: true,
    }
  )
);
