import { useParams } from "react-router";
import AddBudgetReacreated from "../../components/budgets/AddBudgetReacreated";
import CustomPortalPage from "../../components/CustomPortal";

const UpdateSingleBudget = () => {
  const params = useParams();
  return (
    <CustomPortalPage title="Add a budget">
      <AddBudgetReacreated editing={true} budgetID={params.id} />
    </CustomPortalPage>
  );
};

export default UpdateSingleBudget;
