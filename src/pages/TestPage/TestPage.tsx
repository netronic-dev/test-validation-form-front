import { Link } from "react-router-dom";

const TestPage = () => {
  return (
    <div className="flex flex-col">
      <Link to="/" className="text-[red]">
        Form page
      </Link>
      <h1 className="text-[30px]"> TestPage</h1>
    </div>
  );
};

export default TestPage;
