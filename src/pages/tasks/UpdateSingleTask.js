import { useParams } from "react-router";
import CustomPortalPage from "../../components/CustomPortal";
import AddTask from "../../components/tasks/AddTask";

const UpdateSingleTask = () => {
  const params = useParams();
  return (
    <CustomPortalPage title="Updating a task">
      <AddTask editing={true} taskID={params.id} />
    </CustomPortalPage>
  );
};

export default UpdateSingleTask;
