"use client";

import React, { useState } from "react";

import Link from "next/link";

import { useParkingSlotStore } from "@/store/parkingSlot";
import { useCarStore } from "@/store/cars";
import { CustomToast } from "@/components/customToast";
import { useParams } from "next/navigation";
import { MdOutlineNavigateNext } from "react-icons/md";
import { parkingSlotSize } from "@/helpers/vehicle";
import moment from "moment";

const initialToast = {
  bg: "primary",
  show: false,
  text: "",
};

const EntryPointId = () => {
  const params = useParams();
  const [toastInfo, setToastInfo] = useState(initialToast);
  const { carInformation, carList, setCarInfo, updateCarList } = useCarStore(
    (state) => state
  );

  const { parkingSlot, updatePSList } = useParkingSlotStore((state) => state);

  const doPark = () => {
    try {
      if (carInformation?.isParked) {
        console.log(carInformation);
      } else {
        let selectedSlot: any = Number(params?.entryPointId);
        let nearestSlot = 7;
        let finalSlot = null;

        let size = getSize(carInformation?.vehicleType);

        for (let i in parkingSlot) {
          let pss = parkingSlot[i].size;

          if (!parkingSlot[i].occupied && size[pss]) {
            for (let j = 0; j < parkingSlot[i].distances.length; j++) {
              if (nearestSlot > parkingSlot[i].distances[selectedSlot - 1]) {
                nearestSlot = parkingSlot[i].distances[selectedSlot - 1];
                finalSlot = parkingSlot[i];
              }
            }
          }
        }

        let payload = {
          ...finalSlot,
        };

        for (let i of parkingSlot) {
          if (i.id === payload.id) {
            i.occupied = true;
            i.occupant = {
              ...carInformation,
              isParked: true,
              timeIn: moment().format(),
              timeOut: null,
            };
          }
        }

        for (let i of carList) {
          if (i.vehiclePlate === carInformation?.vehiclePlate) {
            i.isParked = true;
            i.timeIn = moment().format();
            i.timeOut = null;
          }
        }

        updatePSList(parkingSlot);
        updateCarList(carList);
        setCarInfo({
          ...carInformation,
          isParked: true,
          timeIn: moment().format(),
          timeOut: null,
        });
      }
    } catch (error) {}
  };

  const getSize = (type: any) => {
    let pss1 = false,
      pss2 = false,
      pss3 = false;

    if (type === "small") {
      pss1 = true;
      pss2 = true;
      pss3 = true;
    } else if (type === "medium") {
      pss1 = false;
      pss2 = true;
      pss3 = true;
    } else if (type === "large") {
      pss1 = false;
      pss2 = false;
      pss3 = true;
    }

    return [pss1, pss2, pss3];
  };
  return (
    <div className="d-flex flex-column container h-100">
      <CustomToast
        show={toastInfo?.show}
        onClose={() => setToastInfo(initialToast)}
        visible={toastInfo?.show}
        delay={3000}
        text={toastInfo?.text}
        bg={toastInfo?.bg}
      />
      <div className="d-flex flex-column">
        <div className="mt-2 bread__crumb bg-transparent">
          <Link href={"/"}>Home</Link>
          <MdOutlineNavigateNext size={30} />
          <a>{`Entry Point (${params?.entryPointId})`}</a>
        </div>

        <div className="d-flex justify-content-between align-items-center w-100 container-fluid mt-2">
          <div className="d-flex w-50 gap-3">
            <label>{`Vehicle #: ${carInformation?.vehiclePlate}`}</label>

            <label className="text-capitalize">
              {`Vehicle Type: ${carInformation?.vehicleType}`}
            </label>
          </div>
          <div className="d-flex justify-content-end w-100">
            <button className="primary-button w-15 mt-2" onClick={doPark}>
              {!carInformation?.isParked ? "Park" : "Unpark"}
            </button>
          </div>
        </div>
        {/* PARKING SLOTS */}
        <div className="d-flex flex-wrap  w-100 justify-content-center mt-1 gap-2">
          {parkingSlot?.map((slot: any) => {
            const slotSize = parkingSlotSize?.find(
              (ss) => ss.code === slot.size
            );
            const vehicleNum = slot?.occupant?.vehiclePlate ?? "------";
            return (
              <React.Fragment key={slot.id}>
                {slot?.occupied ? (
                  <div
                    className="d-flex flex-column customCard-occupied w-15 p-1"
                    style={{ height: 100 }}
                  >
                    <div className="d-flex align-items-center justify-content-between align-items-center h-100">
                      <div className="circleLbl">
                        <label style={{ fontSize: 40 }}>{slot?.name}</label>
                      </div>
                      <div className="d-flex flex-column align-self-start">
                        <div className="d-flex align-items-center">
                          <label style={{ fontSize: 12 }} className="colorGray">
                            {`distance: ${
                              slot?.distances[Number(params?.entryPointId) - 1]
                            }`}
                          </label>
                        </div>
                        <div className="d-flex align-items-center">
                          <label style={{ fontSize: 12 }} className="colorGray">
                            {`pss: ${slotSize?.name}`}
                          </label>
                        </div>

                        <div className="d-flex align-items-center">
                          <label style={{ fontSize: 12 }} className="colorGray">
                            {`v #: ${vehicleNum}`}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="d-flex flex-column customCard w-15 p-1"
                    style={{ height: 100 }}
                  >
                    <div className="d-flex align-items-center justify-content-between align-items-center h-100">
                      <div className="circleLbl">
                        <label style={{ fontSize: 40 }}>{slot?.name}</label>
                      </div>
                      <div className="d-flex flex-column align-self-start">
                        <div className="d-flex align-items-center">
                          <label style={{ fontSize: 12 }} className="colorGray">
                            {`distance: ${
                              slot?.distances[Number(params?.entryPointId) - 1]
                            }`}
                          </label>
                        </div>
                        <div className="d-flex align-items-center">
                          <label style={{ fontSize: 12 }} className="colorGray">
                            {`pss: ${slotSize?.name}`}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EntryPointId;
