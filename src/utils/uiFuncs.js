export function toastEvent(toastMsg){
    window.dispatchEvent(new CustomEvent("showToast", {detail: toastMsg }));
}