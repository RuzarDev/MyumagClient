import {eachDayOfInterval, parse, format, eachMonthOfInterval} from 'date-fns';
import { ru } from 'date-fns/locale';
import {getTotalAmountPerDate} from "@/lib/utils";
type DateValue = {
    date: string;
    value: number;
};

export const buildDateValueMap = (
    startDate: Date,
    endDate: Date,
    orders: [],
    type: 'day' | 'month'
): DateValue[] => {
    const totalAmountPerDate = getTotalAmountPerDate(orders, type);
    const dateFormat = type === 'day' ? 'd MMMM' : 'MMMM';

    const intervals =
        type === 'day'
            ? eachDayOfInterval({ start: startDate, end: endDate })
            : eachMonthOfInterval({ start: startDate, end: endDate });

    return intervals.map(date => {
        const key = format(date, type === 'day' ? 'yyyy-MM-dd' : 'yyyy-MM');
        const totalAmount = totalAmountPerDate[key] ?? 0;

        return {
            date: format(date, dateFormat, { locale: ru }),
            value: totalAmount
        };
    });
};
