import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";

export default function DateComp({ dateString }: { dateString: string }) {
    return <time dateTime={dateString}>{format(new Date(dateString), "PPP", { locale: ko })}</time>;
}
