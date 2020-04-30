<template>

	<div id="footer" :class="[(appState==='liste')?'liste':'',(mailPopUp==true)?'mailopen':'']">

    <div id="valide_selection" :class="(userRecettes.length>0)?'active':''" v-if="appState=='selection'" @click="valideSelection()">
      <p>Valider</p>
    </div>

    <div id="edit_liste" v-if="appState==='liste'">
      
      <textarea id="user_input" placeholder="Ajouter un achat" @input="saveInput($event.target.value)"></textarea>
      <div id="send_input_btn" :class="(user_input!='')?'active':''" @click="send_input()"><p>Ajouter</p></div>

      <div class="export_btn" @click="savePDF()" id="pdf_btn"><p>Télécharger</p></div>
      <!-- <div class="export_btn" @click="(mailPopUp=true)" id="mail_btn"><p>Mail</p></div> -->

    </div>

    <div id="mail_modale">

      <div id="mail_modale_close" @click="(mailPopUp=false)"></div>
      <span id="mail_modale_title">Indiquez votre adresse mail</span>
      <textarea id="mail_input" placeholder="votre adresse mail" @input="saveMailInput($event.target.value)"></textarea>
      <div id="send_mail_btn" :class="[(user_mail!='')?'active':'',(mailSend)?'validate':'']" @click="sendMail()">
        <div class="send_mail_txt" data-txt="send">Envoyer</div>
        <div class="send_mail_txt" data-txt="feedback">C'est parti !</div>
      </div>
      <span id="mail_modale_notice">Nous ne conservons pas votre adresse mail</span>

    </div>

    <div id="credis_btn" @click="displayCredit()">À propos</div>

  </div>


</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import jsPDF from 'jspdf'

