import React from "react";
import { parseISO, format } from "date-fns";
import { ko } from "date-fns/locale";

export default function Date({ dateString }: { dateString: string }) {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, "PPP", { locale: ko })}</time>;
}
