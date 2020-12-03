import React, { Component } from "react";
import classNames from "classnames";
export default class MovieItem extends Component {
    state = {
        willWatch: false,
    };

    toggleWilWatch = () => {
        this.setState((prevState) => ({ willWatch: !prevState.willWatch }));
    };

    render() {
        const {
            movie,
            removeMovie,
            addMovieToWillWatch,
            deleteMovieFromWillWatch,
        } = this.props;

        const willWatch = this.state.willWatch;
        const getButtonClassNames = (willWatch) => {
            return classNames("btn", {
                "btn-secondary": !willWatch,
                "btn-success": willWatch,
            });
        };
        return (
            <div className="card">
                <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500${
                        movie.backdrop_path || movie.poster_path
                    }`}
                    alt=""
                />
                <div className="card-body">
                    <h6 className="card-title">{movie.title}</h6>
                    <p className="mb-1">Rating: {movie.vote_average}</p>
                    <p className="mb-1">Release: {movie.release_date}</p>
                    <div className="d-flex justify-content-start align-items-center flex-wrap">
                        <button
                            className="btn btn-danger mr-2"
                            type="button"
                            onClick={() => {
                                removeMovie(movie.id);
                            }}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className={getButtonClassNames(willWatch)}
                            onClick={() => {
                                this.toggleWilWatch();
                                willWatch
                                    ? deleteMovieFromWillWatch(movie)
                                    : addMovieToWillWatch(movie);
                            }}
                        >
                            Will Watch
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
