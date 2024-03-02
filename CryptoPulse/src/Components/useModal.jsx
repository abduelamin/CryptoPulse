import React from "react";

const useModal = () => {
  const openModal = () => {
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    modalContainer.appendChild(overlay);

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
    modalContent.textContent =
      "The Coin You Are Looking For Does Not Exist OR It Has Been Delisted";

    const closeButton = document.createElement("button");
    closeButton.className = "modal-button";
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      document.body.removeChild(modalContainer);
    });

    modalContent.appendChild(closeButton);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    modalContent.focus();
  };
  return { openModal };
};

export default useModal;
