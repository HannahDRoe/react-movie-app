import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
import MovieTable from "./movieTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    moviesPerPage: 4,
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };
  componentDidMount() {
    console.log("mounting");
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres
    });
  }
  handleDelete = movieId => {
    const movies = this.state.movies.filter(m => m._id !== movieId);
    this.setState({ movies });
  };
  toggleLike = movie => {
    //clone state to prevent mutation
    const movies = [...this.state.movies];
    // find index of movie to modify
    const index = movies.indexOf(movie);
    //clone movie from state to modify
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };
  handleGenreChange = genre => {
    console.log("why?");
    this.setState({
      currentPage: 1,
      selectedGenre: genre
    });
  };
  handleSort = sortColumn => {
    this.setState({
      sortColumn
    });
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      currentPage,
      moviesPerPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    if (count === 0)
      return <p className="lead m-4">There are no movies in the database.</p>;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, moviesPerPage);
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreChange}
          />
        </div>
        <div className="col">
          <p className="lead m-4">Showing {filtered.length} in the database</p>
          <MovieTable
            movies={movies}
            onLike={this.toggleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={this.state.sortColumn}
          />
          <Pagination
            totalMovies={filtered.length}
            currentPage={currentPage}
            moviesPerPage={moviesPerPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
