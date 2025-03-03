export function convertRuntime(minutes: number): { hours: number; remainingMinutes: number } {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return { hours, remainingMinutes };
}
