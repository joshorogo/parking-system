"use client";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useEntryPointsStore } from "@/store/entryPoints";
import { useParkingSlotStore } from "@/store/parkingSlot";
import { CustomToast } from "@/components/customToast";

import CarInformation from "@/components/HomeComponents/CarInformation";
import CarList from "@/components/HomeComponents/CarList";

const initialToast = {
  bg: "primary",
  show: false,
  text: "",
};

const Home = () => {
  //   const data = await fetch("http://localhost:3000/api/entryPoints");
  //   const entryPoints = await data.json();

  const [toastInfo, setToastInfo] = useState(initialToast);
  const [modal, setModal] = useState({ info: false, list: false });
  const [selectedEp, setSelectedEp] = useState(null);
  const { entryPoints, add, deleteEntry } = useEntryPointsStore(
    (state) => state
  );
  const { parkingSlot, updatePSList } = useParkingSlotStore((state) => state);

  const doDeleteEntryPoint = (id: any) => {
    if (entryPoints?.length <= 3) {
      setToastInfo((toast) => ({
        ...toast,
        bg: "danger",
        show: true,
        text: "Entry points should be atleast (3)",
      }));
      return;
    }

    deleteEntry(id);
    setToastInfo((toast) => ({
      ...toast,
      bg: "success",
      show: true,
      text: `Successfully deleted an entry point (${id})`,
    }));
  };

  const doAddEntryPoint = () => {
    for (let i of parkingSlot) {
      const randomNumber = Math.floor(Math.random() * 7) + 1;
      i.distances.push(randomNumber);
    }

    add({ id: +entryPoints[entryPoints?.length - 1].id + 1 });
    updatePSList(parkingSlot);
    setToastInfo((toast) => ({
      ...toast,
      bg: "success",
      show: true,
      text: `Successfully added a new entry point (${
        +entryPoints[entryPoints?.length - 1].id + 1
      })`,
    }));
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

      <CarInformation
        modal={modal}
        onClose={() => setModal((modal) => ({ ...modal, info: !modal.info }))}
      />
      <CarList
        modal={modal}
        pointId={selectedEp}
        onClose={() => setModal((modal) => ({ ...modal, list: !modal.list }))}
      />

      <div className="d-flex ">
        <div className="d-flex justify-content-end gap-2 w-100">
          <button
            className="outline-button w-15 mt-2"
            onClick={() =>
              setModal((modal) => ({ ...modal, info: !modal.info }))
            }
          >
            Add Car Information
          </button>
          <button
            className="primary-button w-15 mt-2"
            onClick={doAddEntryPoint}
          >
            Add Entry Point
          </button>
        </div>
      </div>
      <h5 className="text-center mt-5">Select an Entry Point</h5>
      <div className="d-flex flex-wrap h-100 w-100 justify-content-center mt-1 gap-3">
        {entryPoints?.map((point: any) => (
          <div
            className="d-flex flex-column customCard h-25 w-15 p-1"
            key={point.id}
          >
            <button
              className="bg-transparent align-self-end"
              onClick={() => doDeleteEntryPoint(point.id)}
            >
              <HiOutlineTrash size={20} className="colorGray" />
            </button>

            <div className="d-flex flex-column align-items-center justify-content-between h-100">
              <div className="circleLbl mt-2">
                <label style={{ fontSize: 60 }}>{point?.id}</label>
              </div>

              <button
                className="outline-button-checked bg-transparent w-100"
                style={{ height: 30 }}
                onClick={() => {
                  setSelectedEp(point.id);
                  setModal((modal) => ({ ...modal, list: !modal.list }));
                }}
              >
                Enter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
