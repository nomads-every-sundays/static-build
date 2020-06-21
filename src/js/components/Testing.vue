<template>
<!--    <img src="./logo.png">-->
    <h1>Hello Vue 3!</h1>
<!--    <button @click="inc">Clicked {{ count }} times.</button>-->
</template>

<script>
    import { ref } from 'vue'

    export default {
        name: 'Testing',
        // setup() {
        //     const count = ref(0)
        //     const inc = () => {
        //         count.value++
        //     }
        //     return {
        //         count,
        //         inc
        //     }
        // }
        mounted() {
            console.log('testing mounted');
        }
    }
</script>
