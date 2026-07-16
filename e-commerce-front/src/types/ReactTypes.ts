export type SetReactFunction<T> = React.Dispatch<React.SetStateAction<T>>
export type ReactRef<T> = React.RefObject<T>
export type ReactSetCookieFunction = (name: 'user' | 'admin' | 'token' | 'stoken', value: string, options?: {
    path?: string | undefined;
    expires?: Date | undefined;
    maxAge?: number | undefined;
    domain?: string | undefined;
    secure?: boolean | undefined;
    httpOnly?: boolean | undefined;
    sameSite?: boolean | "none" | "lax" | "strict" | undefined;
    partitioned?: boolean | undefined;
} | undefined) => void