export async function fetchTMDB<T = any>(url: string, options: RequestInit = {}): Promise<T> {
    const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

    if (!token) throw new Error('TMDB_API_READ_ACCESS_TOKEN is not set');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: token,
        },
        ...options, // allow passing additional fetch options like `next`
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    return response.json();
}
