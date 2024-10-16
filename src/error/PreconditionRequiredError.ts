export function preconditionRequired(message: string): never {
    const error = new Error(message);
    (error as any).status = 428;
    throw error;
}