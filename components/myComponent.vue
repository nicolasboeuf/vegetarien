<template>

	<div id="myComponent">
  
  </div>


</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "myComponent",

  components: {
  },

  props: [
  ],

  data: () => ({

  }),


  computed: {

    ...mapState({
      log : state => state.log, 
      locales : state => state.locales,
      localeCode : state => state.locale,

      myData : state => state.data.data,
    }),

    ...mapGetters({
      
    }),

  },

  methods: {
  },


}

</script>

<style lang="scss">

  @import "~assets/scss/_variables.scss";
  @import "~assets/scss/_browsers.scss";

  #myComponent{
  	position: relative;
  	width: 100%;
  	height: 75px;
    background-color: red;
  }
  
  @media screen and (min-width: 768px){

  	#myComponent{
  	
    }

  }

</style>

