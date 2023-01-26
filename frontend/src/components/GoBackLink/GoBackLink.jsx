import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export const GoBackLink = ({ linkPath }) => {
  return (
    <div className="default-text flex h-max items-center gap-2 px-4">
      <FaChevronLeft />
      <Link to={linkPath}>Go back</Link>
    </div>
  );
};
