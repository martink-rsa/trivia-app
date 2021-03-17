declare const log: ((...params: any[]) => void) & {
    info: (...params: any[]) => void;
    i: (...params: any[]) => void;
    error: (...params: any[]) => void;
    e: (...params: any[]) => void;
    success: (...params: any[]) => void;
    s: (...params: any[]) => void;
    warn: (...params: any[]) => void;
    w: (...params: any[]) => void;
};
export default log;