export default {

  name: "footerComponent",

  components: {
  },

  props: [
  ],

  data() {
    return {
      user_input:"",
      mailPopUp:false,
      user_mail:"",
      mailSend:false
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
      userInputedIngredient : state => state.userInputedIngredient,

      deletedIngredient: state => state.deletedIngredient,
      deletedInputedIngredient: state => state.deletedInputedIngredient,

    }),

    ...mapGetters({
      
    }),

  },

  methods: {

    valideSelection(){
      var self = this
      if(this.userRecettes.length!=0){
        this.$store.commit("changeAppState","liste")
      }
    },

    saveInput(value){
      var self = this
      this.user_input = value
    },

    saveMailInput(value){
      var self = this
      this.user_mail = value
    },

    send_input(){
      var self = this
      if(this.user_input!=''){
        this.$store.commit("inputNewIngredient",this.user_input)
        this.user_input = ''
        document.querySelector("#user_input").value = ''
      }
      
    },

    displayCredit(){
      var self = this
      this.$store.commit("changePopUpState",true)
    },

    sendMail(){
      var self = this
      this.mailSend = true
      
      let request =  axios.post('../vegetarien/sendMail.php', {
          usermail: this.user_mail,
          messageTXT: 'test mail recette'
        })
        .then(function (response) {
          console.log("response")
          console.log(response)
        })
        .catch(function (error) {
          console.log("error")
          console.log(error)
        });
    },

    savePDF(){

      var self = this
      let pdfName = 'liste' 
      var doc = new jsPDF({
        format: "a5"
      })

      var tabIngredient = []

      var firstPage = true

      _.each(this.userRecettes,function(r){

        var recette = _.find(self.recettes,function(o){return o["id"]===r})
        tabIngredient.push("* "+_.truncate(recette["label"],{"length":45,"omission":''})+" *")
        tabIngredient.push("")

        _.each(self.ingredients,function(i){

          if(i["idrecette"]===r){
            var index = self.deletedIngredient.findIndex(x => x["recette"]===r && x["ingredient"]===i["label"]);
            if(index===-1){
              tabIngredient.push("   "+i["label"])
            }
          }

          if(tabIngredient.length > 25){
            if(firstPage){
              firstPage = false
            }else{
              doc.addPage()  
            }
            
            doc.text(tabIngredient, 10, 10);
            tabIngredient = []
          }

        })

        tabIngredient.push("")

      })

      if(this.userInputedIngredient.length>0){

        tabIngredient.push("* Achats supplémentaires *")
        tabIngredient.push("")

        _.each(this.userInputedIngredient,function(i){

          if(self.deletedInputedIngredient.includes(i)){

          }else{
            tabIngredient.push("   "+i)
          }

          if(tabIngredient.length > 25){
            if(firstPage){
              firstPage = false
            }else{
              doc.addPage()  
            }
            
            doc.text(tabIngredient, 10, 10);
            tabIngredient = []
          }

        })

      }

      if(firstPage){
        doc.text(tabIngredient, 10, 10);  
      }else{
        doc.addPage()
        doc.text(tabIngredient, 10, 10);  
      }
      
      doc.save(pdfName + '.pdf');

    },

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
        height: 40px;
        position: absolute;
        top:16px;
        left:16px;
        resize:none;
        border-radius: 5px;
        font-family: "robotoregular";
        padding-left:5px;
        padding-top: 10px;
      }
      #send_input_btn{
        width: 75px;
        height: 40px;
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
          //margin-left: -45px;
          margin-left: 0;
          width: 115px;
          height: 40px;
        }
        &#mail_btn{
          margin-left: 45px;
        }
      }
    }
    #mail_modale{
      display: none;
      width: 340px;
      height: 165px;
      background-color: white;
      border-radius: 5px;
      position: absolute;
      top:50%;
      left:50%;
      @include transform(translate(-50%,-50%));
      margin-top: 20px;
      #mail_modale_title{
        display: block;
        width:100%;
        position: relative;
        text-align: center;
        color:$blue;
        font-family: "robotomedium";
        font-size: 20px;
        margin-top: 10px;
        margin-bottom: 15px;
      }
      #mail_input{
        background: $white;
        width: 310px;
        height: 35px;
        position: relative;
        resize:none;
        border-radius: 5px;
        font-family: "robotoregular";
        padding-left:5px;
        padding-top: 6px;
        left:50%;
        @include transform(translate(-50%,0));
        margin-bottom: 10px;
        text-align: center;
      }
      #send_mail_btn{
        width: 75px;
        height: 30px;
        background-color: $yellow;
        opacity: 0.55;
        border-radius: 5px;
        position: relative;
        left:50%;
        @include transform(translate(-50%,0));
        transition:all 0.3s ease-in-out;
        .send_mail_txt{
          position: absolute;
          left:50%;
          top:50%;
          @include transform(translate(-50%,-50%));
          color:$white;
          font-family: "robotoregular";
          font-size: 15px;
          margin-top: -2px;
          white-space: pre;
          &[data-txt="send"]{
            display: table-cell;
          }
          &[data-txt="feedback"]{
            display: none; 
          }
        }
        &.active{
          background-color: $orange;
          opacity: 1;
          cursor: pointer;
        }
        &.validate{
          background-color: $blue;
          opacity: 1;
          width: 110px;
          .send_mail_txt{
            &[data-txt="send"]{
              display: none;
            }
            &[data-txt="feedback"]{
              display: table-cell; 
            }
          }
        }
      }
      #mail_modale_notice{
        font-family: "robotolight";
        font-size: 12px;
        color:$blue;
        display: block;
        text-align: center;
        width: 100%;
        position: relative;
        margin-top: 10px;
      }
      #mail_modale_close{
        width: 30px;
        height: 30px;
        background-color: white;
        border-radius: 5px;
        position: absolute;
        right: 0;
        top:-40px;
        cursor: pointer;
        &:after{
          content: "";
          width: 20px;
          height: 20px;
          background-image: url("~assets/img/cross-blue.svg"); 
          background-repeat: no-repeat;
          background-position: center center;
          position: absolute;
          left:50%;
          top:50%;
          @include transform(translate(-50%,-50%));
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
    &.mailopen{
      height: 240px;
      #edit_liste{
        display: none;
      }
      #credis_btn{
        display: none;
      }
      #mail_modale{
        display: block;
      }
    }
  }
  
  @media screen and (min-width: 768px){

  	#footer{

    }

  }

</style>

