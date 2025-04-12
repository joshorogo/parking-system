import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CarInformation {
  id?: any;
  name?: string;
  vehiclePlate?: string;
  vehicleType?: "small" | "medium" | "large";
  timeIn?: any;
  timeOut?: any;
  isParked?: boolean;
}

interface InitialState {
  carInformation?: CarInformation;
  carList: CarInformation[];
  updateCarList: (car: any) => void;
  setCarInfo: (carInfo: any) => void;
}

export const useCarStore = create<InitialState>()(
  persist(
    (set) => ({
      carInformation: {},
      carList: [],
      setCarInfo: (carInfo: any) =>
        set((state) => ({
          ...state,
          carInformation: carInfo,
        })),
      updateCarList: (updatedList: any) =>
        set((state) => ({
          ...state,
          carList: updatedList,
        })),
    }),
    {
      name: "cars-store",
      // skipHydration: true,
    }
  )
);
