const api_key = '347b5a9b833c7d6e9204afe6d6ddc4a2';

class DataSource {
  static getMovies(category) {
    return new Promise((resolve, reject) => {
      return fetch(`https://api.themoviedb.org/3/discover/${category}?api_key=${api_key}`)
        .then(response => response.json())
        .then(responseJson => responseJson.results)
        .then(items => {
          this.getGenre(category).then(genres => {
            items = items.map(item => {
              item = this.replaceGenre(item, genres);
              item.date = item.first_air_date || item.release_date;
              item.date = item.date.substr(0, 4);
              return item;
            })
            resolve(items);
          });
        })
        .catch(err => reject(`Opsss ${err}`));
    })
  }

  static getItems(category, type) {
    return new Promise((resolve, reject) => {
      return fetch(`https://apithemoviedb.org/3/${category}/${type}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(responseJson => responseJson.results)
        .then(items => {
          this.getGenre(category).then(genres => {
            items = items.map(item => {
              item = this.repaceGenre(item, genres);
              item.date = item.first_air_date || item.release_date;
              item.date = item.date.substr(0, 4);
            });
            resolve(items);
          })
        })
        .catch(err => reject(`Opsss ${err}`));
    })
  }

  staticGetItem(category, id) {
    return new Promise((resolve, reject) => {
      return fetch(`https://apithemoviedb.org/3/${category}/${id}?api_key=${api_key}&append_to_response=similar%2Ccredits%2Ckeywords`)
        .then(response => response.json())
        .then(responseJson => {
          responseJson.genres = responseJson.genres.map(genre => genre.name).join(", ");
          responseJson.date = responseJson.first_air_date || responseJson.release_date;
          responseJson.similiar = responseJson.similiar.results.slice(0, 5);

          responseJson.keywords = responseJson.keywords.results || responseJson.keywords.keywords;
          responseJson.keywords = responseJson.keywords.map(keyword => keyword.name).join(",  ");

          if (responseJson.created_by) {
            responseJson.directors = responseJson.created_by.map(creator => creator.name).join(", ");
          } else {
            responseJson.directors = responseJson.credits.crew.find(crew => crew.job == "Director").name;
          }
          delete responseJson.credits;
          resolve(responseJson);
        })
        .catch(err => reject(`Opsss ${err}`));
    })
  }

  static getGenre(category) {
    return new Promise((resolve, reject) => {
      fetch(`https://api.themoviedb.org/3/genre/${category}/list?api_key=${api_key}`)
        .then(response => response.json())
        .then(responseJson => {
          let genres = {};
          responseJson.genres.forEach(genre => genres[genre.id] = genre.name);
          resolve(genres);
        })
        .catch(err => reject(`Opsss ${err}`));
    })
  }

  static replaceGenre(item, genres) {
    let genre_id = item.genre_ids[0];
    item.genres = genres[genre_id];
    delete item.genre_ids;

    return item;
  }

  static async loadFeeds() {
    let movie = this.getMovies("movie");
    let tv = this.getMovies("tv");

    return await Promise.all[(movie, tv)];
  }
}

export default DataSource;
