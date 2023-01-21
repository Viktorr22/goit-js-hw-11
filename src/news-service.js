export default class NewsApiService {
    constructor() { };

    async fetchPicture(findValue) {
    const search = await axios.get(`${BASE_URL}?key=${KEY}&q=${findValue}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
       console.log(search); 
    if (search.status !== 200) {
        throw new Error(search.statusText);
        }   
        
      
    const response = await search.data;
        console.log(response);
        if (response.hits.length === 0) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    return response;   

}
}