import {format, isValid, parse} from "date-fns";
import {ru} from "date-fns/locale";



export const formatToRussianDate = (dateStr: string) => {
    // Try parsing with time first
    let parsed = parse(dateStr, 'dd.MM.yyyy HH:mm', new Date());

    if (!isValid(parsed)) {
        // Try ISO fallback
        parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
    }

    if (!isValid(parsed)) {
        throw new Error(`Invalid date format: ${dateStr}`);
    }

    return format(parsed, 'd MMMM', { locale: ru });
};
