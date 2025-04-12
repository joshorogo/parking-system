"use client";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useEntryPointsStore } from "@/store/entryPoints";
import { CustomToast } from "@/components/customToast";
import { useRouter } from "next/navigation";

const initialToast = {
  bg: "primary",
  show: false,
  text: "",
};

const Home = () => {
  //   const data = await fetch("http://localhost:3000/api/entryPoints");
  //   const entryPoints = await data.json();

  const router = useRouter();
  const [toastInfo, setToastInfo] = useState(initialToast);
  const { entryPoints, add, deleteEntry } = useEntryPointsStore(
    (state) => state
  );

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
          className="primary-button w-25 mt-2"
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
          Add Entry Point
        </button>
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
                  router.push(`/${point.id}`);
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
