import dbProvider from "./dbUtil.js";

export default {
    data() {
        return {
            movies: [],
            arrayStep3: [ 0, 3, 6, 9, 12 ]
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        idCarousel: {
            type: String,
            required: true
        },
        className: {
            type: String,
            required: true,
            default: ""
        },
        isDarkMode: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        sendIdMovie(id) {
            this.$emit("sendIdMovie", id);
        },
    },
    created() {
        (async () => {
            try {
                const response = await dbProvider.fetch(`get/${this.className}/?per_page=15&page=1`);
                this.movies = response.items;
            } catch (error) {
                console.error(error);
            }
        })();
    },
    mounted() {
        
    },
    template: `
    <div id="carousel-small" class="my-3" :class="{ 'bg-light': !isDarkMode, 'bg-dark': isDarkMode }">
        <div class="carousel-small-title mb-1" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
            {{ this.title }}
        </div>
        <div :id="this.idCarousel" class="carousel slide px-3" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" :data-bs-target="'#' + this.idCarousel" data-bs-slide-to="0" class="active"></button>
                <button type="button" :data-bs-target="'#' + this.idCarousel" v-for="index in [1, 2, 3, 4]"
                    :data-bs-slide-to="index"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item" v-for="index in this.arrayStep3" :class="{ active: index == 0 }">
                    <div class="row">
                        <div class="col-4" v-if="this.movies[index]" :id="this.movies[index].id">
                            <a @click="sendIdMovie(this.movies[index].id)">
                                <img :src="this.movies[index].image" class="carousel-small-img" />
                            </a>
                        </div>
                        <div class="col-4" v-if="this.movies[index + 1]" :id="this.movies[index + 1].id">
                            <a @click="sendIdMovie(this.movies[index + 1].id)">
                                <img :src="this.movies[index + 1].image" class="carousel-small-img" />
                            </a>
                        </div>
                        <div class="col-4" v-if="this.movies[index + 2]" :id="this.movies[index + 2].id">
                            <a @click="sendIdMovie(this.movies[index + 2].id)">
                                <img :src="this.movies[index + 2].image" class="carousel-small-img" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" :data-bs-target="'#' + this.idCarousel"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" :data-bs-target="'#' + this.idCarousel"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `
}