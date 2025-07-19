import { toast, type ToastOptions } from "react-toastify";

const toastProperties: ToastOptions = {
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
};
const toastStyle: ToastOptions["style"] = {
  borderRadius: 5,
  borderWidth: 2,
};

export function toastSuccess(text: string) {
  return toast.success(text, {
    ...toastProperties,
    style: {
      ...toastStyle,
      borderColor: "#81c784",
    },
    progressClassName: "bg-[#81c784]",
  });
}

export function toastError(text: string) {
  return toast.error(text, {
    ...toastProperties,
    style: {
      ...toastStyle,
      borderColor: "#e57373",
    },
  });
}

export function toastInfo(text: string) {
  return toast.info(text, {
    ...toastProperties,
    style: { ...toastStyle, borderColor: "#4fc3f7" },
  });
}

export function toastWarn(text: string) {
  return toast.warn(text, {
    ...toastProperties,
    style: {
      ...toastStyle,
      borderColor: "#ffb74d",
    },
  });
}
