const { createApp } = Vue

createApp({
    data() {
        return {
            urlApi: 'https://mindhub-xj03.onrender.com/api/amazing',
            events: [],
        }
    },
    created() {
        this.fetchingData()
    },
    mounted() { },
    methods: {
        fetchingData() {
            fetch(this.urlApi)
                .then((response) => response.json())
                .then((apiData) => {
                    console.log(apiData);
                })
            .catch(error => console.log(error.message))
        },
    },
    computed: {
        
    }
}).mount('#app')