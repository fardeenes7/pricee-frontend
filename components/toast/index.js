import { toast } from "react-hot-toast";
export default function index(
  title,
  status = "info",
  message = "",
  goTo = false
) {
  //   const { title } = props;
  //   const message = props.message || "";
  //   const status = props.status || "info";
  const handleButtonClick = () => {
    if (goTo === "reload") {
      window.location.reload();
    } else if (goTo) {
      window.location.href = goTo;
    } else {
      toast.dismiss(t.id);
    }
  };
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
    >
      <div className="w-0 flex-1 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {status === "error" && (
              <i className="fa-solid fa-circle-xmark text-red-500"></i>
            )}
            {status === "success" && (
              <i className="fa-solid fa-circle-check text-green-500"></i>
            )}
            {status === "info" && (
              <i className="fa-solid fa-circle-info text-blue-500"></i>
            )}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => handleButtonClick(t.id)}
          className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {goTo === "reload" ? "Refresh" : "Close"}
        </button>
      </div>
    </div>
  ));
}
