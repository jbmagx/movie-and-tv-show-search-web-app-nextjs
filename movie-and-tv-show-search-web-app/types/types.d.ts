type MediaBase = {
    id: number;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
};

type Movie = MediaBase & {
    media_type?: 'movie';
    original_title: string;
    release_date: string;
    title: string;
    video?: boolean;
};

type TVShow = MediaBase & {
    media_type?: 'tv';
    first_air_date: string;
    name: string;
    origin_country: string[];
    original_name: string;
};

type TMDBResponse = {
    page: number;
    results: Movie[] | TVShow[];
    total_pages: number;
    total_results: number;
};

type MovieDetails = {
    id: number;
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
        id: number;
        name: string;
        poster_path: string;
        backdrop_path: string;
    } | null;
    budget: number;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

type MovieCredits = {
    id: number;
    cast: MovieCastMember[];
    crew: MovieCrewMember[];
};

type MovieCastMember = {
    id: number;
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | null;
};

type MovieCrewMember = {
    id: number;
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
};

type TVShowDetails = {
    id: number;
    adult: boolean;
    backdrop_path: string;
    created_by: {
        id: number;
        credit_id: string;
        name: string;
        gender: number | null;
        profile_path: string | null;
    }[];
    episode_run_time: number[];
    first_air_date: string;
    genres: {
        id: number;
        name: string;
    }[];
    homepage: string;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        episode_type: string;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: string | null;
    } | null;
    name: string;
    next_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        episode_type: string;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: string | null;
    } | null;
    networks: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    production_companies: {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
    seasons: {
        air_date: string | null;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string | null;
        season_number: number;
        vote_average: number;
    }[];
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
};

type TVShowCredits = {
    cast: TVShowCastMember[];
    crew: TVShowCrewMember[];
};

type TVShowCastMember = {
    id: number;
    adult: boolean;
    character: string;
    credit_id: string;
    gender: number | null;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | null;
};

type TVShowCrewMember = {
    id: number;
    adult: boolean;
    credit_id: string;
    department: string;
    gender: number | null;
    job: string;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
};
