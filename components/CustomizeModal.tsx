"use client";

import Toolbar from "./Toolbar";
import CanvasEditor from "./CanvasEditor";

type Props = {
  open: boolean;
  onClose: () => void;
  product: any;
};

export default function CustomizeModal({ open, onClose, product }: Props) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <div className="modal-header">
          <h2 className="text-lg font-bold text-center">
            Customize Product
          </h2>
        </div>

        <div className="modal-body">
          <Toolbar onClose={onClose} product={product} />
         <CanvasEditor product={product} />
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="product-btn btn-pink">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}