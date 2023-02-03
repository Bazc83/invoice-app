import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export function GoBackLink({ linkPath }) {
  return (
    <div className="default-text flex h-max items-center gap-2  text-sm">
      <FaChevronLeft />
      <Link to={linkPath}>Go back</Link>
    </div>
  );
}

export default GoBackLink;
