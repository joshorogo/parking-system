"use client";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useEntryPointsStore } from "@/store/entryPoints";
import { useParkingSlotStore } from "@/store/parkingSlot";
import { CustomToast } from "@/components/customToast";
import { useRouter } from "next/navigation";

const initialToast = {
  bg: "primary",
  show: false,
  text: "",
};

const EntryPointId = () => {
  //   const data = await fetch("http://localhost:3000/api/entryPoints");
  //   const entryPoints = await data.json();

  const router = useRouter();
  const [toastInfo, setToastInfo] = useState(initialToast);
  const { entryPoints, add, deleteEntry } = useEntryPointsStore(
    (state) => state
  );

  const { parkingSlot } = useParkingSlotStore((state) => state);

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

      <div className="d-flex justify-content-end">
        <button
          className="primary-button w-15 mt-2"
          onClick={() => {
            add({ id: +entryPoints[entryPoints?.length - 1].id + 1 });
            setToastInfo((toast) => ({
              ...toast,
              bg: "success",
              show: true,
              text: `Successfully added a new entry point (${
                +entryPoints[entryPoints?.length - 1].id + 1
              })`,
            }));
          }}
        >
          Park
        </button>
      </div>

      <div className="d-flex flex-wrap h-100 w-100 justify-content-center mt-1 gap-3">
        {parkingSlot?.map((point: any) => (
          <div
            className="d-flex flex-column customCard-occupied w-15 p-1"
            key={point.id}
          >
            <div className="d-flex flex-column align-items-center justify-content-between h-100">
              <div className="circleLbl">
                <label style={{ fontSize: 40 }}>{point?.name}</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntryPointId;
