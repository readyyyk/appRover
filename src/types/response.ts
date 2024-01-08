export type IApiResponse<T> =
    | { success: true; data: T }
    | { success: false; message: string };
