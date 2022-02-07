import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants';

// format number as currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    }).format(amount);

}

const OrderDetails = createContext();   

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
    const context = useContext(OrderDetails);
    if( !context ) {
        throw new Error(
            'useOrderDetails must be used within an OrderDetailsProvider'
        );
    }

    return context;
}

function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    for( const count of optionCounts[optionType].values() ) {
        optionCount += count;
    }
    return optionCount * pricePerItem[optionType];
}


export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map(),
    });

    const zeroCurrency = formatCurrency(0);
    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency,
    });

    //Run useEffect function whenever optionCounts updates
    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
        const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;
        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grantTotal: formatCurrency(grandTotal)
        });
    }, [optionCounts]);

    const value = useMemo(() => {
        function updateItemCount(itemName, newItemCount, optionType) {
            const newOptionCounts = { ...optionCounts };

            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        }

        // getter: object containing option count for scoops and toppings,
        // and subtotals
        // setter: option counts (subtotals and totals will be calculated)
        return [{...optionCounts, totals} , updateItemCount ];
    }, [optionCounts, totals]);

    return <OrderDetails.Provider value={value} {...props} />;
}
