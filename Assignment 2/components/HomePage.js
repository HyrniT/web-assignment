import CarouselBig from "./CarouselBig.js";
import CarouselSmall from "./CarouselSmall.js";
import ListMovies from "./ListMovies.js";
import MoviePage from "./MoviePage.js";
import ActorPage from "./ActorPage.js";
import dbProvider from "./dbUtil.js";

const app = Vue.createApp({
    data() {
        return {
            keyAPI: 20077,
            isDarkMode: false,
            isLoading: false,
            inputSearch: "",
            resultSearch: [],
            stateComponent: "home",
            idMovieDetail: "",
            idActorDetail: "",
        }
    },
    components: {
        CarouselBig, CarouselSmall, ListMovies, MoviePage, ActorPage
    },
    methods: {
        back() {
            this.isLoading = true;
            this.stateComponent = "";
            setTimeout(() => {
                this.isLoading = false;
                this.stateComponent = "home";
            }, 1000);
        },
        search() {
            this.isLoading = true,
            this.stateComponent = "";
            setTimeout(() => {
                (async () => {
                    try {
                        const response = await dbProvider.fetch(`search/movie/${this.inputSearch}`);
                        this.resultSearch = response.items;
                        this.isLoading = false;
                        this.stateComponent = "search";
                    } catch (error) {
                        console.error(error);
                    }
                })();
            }, 1000)
        },
        getIdMovie(idMovie) {
            this.isLoading = true,
            this.stateComponent = "";
            setTimeout(() => {
                this.isLoading = false;
                this.stateComponent = "detailMovie";
            }, 1000);
            this.idMovieDetail = idMovie;
        },
        getIdActor(idActor) {
            this.isLoading = true,
            this.stateComponent = "";
            setTimeout(() => {
                this.isLoading = false;
                this.stateComponent = "detailActor";
            }, 1000);
            this.idActorDetail = idActor;
        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode;
            localStorage.setItem("darkMode", this.isDarkMode ? "enabled" : "disabled");

            const container = document.querySelector('.container');

            if (this.isDarkMode) {
                container.setAttribute('data-bs-theme', 'dark');
                $('body').css('background-color', '#000000');
            } else {
                container.setAttribute('data-bs-theme', 'light');
                $('body').css('background-color', '#cccccc');
            }

            const elements = container.querySelectorAll('.text-dark, .bg-light, .text-light, .bg-dark');

            elements.forEach(element => {
                if (this.isDarkMode) {
                    element.classList.remove('text-dark', 'bg-light');
                    element.classList.add('text-light', 'bg-dark');
                } else {
                    element.classList.remove('text-light', 'bg-dark');
                    element.classList.add('text-dark', 'bg-light');
                }
            });
        },

    },
    created() {
        
    },
    template: `
    <div class="container" data-bs-theme="light">
        <header class="bg-light px-2 py-3 mb-2 rounded d-flex flex-row align-items-center justify-content-between">
            <div class="text-dark">20120077</div>
            <h5 class="mx-auto text-dark">Movies info</h5>
            <div class="d-flex flex-column">
                <div class="align-self-end text-dark">{{ this.keyAPI }}</div>
                <div class="form-check form-switch">
                    <input v-model="this.isDarkMode" class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" name="mode" @click="toggleDarkMode">
                    <label class="form-check-label text-dark" for="flexSwitchCheckDefault">
                        Dark mode
                    </label>
                </div>
            </div>
        </header>

        <nav class="navbar navbar-expand-lg bg-light rounded mb-2">
            <div class="container-fluid">
                <a class="navbar-brand text-dark" @click="back">Home</a>
                <form class="d-flex" role="Search" v-on:submit.prevent="search">
                    <input class="form-control me-2" type="search" placeholder="Search" v-model="inputSearch">
                    <button class="btn btn-outline-success" @click="search">Search</button>
                </form>
            </div>
        </nav>

        <div id="loader-container" v-if="this.isLoading">
            <div class="loader"></div>
        </div>

        <div v-if="this.stateComponent === 'home'">
            <CarouselBig @sendIdMovie="getIdMovie" :isDarkMode="isDarkMode"/>
            <CarouselSmall @sendIdMovie="getIdMovie" :className="'mostpopular'" :title="'Most Popular'" :idCarousel="'carouselExampleIndicators-most-popular'" :isDarkMode="isDarkMode"/>
            <CarouselSmall @sendIdMovie="getIdMovie" :className="'top50'" :title="'Top Rating'" :idCarousel="'carouselExampleIndicators-top-rating'" :isDarkMode="isDarkMode"/>
        </div>
        <ListMovies v-if="this.stateComponent === 'search'" :movies="this.resultSearch" @sendIdMovie="getIdMovie" :isDarkMode="isDarkMode"/>
        <MoviePage v-if="this.stateComponent === 'detailMovie'" :idMovie="this.idMovieDetail" @sendIdActor="getIdActor" :isDarkMode="isDarkMode"/>
        <ActorPage v-if="this.stateComponent === 'detailActor'" :idActor="this.idActorDetail" @sendIdMovie="getIdMovie" :isDarkMode="isDarkMode"/>

        <footer class="bg-light px-2 py-3 rounded d-flex flex-row align-items-center justify-content-between">
            <div class="text-dark">Copyright &copy; HyrniT</div>
            <h5 class="mx-auto text-dark">20120077</h5>
            <div class="d-flex flex-column">
                <div class="align-self-end text-dark">{{ this.keyAPI }}</div>
                <div class="form-check form-switch">
                    <input v-model="this.isDarkMode" class="form-check-input" type="checkbox" id="flexSwitchCheckFooter" name="mode" @click="toggleDarkMode">
                    <label class="form-check-label text-dark" for="flexSwitchCheckFooter">
                        Dark mode
                    </label>
                </div>
            </div>
        </footer>
    </div>
    `
});

app.mount("#app");