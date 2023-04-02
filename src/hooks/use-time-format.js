import {useEffect, useState} from "react";

const useTimeFormat = (date) => {
    const [formattedTime, setFormattedTime] = useState(null);
    const timeRelativeFormatter = new Intl.RelativeTimeFormat('en-us', {numeric: 'auto'})
    const DIVISIONS = [
        { amount: 60, name: 'seconds' },
        { amount: 60, name: 'minutes' },
        { amount: 24, name: 'hours' },
        { amount: 7, name: 'days' },
        { amount: 4.34524, name: 'weeks' },
        { amount: 12, name: 'months' },
        { amount: Number.POSITIVE_INFINITY, name: 'years' }
    ]
    const formatTimestamp = (date) => {
        let duration = (date - new Date()) / 1000;

        for(let i = 0; i< DIVISIONS.length; i++){
            if(Math.abs(duration) < DIVISIONS[i].amount) {
                return timeRelativeFormatter.format(Math.round(duration), DIVISIONS[i].name);
            }
            duration /= DIVISIONS[i].amount;
        }
    }
    useEffect(() => {
        setFormattedTime(formatTimestamp(new Date(date)));
    }, [date]);
    return formattedTime;
}
export default useTimeFormat;