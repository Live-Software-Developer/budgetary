import { Modal } from "@material-ui/core";
import { OverlayCard } from "../Components";

function OverlayComponent({ children, isOpen, controller, heading, subheading }) {

  return (
    <Modal isOpen={isOpen}
      open={isOpen}
      onClose={e => controller()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <OverlayCard heading={heading} subheading={subheading} controller={controller}>
        {children}
      </OverlayCard>
    </Modal>
  )
}

export default OverlayComponent