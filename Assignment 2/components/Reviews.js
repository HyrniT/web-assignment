import dbProvider from "./dbUtil.js";

export default {
    data() {
        return {
            reviews: []
        }
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
        
    },
    created() {
        (async () => {
            try {
                const response = await dbProvider.fetch(`detail/review/${this.idMovie}`);
                this.reviews = response.items;
            } catch (error) {
                console.error(error);
            }
        })();
    },
    mounted() {

    },
    template: `
    <div class="reviews m-2" :class="{ 'bg-light': !isDarkMode, 'bg-dark': isDarkMode }">
        <div class="row reviews-item py-2" v-for="review in reviews" :key="review.id">
            <div class="col-4" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
                <div class="reviews-user mb-2">
                    <div>
                        {{ review.username }}
                    </div>
                    <div>
                        Reviewed on: {{ review.date }}
                    </div>
                </div>
            </div>
        <div class="col-8" :class="{ 'text-dark': !isDarkMode, 'text-light': isDarkMode }">
            <div class="reviews-content mb-2">
                <div>
                    {{ review.title }}
                </div>
                <div>
                    {{ review.content }}
                </div>
            </div>
        </div>
    </div>
    `
}