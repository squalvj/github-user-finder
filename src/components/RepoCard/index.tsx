const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
  </svg>
);

type Props = {
  title: string;
  description: string;
  totalStar: number;
};

const RepoCard: React.FC<Props> = ({ title, description, totalStar }) => {
  return (
    <div className="px-2 py-4 bg-[#e0e0e0] text-black">
      <div className="flex justify-between">
        <p className="text-lg font-bold">{title}</p>
        <span className="font-bold text-lg flex gap-2 items-center">
          {totalStar}
          <StarIcon />
        </span>
      </div>

      <p className="text-sm text-left">{description}</p>
    </div>
  );
};

export default RepoCard;
