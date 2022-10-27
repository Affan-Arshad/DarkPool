import useInvestorsStore from "../store/investorsStore";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const InvestorsShowPage = () => {
    const { id } = useParams();
    const investorsStore = useInvestorsStore();
    const investor = investorsStore.investor;
    const loading = investorsStore.loading;

    useEffect(() => {
        investorsStore.fetchInvestor(id);

        return () => {
            // cancel
        }
    })

    return (
        <>
            {loading ? <p>Loading...</p> :
                <>
                    {/* Investor Details */}
                    {investor.name} {investor.account_name} {investor.account_no}
                </>
            }
        </>
    );
};

export default InvestorsShowPage;
