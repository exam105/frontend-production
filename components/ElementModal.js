import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// Create Document Component
export default function ElementModal({ show, children }) {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => setIsBrowser(true), []);
  const paperContent = show ? <div>{children}</div> : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      paperContent,
      document.getElementById("my-element")
    );
  } else {
    return null;
  }
}
