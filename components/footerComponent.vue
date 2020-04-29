<template>

	<div id="footer" :class="(appState==='liste')?'liste':''">

    <div id="valide_selection" :class="(userRecettes.length>0)?'active':''" v-if="appState=='selection'" @click="valideSelection()">
      <p>Valider</p>
    </div>

    <div id="edit_liste" v-if="appState==='liste'">
      
      <textarea id="user_input" placeholder="Ajouter un achat" @input="testInput($event.target.value)"></textarea>
      <div id="send_input_btn" :class="(user_input!='')?'active':''" @click="send_input()"><p>Ajouter</p></div>

      <div class="export_btn" id="pdf_btn"><p>PDF</p></div>
      <div class="export_btn" id="mail_btn"><p>Mail</p></div>

    </div>

    <div id="credis_btn" @click="displayCredit()">À propos</div>
    
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

  data() {
    return {
      user_input:"",
    }
  },


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
    },

    testInput(value){
      var self = this
      this.user_input = value
    },

    send_input(){
      var self = this
      this.$store.commit("inputNewIngredient",this.user_input)
      this.user_input = ''
      document.querySelector("#user_input").value = ''
      
    },

    displayCredit(){
      var self = this
      this.$store.commit("changePopUpState",true)
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
  	height: 90px;
    bottom: 0;
    background-color: $white;
    &.liste{
      height: 140px;
    }
    #valide_selection{
      width: 90px;
      height: 40px;
      background-color: $yellow;
      color:$strongGrey;
      font-family: "robotomedium";
      border-radius: 5px;
      position: absolute;
      left:50%;
      top:50%;
      @include transform(translate(-50%,-50%));
      margin-top: -10px;
      font-size: 20px;
      opacity: 0.55;
      p{
        display: table-cell;
        position: absolute;
        left:50%;
        top:50%;
        @include transform(translate(-50%,-50%));
        color:$white;
      }
      &.active{
        background-color: $orange;
        opacity: 1;
        cursor: pointer;
      }
    }
    #edit_liste{
      width: 375px;
      position: absolute;
      left:50%;
      @include transform(translate(-50%,0));
      #user_input{
        background: white;
        width: 245px;
        height: 35px;
        position: absolute;
        top:16px;
        left:16px;
        resize:none;
        border-radius: 5px;
        font-family: "robotoregular";
        padding-left:5px;
        padding-top: 6px;
      }
      #send_input_btn{
        width: 75px;
        height: 35px;
        background-color: $yellow;
        font-family:"robotoregular";
        font-size: 15px;
        color:$white;
        position: absolute;
        right:16px;
        top:16px;
        border-radius: 5px;
        opacity: 0.55;
        &.active{
          background-color: $orange;
          color:white;
          opacity: 1;
          cursor: pointer;
        }
        p{
          display: table-cell;
          position: absolute;
          left:50%;
          top:50%;
          @include transform(translate(-50%,-50%));
          margin-top: -2px;
        }
      }
      .export_btn{
        width: 75px;
        height: 35px;
        background-color: $blue;
        font-family:"robotoregular";
        font-size: 15px;
        color:white;
        position: absolute;
        border-radius: 5px;
        top:70px;
        left:50%;
        @include transform(translate(-50%,0));
        cursor: pointer;
        p{
          display: table-cell;
          position: absolute;
          left:50%;
          top:50%;
          @include transform(translate(-50%,-50%));
          margin-top: -2px;
          color:$white;
        }
        &#pdf_btn{
          margin-left: -45px;
        }
        &#mail_btn{
          margin-left: 45px;
        }
      }
    }
    #credis_btn{
      position: absolute;
      color:$blue;
      bottom: 10px;
      font-family: "robotomedium";
      text-align: center;
      width: 100%;
      display: block;
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  
  @media screen and (min-width: 768px){

  	#footer{
  	
    }

  }

</style>

