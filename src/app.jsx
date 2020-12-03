import React, { Component } from "react";
import MovieTabs from "./movieTabs";
import MovieItem from "./movieItem";
import Pagination from "./pagination";
import { API_URL, API_KEY_3 } from "./util";

class App extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            moviesWillWatch: [],
            sort_by: "revenue.desc",
            page: 1,
        };
        console.log("constructor");
    }

    componentDidMount() {
        console.log("did mount");
        this.getMovies();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("did update");
        if (prevState.sort_by !== this.state.sort_by) {
            this.getMovies();
        }
        if (prevState.page !== this.state.page) {
            this.getMovies();
        }
    }

    getMovies = () => {
        fetch(
            `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`
        )
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    movies: data.results,
                });
            });
    };

    updateSortBy = (value) => {
        this.setState({
            sort_by: value,
        });
    };

    removeMovie = (id) => {
        const updateMovies = this.state.movies.filter((item) => item.id !== id);
        this.setState({
            movies: updateMovies,
        });
    };

    addMovieToWillWatch = (movie) => {
        const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];
        this.setState({
            moviesWillWatch: updateMoviesWillWatch,
        });
    };

    deleteMovieFromWillWatch = (movie) => {
        const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
            (item) => item.id !== movie.id
        );
        this.setState({
            moviesWillWatch: updateMoviesWillWatch,
        });
    };

    getNextPage = () => {
        this.setState((prevState) => ({ page: prevState.page + 1 }));
    };
    getPreviousPage = () => {
        this.setState((prevState) => ({ page: prevState.page - 1 }));
    };

    render() {
        const movies = this.state.movies;
        const moviesWillWatch = this.state.moviesWillWatch;
        const page = this.state.page;

        console.log("render");
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-9">
                        <div className="row mb-2">
                            <div className="col-12 mb-2">
                                <MovieTabs
                                    sort_by={this.state.sort_by}
                                    updateSortBy={this.updateSortBy}
                                />
                            </div>
                            <div className="col-12">
                                <Pagination
                                    getNextPage={this.getNextPage}
                                    getPreviousPage={this.getPreviousPage}
                                    page={page}
                                />
                            </div>
                        </div>
                        <div className="row mb-4"></div>
                        <div className="row">
                            {movies.map((movie) => (
                                <div className="col-6 mb-4" key={movie.id}>
                                    <MovieItem
                                        movie={movie}
                                        removeMovie={this.removeMovie}
                                        addMovieToWillWatch={
                                            this.addMovieToWillWatch
                                        }
                                        deleteMovieFromWillWatch={
                                            this.deleteMovieFromWillWatch
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-3">
                        <h4>Will Watch: {moviesWillWatch.length} movies</h4>
                        <ul className="list-group">
                            {moviesWillWatch.map((movie) => (
                                <li key={movie.id} className="list-group-item">
                                    <div className="d-flex justify-content-between">
                                        <p>{movie.title}</p>
                                        <p>{movie.vote_average}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
