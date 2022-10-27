import create from "zustand";

import { devtools, persist } from "zustand/middleware";
import { v4 } from "uuid";

const investmentsStore = (set) => ({
    investments: [
        {
            id: v4(),
            investor_id: v4(),
            amount: 2154,
            date: new Date()
        }
    ],
    addInvestment: (investment) => {
        investment.id = v4();
        set((state) => ({
            investments: [investment, ...state.investments]
        }));
    },
    deleteInvestment: (investmentId) => {
        set((state) => ({
            investments: state.investments.filter((p) => p.id !== investmentId)
        }));
    }
});

const useInvestmentsStore = create(
    devtools(
        persist(investmentsStore, {
            name: "investments"
        })
    )
);

export default useInvestmentsStore;
