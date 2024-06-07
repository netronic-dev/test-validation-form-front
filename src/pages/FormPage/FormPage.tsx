import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { Form } from "../../components/Form";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormPage = () => {
  return (
    <Container>
      <Link to="/test" className="text-[red]">
        Test page
      </Link>
      <Form />
    </Container>
  );
};

export default FormPage;
