"use client";

import React from "react";
import { useCarStore } from "@/store/cars";
import { GrFormClose } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { FaSquareCheck, FaSquareXmark } from "react-icons/fa6";

const CarList = ({ modal, onClose, pointId }: any) => {
  const router = useRouter();
  const { carList, setCarInfo } = useCarStore((state) => state);

  return (
    <div
      className="customModal"
      style={{ display: modal.list ? "flex" : "none" }}
    >
      <div className="customModal-content" style={{ width: "50%" }}>
        <div className="d-flex justify-content-between align-items-center bg-transparent">
          <h5 className="d-flex gap-2 bg-transparent">{`Please select a vehicle`}</h5>
          <button className="bg-transparent" onClick={onClose}>
            <GrFormClose className="bg-transparent" size={25} />
          </button>
        </div>

        <div className="table__responsive">
          <table className="table__container">
            <thead>
              <tr>
                <th>Vehicle #</th>
                <th>Vehicle type</th>
                <th>Parked?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {carList?.map((car) => {
                return (
                  <tr key={car?.id}>
                    <td>{car?.vehiclePlate}</td>
                    <td className="text-capitalize">{car?.vehicleType}</td>
                    <td>
                      {car?.isParked ? (
                        <FaSquareCheck size={20} color={"rgb(22, 81, 57)"} />
                      ) : (
                        <FaSquareXmark size={20} color={"rgb(142, 0, 0)"} />
                      )}
                    </td>
                    <td>
                      <button
                        className="outline-button"
                        style={{ height: 20 }}
                        onClick={() => {
                          setCarInfo(car);
                          router.push(`/${pointId}`);
                        }}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                );
              })}
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
      </div>
    </div>
  );
};

export default CarList;
