"use client";

import React, { useState } from "react";
import { useCarStore } from "@/store/cars";
import { GrFormClose } from "react-icons/gr";
import { vehicleType } from "@/helpers/vehicle";

const initialCar = {
  vehicleType: "small",
  vehiclePlate: "",
};

const CarInformation = ({ modal, onClose }: any) => {
  const [currentCar, setCurrentCar] = useState({
    ...initialCar,
  });
  const [isTaken, setIsTaken] = useState(false);
  const { carList, updateCarList } = useCarStore((state) => state);

  const doConfirm = (e: any) => {
    try {
      e.preventDefault();
      setIsTaken(false);
      for (let i of carList) {
        if (i.vehiclePlate === currentCar.vehiclePlate) {
          setIsTaken(true);
          return;
        }
      }

      let payload = {
        ...currentCar,
        id: Date.now(),
        isParked: false,
      };

      updateCarList([...carList, payload]);
      setCurrentCar(initialCar);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="customModal"
      style={{ display: modal.info ? "flex" : "none" }}
    >
      <div className="customModal-content" style={{ width: "50%" }}>
        <div className="d-flex justify-content-between align-items-center bg-transparent">
          <h5 className="d-flex gap-2 bg-transparent">{`Vehicle Information`}</h5>
          <button className="bg-transparent" onClick={onClose}>
            <GrFormClose className="bg-transparent" size={25} />
          </button>
        </div>

        <form
          className="bg-transparent d-flex w-100 mt-2 flex-column gap-2"
          onSubmit={doConfirm}
        >
          <div className="d-flex justify-content-between">
            <label>VEHICLE NUMBER : </label>
            <input
              maxLength={6}
              minLength={6}
              value={currentCar?.vehiclePlate ?? ""}
              onChange={(e: any) =>
                setCurrentCar((car) => ({
                  ...car,
                  vehiclePlate: e.target.value,
                }))
              }
              required
            />
          </div>
          {isTaken && (
            <label
              className="align-self-end"
              style={{ color: "#a31621", fontSize: 12 }}
            >
              {"Vehicle Number is already taken"}
            </label>
          )}

          <div className="d-flex justify-content-between">
            <label>VEHICLE TYPE : </label>
            <div className="d-flex gap-1">
              {vehicleType?.map((vehicle) => (
                <button
                  className={
                    vehicle.name === currentCar?.vehicleType
                      ? `outline-button-checked`
                      : `outline-button`
                  }
                  key={vehicle.code}
                  type="button"
                  onClick={() =>
                    setCurrentCar((car) => ({
                      ...car,
                      vehicleType: vehicle.name,
                    }))
                  }
                >
                  {vehicle.name}
                </button>
              ))}
            </div>
          </div>

          <div className="d-flex w-100 gap-2 align-items-center justify-content-center bg-transparent">
            <button
              className="w-50 outline-button"
              style={{ height: 38 }}
              onClick={onClose}
              //   disabled={loading}
            >
              Cancel
            </button>
            <button
              className="w-50 primary-button"
              style={{ height: 38, textTransform: "uppercase" }}
              //   disabled={loading}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarInformation;
