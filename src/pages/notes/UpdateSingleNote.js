import { useParams } from "react-router";
import CustomPortalPage from "../../components/CustomPortal";
import AddNote from "../../components/notes/AddNote";

const UpdateSingleNote = () => {
  const params = useParams();
  return (
    <CustomPortalPage title="Updating a note">
      <AddNote editing={true} noteID={params.id} />
    </CustomPortalPage>
  );
};

export default UpdateSingleNote;
