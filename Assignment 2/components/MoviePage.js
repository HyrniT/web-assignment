import dbProvider from "./dbUtil.js";
import Reviews from "./Reviews.js";

export default {
    data() {
        return {
            currentPage: 1,
            arrayNumber: [],
            actorPages: [],
            movie: {},
        }
    },
    components: {
        Reviews
    },
    props: {
        idMovie: {
            type: String,
            required: true,
        },
        isDarkMode: {
            type: Boolean, 
            required: true,
        },
    },
    methods: {
        sendIdActor(id) {
            this.$emit("sendIdActor", id);
        },
        handlePagination(number) {
            this.currentPage = number;
            this.updateActorPages();
        },
        handlePaginationNext() {
            const max = this.arrayNumber[this.arrayNumber.length - 1];
            if (this.currentPage < max) {
                this.currentPage++;
                this.updateActorPages();
            }
        },
        handlePaginationPrevious() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateActorPages();
            }
        },
        updateActorPages() {
            this.actorPages = this.movie.actorList.slice(3 * (this.currentPage - 1), 3 * this.currentPage);
        },
    },
    created() {
        (async () => {
            try {
                const response = await dbProvider.fetch(`detail/movie/${this.idMovie}`);
                this.movie = response;
                if (this.movie && this.movie.actorList && this.movie.ratings.imDb) {
                    let n = Math.ceil(this.movie.actorList.length / 3);
                    for (let i = 1; i <= n; i++) {
                        this.arrayNumber.push(i);
                    }
                    this.updateActorPages();
                } else {
                    console.error("Movie or actorList is undefined.");
                }
            } catch (error) {
                console.error(error);
            }
        })();
    },
    template: `
    <div class="movie-page my-2 p-2" :class="{ 'bg-light': !isDarkMode, 'bg-dark': isDarkMode }">
        <div class="row">
            <img :src="this.movie.image" alt="" class="col-6 movie-page-img">
            <div class="col-6">
                <div class="movie-page-item">
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            Title:
                        </span>
                        <span class="col-9" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            {{ this.movie.title }}
                        </span>
                    </div>
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            Year:
                        </span>
                        <span class="col-9" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            {{ this.movie.year }}
                        </span>
                    </div>
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            Release date:
                        </span>
                        <span class="col-9" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            {{ this.movie.releaseDate }}
                        </span>
                    </div>
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            Length:
                        </span>
                        <span class="col-9" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            {{ this.movie.runtimeStr }}
                        </span>
                    </div>
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            Description:
                        </span>
                        <span class="col-9" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            {{ this.movie.plot }}
                        </span>
                    </div>
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            Genres:
                        </span>
                        <div class="col-9">
                            <div v-for="genre in this.movie.genreList" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                                {{ genre.value }}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                            Director:
                        </span>
                        <div class="col-9">
                            <div v-for="director in this.movie.directorList" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                                {{ director.name }}
                            </div>
                        </div>
                    </div>
                    <div class="row movie-page-actor">
                        <span class="col-3" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">Actor:</span>
                        <div class="col-9">
                            <div class="movie-page-actor-item my-2" v-for="actor in this.actorPages" :id="actor.id" @click="sendIdActor(actor.id)">
                                <img :src="actor.image" alt="">
                                <div :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                                    {{ actor.name }}
                                </div>
                            </div>
                            <div id="pagination">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item" @click="handlePaginationPrevious">
                                            <a class="page-link" aria-label="Previous">
                                                <span aria-hidden="true">&laquo;</span>
                                            </a>
                                        </li>
                                        <li class="page-item" v-for="number in arrayNumber" :key="number">
                                            <a class="page-link" @click="handlePagination(number)" :class="{ active: currentPage === number }">
                                                {{number}}
                                            </a>
                                        </li>
                                        <li class="page-item" @click="handlePaginationNext">
                                            <a class="page-link" aria-label="Next">
                                                <span aria-hidden="true">&raquo;</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Reviews :idMovie="this.idMovie" :isDarkMode="isDarkMode" />
    </div>
    `
}