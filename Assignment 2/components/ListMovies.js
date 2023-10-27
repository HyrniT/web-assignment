export default {
    data() {
        return {
            currentPage: 1,
            arrayNumber: [],
            moviePages: [],
        }
    },
    props: {
        movies: {
            type: Array,
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
        handlePagination(number) {
            this.currentPage = number;
            this.updateMoviePages();
        },
        handlePaginationNext() {
            const max = this.arrayNumber[this.arrayNumber.length - 1];
            if (this.currentPage < max) {
                this.currentPage++;
                this.updateMoviePages();
            }
        },
        handlePaginationPrevious() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateMoviePages();
            }
        },
        updateMoviePages() {
            this.moviePages = this.movies.slice(6 * (this.currentPage - 1), 6 * this.currentPage);
        },
    },
    created() {
        let n = Math.ceil(this.movies.length / 6);
        for (let i = 1; i <= n; i++) {
            this.arrayNumber.push(i);
        }

        this.updateMoviePages();
    },
    mounted() {
        if ($(".page-link").length) {
            $(".page-link").eq(this.currentPage - 1).addClass("page-link-clicked");
        }
    },
    template: `
    <div class="list-movies py-2" :class="{ 'bg-light': !isDarkMode, 'bg-dark': isDarkMode }">
        <div class="row mx-2">
            <div class="col-4" v-for="movie in moviePages" :key="movie.id" @click="sendIdMovie(movie.id)">
                <div class="list-movies-item my-2 rounded" :class="{ 'bg-light': !isDarkMode, 'bg-dark': isDarkMode }">
                    <img :src="movie.image" alt="" class="list-movies-item-img mb-2" />
                    <div class="list-movies-item-title mb-2"
                        :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                        {{ movie.title }}
                    </div>
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
                            <a class="page-link" @click="handlePagination(number)"
                                :class="{ active: currentPage === number }">
                                {{ number }}
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
    `
}