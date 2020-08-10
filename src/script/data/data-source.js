const api_key = "347b5a9b833c7d6e9204afe6d6ddc4a2";
// let category = "Movies";
class DataSource {
  static getDiscover() {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`
      )
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.results) {
          return Promise.resolve(responseJson.results);
        } else {
          return Promise.reject(`Opsss ${err}`);
        }
      });
  }

  static informationDetail() {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}`)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        let movies = responseJson.results;
        let datas = movies.forEach((movie) => {
          fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${api_key}&language=en-US`)
            .then((response) => {
              return response.json();
            })
            // Masih Error
            .then((responseJson) => {
              return Promise.resolve(responseJson);
            })
        })
        return datas;
      });
  }

  static getTopRated() {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US`
      )
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => {
        if (responseJson.results) {
          return Promise.resolve(responseJson.results);
        } else {
          return Promise.reject(`Oppsss err`);
        }
      });
  }
}

export default DataSource;