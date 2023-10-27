import dbProvider from "./dbUtil.js";

export default {
    data() {
        return {
            top5Movies: []
        }
    },
    methods: {
        sendIdMovie(id) {
            this.$emit("sendIdMovie", id);
        },
    },
    props: {
        isDarkMode: {
            type: Boolean,
            required: true,
        },
    },
    created() {
        (async () => {
            try {
                const response = await dbProvider.fetch('get/topboxoffice/?per_page=5&page=1');
                this.top5Movies = response.items;
            } catch (error) {
                console.error(error);
            }
        })();
    },
    mounted() {
        
    },
    template: `
    <div id="carousel-big" :class="{ 'bg-light': !isDarkMode, 'bg-dark': isDarkMode }">
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                    class="active"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" v-for="index in [1, 2, 3, 4]"
                    :data-bs-slide-to="index"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item" v-for="(movie, index) in this.top5Movies" :key="movie.id"
                    :class="{ active: index === 0 }" @click="sendIdMovie(movie.id)">
                    <img :src="movie.image" class="d-block w-100" />
                    <div class="carousel-big-item-title w-100 py-1 px-2"
                        :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                        <span>{{ movie.fullTitle }}</span>
                        <span>Rating: {{ movie.ratings.imDb }}/10</span>
                        <span>Duration: {{ movie.runtimeMins }} mins</span>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" ariahidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `
}