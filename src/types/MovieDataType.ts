interface Rating {
  Source: string;
  Value: string;
}
export type TMovieDataType = {
  readonly Actors: string;
  readonly Awards: string;
  readonly BoxOffice: string;
  readonly Country: string;
  readonly DVD: string;
  readonly Director: string;
  readonly Genre: string;
  readonly Language: string;
  readonly Metascore: string;
  readonly Plot: string;
  readonly Poster: string;
  readonly Production: string;
  readonly Rated: string;
  readonly Ratings: Rating[];
  readonly Released: string;
  readonly Response: string;
  readonly Runtime: string;
  readonly Title: string;
  readonly Type: string;
  readonly Website: string;
  readonly Writer: string;
  readonly Year: string;
  readonly imdbID: string;
  readonly imdbRating: string;
  readonly imdbVotes: string;
};
