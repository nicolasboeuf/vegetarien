<template>

  <div>

    <section id='app'>

      <div id="content">

        <h1 v-if="appState=='selection'"> {{$t('app.title')}} </h1>

        <div id="recettes_container" v-if="appState=='selection'">
          <div class="recette_box" v-for="r in recettes" :class="(userRecettes.includes(r['id']))?'selected':''"  @click="addRecette(r['id'])">
            <div class="recette_tickbox"></div>
            <div class="recette_label">{{r.label}}</div>
            </div>
        </div>

        <div id="ingredients_container" v-if="appState=='liste'">
          
          <div class="recette_ingredient_liste" v-for="rID in userRecettes">

            <div class="recette_liste_label" :class="(deletedRecette.includes(rID)?'deleted':'')" @click="deleteEntireRecette(rID)" >{{getRecetteName(rID)}}</div>

            <div class="recette_ingredient" v-for="ingredient in getRecetteIngredient(rID)" :class="testIfDeleted(rID,ingredient)?'':'deleted'" @click="deleteIngredient(rID,ingredient)">

              <div class="trash_btn"></div>
              <div class="ingredient_label">{{ingredient}}</div>
              
            </div>
            
          </div>
        
        <div class="recette_inputed_label" v-if="userInputedIngredient.length>0">Achats supplémentaires</div>
        
          <div class="inputed_ingredient" :class="testIfInputedDeleted(ingredient)?'':'deleted'" @click="deleteInputedIngredient(ingredient)" v-for="ingredient in userInputedIngredient">
            
            <div class="inputed_trash_btn"></div>
            <div class="inputed_ingredient_label">{{ingredient}}</div>

          </div>

        </div>

        

      </div>

      <footerComponent></footerComponent>

     </section>
     
  </div>


</template>


<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import _ from "underscore"
import footerComponent from '~/components/footerComponent.vue'
import { slugify } from '~/utils/slugify'

export default {

  name: "MainIndex",

  components: {
    'footerComponent':footerComponent,
  },

  middleware : [
  ],

  props: [
  ],

  beforeMount : function(){
    var self = this
    let langtest = this.$nuxt.$route.params.lang
    let firstParam = this.$nuxt.$route.params.firstParam
  },

  mounted:function(){

    console.log("app mounted")

  },
  
  data() {
    return {
      slugify:slugify,
      deletedIngredient:[],
      deletedRecette:[],
      deletedInputedIngredient:[]
    }
  },

  computed: {

    ...mapState({
      log : state => state.log, 

      locale : state => state.locale,
      locales : state => state.locales,
      defaultLocale : state => state.defaultLocale,

      appState : state => state.appState,

      recettes : state => state.recettes,
      ingredients : state => state.ingredients,
      userRecettes : state => state.userRecettes,
      userInputedIngredient : state => state.userInputedIngredient,

    }),

    ...mapGetters({

    }),
  },

  methods: {

    addRecette(id){
      var self = this
      if(this.userRecettes.includes(id)){
        this.$store.commit("removeUserRecette",id)
      }else{
        this.$store.commit("addUserRecette",id)
      }
      
    },

    getRecetteName(id){
      var self = this
      var obj = _.find(this.recettes,function(o){return o.id === id})
      return obj.label
    },

    getRecetteIngredient(id){
      var self = this
      var tabIngredients = []

      _.each(this.ingredients,function(i){
        if(i.idrecette==id){
          tabIngredients.push(i.label)
        }
      })

      return tabIngredients
    },

    deleteIngredient(recette,ingredient){
      var self = this
      var objDeleted = {"recette":recette,"ingredient":ingredient}
      var index = this.deletedIngredient.findIndex(x => x["recette"]===recette && x["ingredient"]===ingredient);
      if(index===-1){
        this.deletedIngredient.push(objDeleted)  
      }else{
        this.deletedIngredient.splice(index,1)
      }
    },

    testIfDeleted(recette,ingredient){
      var self = this
      var test = true

      _.each(this.deletedIngredient,function(obj){
        if(obj["recette"]===recette&&obj["ingredient"]===ingredient){
          test = false
        }
      })

      return test
      
    },

    deleteEntireRecette(recetteID){

      var self = this

      var tabIngredients = []

      _.each(this.ingredients,function(i){
        if(i.idrecette==recetteID){
          var obj = {"recette":recetteID,"ingredient":i.label}
          tabIngredients.push(obj)
        }
      })

      if(this.deletedRecette.includes(recetteID)){

        this.deletedRecette.splice(recetteID.indexOf(recetteID),1)

        _.each(tabIngredients,function(o){
          var index = self.deletedIngredient.findIndex(x => x["recette"]===o["recette"] && x["ingredient"]===o["ingredient"]);
          self.deletedIngredient.splice(index,1)
        })


      }else{

        this.deletedRecette.push(recetteID)

        _.each(tabIngredients,function(o){
          var index = self.deletedIngredient.findIndex(x => x["recette"]===o["recette"] && x["ingredient"]===o["ingredient"]);
          if(index===-1){
            self.deletedIngredient.push(o)
          }
        })


      }
    },

    deleteInputedIngredient(ingredient){

      var self = this
      if(this.deletedInputedIngredient.includes(ingredient)){
        this.deletedInputedIngredient.splice(this.deletedInputedIngredient.indexOf(ingredient),1)
      }else{
        this.deletedInputedIngredient.push(ingredient)
      }

    },

    testIfInputedDeleted(ingredient){
      var self = this
      var test = false

      if(this.deletedInputedIngredient.includes(ingredient)){
        test = true
      }

      return test
      
    },

  },

}

