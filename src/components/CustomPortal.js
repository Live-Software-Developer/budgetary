import { IconButton } from "@material-ui/core";
import { Modal } from '@mui/material'
import ReactDOM from "react-dom";
import { useNavigate } from 'react-router'
import { IoIosClose } from 'react-icons/io'


const CustomPortalPage = ({ portal_class, title, children, button_ }) => {
  const navigate = useNavigate()
  const handleClose = () => {
    navigate(-1);
  };
  return ReactDOM.createPortal(
    <div className="">
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="d-flex justify-content-center align-items-center"
      >
        <div className={`custom-portal ${portal_class && portal_class}`}>

          <div className="custom-portal-modal-header d-flex justify-content-between align-items-center px-3" >
            <div>
              <h4>{title}</h4>
            </div>
            <div className='d-flex'>
              {
                button_ && button_
              }
              <IconButton className="bg-danger text-white p-1 mx-2 custom-circle-btn" onClick={handleClose}>
                <IoIosClose size={36} />
              </IconButton>
            </div>
          </div>

          <div className="container-fluid custom-portal-modal-body py-3">
            {children}
          </div>

        </div>
      </Modal>
    </div>
    ,
    document.getElementById('portal')
  )
}

export default CustomPortalPage;