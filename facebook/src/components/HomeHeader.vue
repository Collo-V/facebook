<template>
  <v-app-bar class="bg-grey-darken-4 text-white">
         <v-img
            lazy-src="../assets/logo.png"
            max-height="80"
            max-width="80"
            src="../assets/logo.png">
        </v-img>
        <div class="quicklinks">
             <router-link :to="{name:'Home'}"><span class="mr-4"><v-icon large>mdi-home</v-icon></span></router-link>
            <span class="mr-4"><v-icon large>mdi-television-play</v-icon></span>
            <span class="mr-4"><v-icon large>mdi-account-group</v-icon></span>
            <span class="mr-4"><v-icon large>mdi-facebook-gaming</v-icon></span>
        </div>
         <span>{{ShowProfile()}}</span><!--INITIATING the showprofile function to access the profile picture and save it in this.profile -->
        <div class="notifs">
             <router-link :to="{name:'profile'}"><span class="profile rounded-pill"><v-avatar size="large" class="bg-grey-darken-4">
                    <img :src="profile">          
            </v-avatar>
            <span class="text-white">{{Name()}}</span></span></router-link>
            <v-badge location="top-right" color="grey-darken-4" dot offset-x="-4" offset-y="4" class="mr-1">
                <v-avatar size="default" class="bg-grey-darken-3">
                    <span><v-icon large>mdi-dots-grid</v-icon></span>          
                </v-avatar>
            </v-badge>
            <v-badge bordered  location="top-right" color="red-accent-3" dot offset-x="2" of class="mr-1" v-show="notif">
                <v-avatar size="default" class="bg-grey-darken-3">
                    <span><v-icon large>mdi-facebook-messenger</v-icon></span>          
                </v-avatar>
            </v-badge>
            <v-badge bordered  location="top-right" color="red-accent-3" dot offset-x="2" of class="mr-1">
                <v-avatar size="default" class="bg-grey-darken-3">
                    <span><v-icon large>mdi-bell</v-icon></span>          
                </v-avatar>
            </v-badge>
            <v-badge bordered  location="top-right" color="red-accent-3" dot offset-x="2" of class="mr-1" @click="Logout()" style="cursor:pointer">
                <v-avatar size="default" class="bg-grey-darken-3">
                    <span><v-icon large>mdi-menu-down</v-icon></span>          
                </v-avatar>
            </v-badge>
        </div>
     </v-app-bar>
</template>

<script>
import {users,auth,posts,storage,profiles} from "../firebase"
export default {
    name:"Homefooter",
    data(){
        return{
            user:'',
            email:'',
            profile:''

        }

    },
    methods:{
        authcheck:function(){
            auth.onAuthStateChanged(user=>{
                var thisuser=this.email=user.email;
                users.get().then((snapshot)=>{
                    snapshot.docs.forEach(doc=>{
                        if(doc.data().email==thisuser){
                            this.user=doc.data().firstname;
                        }
                    })
                })
                // Retrieve profile picture
            })
            },
            Name:function(){
                this.authcheck();
                return this.user
                },
                Logout:function(){
                    auth.signOut();
                    this.$router.push('/login')
                },
                ShowProfile:function(){
                    auth.onAuthStateChanged(user=>{
                        var email=user.email;
                    profiles.get().then(snapshot=>{
                        snapshot.docs.forEach(doc=>{
                        var profile=doc.data();
                        if(profile.user==email){
                        this.profile= profile.profilepic
                        }
                        })
                        if(this.profile==""){
                            this.profile= "https://firebasestorage.googleapis.com/v0/b/facebook-832aa.appspot.com/o/posts%2F1627374203034.png?alt=media&token=0ecb4d74-c3f4-4201-a58b-06062fb15144"
                        }
                    })
                    })
                },
        
    }

}
</script>

<style scoped>
*{box-sizing: border-box;}
.quicklinks{margin: 0 auto;}
.quicklinks span{border-bottom: solid 1px #00f;border-radius:8px;padding: 15px 40px;}
.quicklinks span:hover{background-color: #353333;}
.notifs{float: right;}
.notifs span{padding: 15px 2px;}
.profile:hover{background-color: #353333;}


</style>