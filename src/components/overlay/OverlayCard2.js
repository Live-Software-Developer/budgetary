import { IconButton } from "@material-ui/core";
import { AnimatePresence, motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { MotionButton } from "../MotionButton";

function OverlayCard2({ children, heading, subheading, controller }) {

  return (
    <AnimatePresence>
      <motion.div initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1 }}
        transition={{ duration: 1 }}
        key={heading}
        className="car card-overlay">
        <div className="card-header bg-white d-flex justify-content-between">
          <h2><strong>{heading}</strong></h2>
          <div>
            <IconButton className="default-color" onClick={controller}>
              <IoClose />
            </IconButton>
          </div>
        </div>
        <div className="card-body d-block">
          <div className="P-3">
            <p className="text-center p-2">{subheading}</p>
            <div className="w-100">
              {children}
            </div>
          </div>
        </div>
        <div className="card-footer bg-white d-flex justify-content-end align-items-center">
          <MotionButton title="Cancel" handler={controller} />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default OverlayCard2