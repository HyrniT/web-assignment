import dbProvider from "./dbUtil.js";

export default {
    data() {
        return {
            actor: {},
            movies: []
        }
    },
    props: {
        idActor: {
            type: String,
            required: true,
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
                const response = await dbProvider.fetch(`detail/name/${this.idActor}`);
                this.actor = response;
            } catch (error) {
                console.error(error);
            }
        })();
        (async () => {
            try {
                const res = await dbProvider.fetch(`detail/actormovies/${this.idActor}`);
                this.movies = res;
                console.log(this.actor);
            } catch (error) {
                console.error(error);
            }
        })();
    },
    template: `
    <div class="movie-page my-2 p-2" :class="{ 'bg-light': !isDarkMode, 'bg-dark': isDarkMode }">
        <div class="row">
            <img :src="this.actor.image" alt="" class="col-6 movie-page-img">
            <div class="col-6">
                <div class="movie-page-item">
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">Name:</span>
                        <span class="col-9" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            {{ this.actor.name }}
                        </span>
                    </div>
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">Summary:</span>
                        <span class="col-9" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            {{ this.actor.summary }}
                        </span>
                    </div>
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">Role:</span>
                        <div class="col-9" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            {{ this.actor.role }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 actor-movies mx-1 p-2">
                <div class="m-5" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">Movies had participated:
                </div>
                <div class="row mx-4">
                    <div class="col-3" v-for="movie in this.movies" :id="movie.id" @click="sendIdMovie(movie.id)">
                        <div class="actor-movies-item" :class="{ 'bg-light': !isDarkMode, 'bg-dark': isDarkMode }">
                            <img :src="movie.image" alt="">
                            <div>
                                <div :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                                    {{ movie.fullTitle }}
                                </div>
                                <div :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                                    Role: Actor
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}