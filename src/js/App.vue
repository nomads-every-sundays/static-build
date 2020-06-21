<template>
   <div class="main-wrapper">
      <Header></Header>
      <slot></slot>
   </div>
</template>

<script>
    // Components
    import Header from './components/Header.vue';
    import Testing from './components/Testing.vue';

    export default {
        name: 'App',
        components: {
            Header,
        }
    }
</script>