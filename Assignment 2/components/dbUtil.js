import data from '../db/data.js';

const dbProvider = {
    fetch: async (request) => {
        const [type, className, patternAndParams] = request.split('/');
        const [pattern, queryParams] = patternAndParams.split('?');

        const params = new URLSearchParams(queryParams);
        const perPage = parseInt(params.get('per_page')) || 60;
        const page = parseInt(params.get('page')) || 1;

        try {
            switch (type) {
                case 'search':
                    const searchTerm = pattern.toLowerCase();

                    if (className === 'movie') {
                        const movies = data.Movies.filter((movie) =>
                            movie.title.toLowerCase().includes(searchTerm) ||
                            movie.actorList.some((actor) =>
                                actor.name.toLowerCase().includes(searchTerm)
                            )
                        );

                        const total = movies.length;
                        const totalPage = Math.ceil(total / perPage);
                        const startIdx = (page - 1) * perPage;
                        const endIdx = Math.min(startIdx + perPage, total);
                        const items = movies.slice(startIdx, endIdx);

                        const result = {
                            search: searchTerm,
                            page,
                            per_page: perPage,
                            total_page: totalPage,
                            total,
                            items,
                        };

                        return result;
                    }

                    if (className === 'name') {
                        const names = data.Names.filter((name) =>
                            name.name.toLowerCase().includes(searchTerm)
                        );

                        const total = names.length;
                        const totalPage = Math.ceil(total / perPage);
                        const startIdx = (page - 1) * perPage;
                        const endIdx = Math.min(startIdx + perPage, total);
                        const items = names.slice(startIdx, endIdx);

                        const result = {
                            search: searchTerm,
                            page,
                            per_page: perPage,
                            total_page: totalPage,
                            total,
                            items,
                        };

                        return result;
                    }
                    break;

                case 'detail':
                    if (className === 'movie') {
                        const movieId = pattern;
                        const movie = data.Movies.find((movie) => movie.id === movieId);
                        if (movie) {
                            return movie;
                        }
                    }

                    if (className === 'name') {
                        const nameId = pattern;
                        const name = data.Names.find((name) => name.id === nameId);
                        if (name) {
                            return name;
                        }
                    }

                    if (className === 'review') {
                        const movieId = pattern;
                        const review = data.Reviews.find((review) => review.movieId === movieId);
                        if (review) {
                            return review;
                        }
                    }

                    if (className === 'actormovies') {
                        const actorId = pattern;
                        const actorMovies = data.Movies.filter((movie) =>
                            movie.actorList.some((actor) => actor.id === actorId)
                        );
                        if (actorMovies) {
                            return actorMovies;
                        }
                    }
                    break;

                case 'get':
                    if (className === 'top50') {
                        const top50Movies = data.Top50Movies;
                        return {
                            page,
                            per_page: perPage,
                            items: top50Movies,
                        };
                    }

                    if (className === 'mostpopular') {
                        const mostPopularMovies = data.MostPopularMovies;
                        return {
                            page,
                            per_page: perPage,
                            items: mostPopularMovies,
                        };
                    }

                    if (className === 'topboxoffice') {
                        const sortedMovies = data.Movies.sort((a, b) => {
                            const grossA = parseFloat(a.boxOffice.cumulativeWorldwideGross.replace(/[^0-9.-]+/g, ''));
                            const grossB = parseFloat(b.boxOffice.cumulativeWorldwideGross.replace(/[^0-9.-]+/g, ''));
                            return grossB - grossA;
                        });
                        const top5Movies = sortedMovies.slice(0, 5);
                        return {
                            page,
                            per_page: 5,
                            items: top5Movies,
                        };
                    }
                    break;

                default:
                    throw new Error('Yêu cầu không hợp lệ.');
            }
        } catch (error) {
            throw error;
        }
    }
};

export default dbProvider;
