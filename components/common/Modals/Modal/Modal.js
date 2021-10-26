import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import Image from "next/image";

// Create Document Component
export default function Modal({ show, children, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div>
        <div className={styles.closeHeader}>
          <a href="#" onClick={handleClose}>
            <Image
              src="/images/close.svg"
              alt="close"
              className={styles.close}
              width="20"
              height="20"
            />
          </a>
        </div>
        {children}
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("my-element")
    );
  } else {
    return null;
  }
}
