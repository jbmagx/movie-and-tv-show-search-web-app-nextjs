export default async function searchTMDB(url: string) {
    const token = process.env.TMDB_API_READ_ACCESS_TOKEN;

    if (!token) {
        throw new Error('TMDB_API_READ_ACCESS_TOKEN is not set');
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: token,
        },
    });

    if (!response.ok) throw new Error('failed to fetch data');

    return response.json();
}