</script>

<style lang="scss">

  @import "~assets/scss/_variables.scss";

  #app{
    position: absolute;
    width: 100%;
    height: auto;
    #content{
      h1{
        color:black;
        font-family: "robotomedium";
        font-size:30px;
        line-height: 25px;
        text-align: center;
        margin-top: 30px;
        margin-bottom: 30px;
      }
      #recettes_container{
        display: block;
        height: auto;
        padding-bottom: 75px;
        margin-bottom: 100px;
        .recette_box{
          width:349px;
          background-color: $grey;
          position: relative;
          display: block;
          left:50%;
          @include transform(translate(-50%,0));
          min-height: 40px;
          margin-bottom: 12px;
          border-radius: 5px;
          .recette_tickbox{
            width: 20px;
            height: 20px;
            border:1px solid black;
            box-sizing:border-box;
            border-radius: 5px;
            display: block;
            position:absolute;
            top:50%;
            left:10px;
            @include transform(translate(0,-50%));
            &:after{
              content: "";
              width: 20px;
              height: 20px;
              background-image: url("~assets/img/cross.svg"); 
              background-size: 50% 50%;
              background-repeat: no-repeat;
              background-position: center center;
              position: absolute;
              left:50%;
              top:50%;
              @include transform(translate(-50%,-50%));
              display: none;
            }
          }
          .recette_label{
            font-family: "robotoregular";
            font-size: 20px;
            line-height: 18px;
            margin-left: 40px;
            position: relative;
            display: block;
            padding-top: 10px;
            padding-bottom: 10px;
            padding-right: 20px;
          }
          &.selected{
            background-color: $strongGrey;
            .recette_tickbox{
              border:1px solid white;
              &:after{
                display: block;
              }
            }
            .recette_label{
              color:white;
            }
          }
        }
      }
    }
    #ingredients_container{
      margin-top: 35px;
      padding-left: 25px;
      padding-right: 25px;
      margin-bottom: 150px;
      .recette_ingredient_liste{
        margin-bottom: 20px;
        .recette_liste_label{
          font-family: "robotomedium";
          font-size: 20px;
          margin-bottom: 5px;
          &.deleted{
            text-decoration: line-through;
          }
        }
        .recette_ingredient{
          font-family: "robotoregular";
          font-size: 20px;
          &.deleted{
            .ingredient_label{
              text-decoration: line-through;
            }
            .trash_btn{
              opacity: 0;
            }
          }
          .ingredient_label{
            display: inline-block;
          }
          .trash_btn{
            width: 16px;
            height: 16px;
            display: inline-block;
            background-image: url("~assets/img/trash.svg"); 
            background-position: center center;
            transform:translate(0,2px);
            margin-right: 5px;
          }

        }
      }
      .recette_inputed_label{
        font-family: "robotomedium";
        font-size: 20px;
        margin-bottom: 5px;
      }
      .inputed_ingredient{
        font-family: "robotoregular";
        font-size: 20px;
        &.deleted{
          .inputed_ingredient_label{
            text-decoration: line-through;
          }
          .inputed_trash_btn{
            opacity: 0;
          }
        }
        .inputed_ingredient_label{
          display: inline-block;
        }
        .inputed_trash_btn{
          width: 16px;
          height: 16px;
          display: inline-block;
          background-image: url("~assets/img/trash.svg"); 
          background-position: center center;
          transform:translate(0,2px);
          margin-right: 5px;
        }
      }
    }
    
  }
  
  @media screen and (min-width: 768px){

    #app{
    }

  }

</style>