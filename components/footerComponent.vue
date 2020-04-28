<template>

	<div id="footer">

    <div id="valide_selection" :class="(userRecettes.length>0)?'active':''" v-if="appState=='selection'" @click="valideSelection()">
      <p>Valider</p>
    </div>
    
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

      appState : state => state.appState,

      recettes : state => state.recettes,
      ingredients : state => state.ingredients,
      userRecettes : state => state.userRecettes,
    }),

    ...mapGetters({
      
    }),

  },

  methods: {

    valideSelection(){
      var self = this
      this.$store.commit("changeAppState","liste")
    }
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
    #valide_selection{
      width: 90px;
      height: 40px;
      background-color: $grey;
      color:$strongGrey;
      font-family: "robotomedium";
      border-radius: 5px;
      position: absolute;
      left:50%;
      top:50%;
      @include transform(translate(-50%,-50%));
      font-size: 20px;
      p{
        display: table-cell;
        position: absolute;
        left:50%;
        top:50%;
        @include transform(translate(-50%,-50%));
      }
      &.active{
        background-color: black;
        color:white;
      }
    }
  }
  
  @media screen and (min-width: 768px){

  	#footer{
  	
    }

  }

</style>

