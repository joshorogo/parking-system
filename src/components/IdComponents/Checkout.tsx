"use client";

import React, { useState, useEffect } from "react";
import { useCarStore } from "@/store/cars";
import { useParkingSlotStore } from "@/store/parkingSlot";
import { GrFormClose } from "react-icons/gr";

import moment from "moment";

const CheckOut = ({ modal, onClose }: any) => {
  const { carInformation, carList, setCarInfo, updateCarList } = useCarStore(
    (state) => state
  );

  const { parkingSlot, updatePSList } = useParkingSlotStore((state) => state);
  const slot = parkingSlot?.find(
    (i) => i.occupant?.vehiclePlate === carInformation?.vehiclePlate
  );

  const minutes = carInformation?.duration;
  const diffHours = Math.round(Number(minutes) / 60);

  const duration =
    Number(minutes) <= 60 ? `${minutes} minutes` : `${diffHours} hour(s)`;

  const doConfirm = (e: any) => {
    try {
      e.preventDefault();

      for (let i of parkingSlot) {
        if (i.id === slot?.id) {
          i.occupied = false;
          i.occupant = {
            ...carInformation,
            isParked: false,
            timeOut: carInformation?.timeOut,
            price: null,
            duration: null,
          };
        }
      }
      for (let i of carList) {
        if (i.vehiclePlate === carInformation?.vehiclePlate) {
          i.isParked = false;
          i.timeOut = carInformation?.timeOut;
          i.price = null;
          i.duration = null;
        }
      }

      updatePSList(parkingSlot);
      updateCarList(carList);
      setCarInfo({
        ...carInformation,
        isParked: false,
        price: null,
        duration: null,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="customModal"
      style={{ display: modal.checkout ? "flex" : "none" }}
    >
      <div className="customModal-content" style={{ width: "50%" }}>
        <div className="d-flex justify-content-between align-items-center bg-transparent">
          <h5 className="d-flex gap-2 bg-transparent">{`Checkout`}</h5>
          <button className="bg-transparent" onClick={onClose}>
            <GrFormClose className="bg-transparent" size={25} />
          </button>
        </div>

        <div className="table__responsive">
          <table className="table__container">
            <thead>
              <tr></tr>
            </thead>
            <tbody>
              <tr>
                <td>Vehicle Number</td>
                <td>{`#${carInformation?.vehiclePlate}`}</td>
              </tr>
              <tr>
                <td>Parking Slot</td>
                <td>{`${slot?.name}`}</td>
              </tr>
              <tr>
                <td>Time-in</td>
                <td>{`${moment(carInformation?.timeIn).format("hh:mm:A")}`}</td>
              </tr>

              <tr>
                <td>Time-out</td>
                <td>{`${moment(carInformation?.timeOut).format(
                  "hh:mm:A"
                )}`}</td>
              </tr>
              <tr>
                <td>Duration</td>
                <td>{`${duration}`}</td>
              </tr>
              <tr>
                <td>Total Price</td>
                <td>
                  {`₱${carInformation?.price
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                </td>
              </tr>
            </tbody>
          </table>
          {!carList?.length && (
            <div className="text-center p-5 h-100">
              <p style={{ color: "#6b7380", fontSize: 14 }}>
                No vehicles found.
              </p>
            </div>
          )}
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
            onClick={doConfirm}
            //   disabled={loading}
          >
            Unpark
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
