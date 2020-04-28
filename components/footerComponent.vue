<template>

	<div id="footer">
    
  </div>


</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  name: "footerComponent",

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

  #footer{
  	position: fixed;
  	width: 100%;
  	height: 75px;
    bottom: 0;
    background-color: $strongGrey;
  }
  
  @media screen and (min-width: 768px){

  	#footer{
  	
    }

  }

</style>

