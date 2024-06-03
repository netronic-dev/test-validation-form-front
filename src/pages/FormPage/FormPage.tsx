import { Link } from "react-router-dom";
import { Form } from "../../components/Form";

const FormPage = () => {
  return (
    <>
      <Link to="/test" className="text-[red]">
        Test page
      </Link>
      <Form />
    </>
  );
};

export default FormPage;
