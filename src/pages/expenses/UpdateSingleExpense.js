import { useParams } from "react-router";
import CustomPortalPage from "../../components/CustomPortal";
import AddExpense from "../../components/expenses/AddExpense";

const UpdateSingleExpense = () => {
  const params = useParams();
  return (
    <CustomPortalPage title="Update daily expenses">
      <AddExpense editing={true} expenseID={params.id} />
    </CustomPortalPage>
  );
};

export default UpdateSingleExpense;
