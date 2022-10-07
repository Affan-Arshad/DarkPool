import useInvestorStore from "../store/investorsStore";
import { Link } from "react-router-dom";

const InvestorListItem = (props) => {
    const { investor } = props;
    const deleteInvestor = useInvestorStore((state) => state.deleteInvestor);

    const handleDelete = () => {
        deleteInvestor(investor.id);
    };
    return (
        <div className="flex justify-between border-b items-center">
            <Link to={`/Investors/${investor.id}`}>
                <h1>{investor.name}</h1>
            </Link>
            <button className="p-1" onClick={handleDelete}>
                x
            </button>
        </div>
    );
};

export default InvestorListItem;
