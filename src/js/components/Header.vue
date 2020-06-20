<template>
    <h1>Testing Header Component</h1>
</template>

<script>
    export default {
        name: 'Header',
        methods: {
            testing() {
                console.log('testing header')
            }
        },
        mounted() {
            this.testing();
        }
    }
</script>
