export const ErrorMsg = {
    empty_error: '',
} as const;

export type ErrorMsg = typeof ErrorMsg[keyof typeof ErrorMsg];

export interface ErrorType {
    priority: number;
    exception: ErrorMsg | null;
    extra: HTMLInputElement[];
}
export enum URLTypes {
    get_events = "http://77.234.215.138:60866/spbgo/api/events?offset=0&limit=20",
    sign_up = "http://77.234.215.138:60866/spbgo/api/signup",
    sign_in = "http://77.234.215.138:60866/spbgo/api/signin",
    get_profile = "http://77.234.215.138:60866/spbgo/api/profile"
}