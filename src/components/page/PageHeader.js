import { IconButton } from "@material-ui/core";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function PageHeader({ page_title, icon, link_to, click }) {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="page-header bg-white mt-0 pt-0 d-none d-md-block" style={{ zIndex: 999, top: '80px' }}>

      <div className="d-flex h-100 align-items-center px-2">

        <div>
          <IconButton onClick={goBack} color='secondary'>
            <IoChevronBackSharp size={26} />
          </IconButton>
        </div>

        <div className="px-3">
          <h4 className="my-auto text-capitalize controlled-header">{page_title}</h4>
        </div>

        <div className="ml-auto">
          <Link to={link_to ? link_to : '/'}>
            <IconButton color='secondary' onClick={e => click && click()}>
              {icon}
            </IconButton>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default PageHeader