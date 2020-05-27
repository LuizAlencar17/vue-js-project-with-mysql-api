<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 200px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">{{name_user}}</h1>
                        <p class="text-white mt-0 mb-5"></p>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img src="img/theme/team-4-800x800.jpg" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <span class="heading"></span>
                                            <span class="description"></span>
                                        </div>
                                        <div>
                                            <span class="heading"></span>
                                            <span class="description"></span>
                                        </div>
                                        <div>
                                            <span class="heading"></span>
                                            <span class="description"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Add a new user</h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">User information</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Name"
                                                        placeholder="Name"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.name"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.address"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Telephone"
                                                        placeholder="Telephone"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.fone"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="col text-right">
                                            <base-button type="primary" size="sm" v-on:click="creating_user()">Create user</base-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import url from '../data.js';

export default {
    name: 'user-profile',
    data() {
      return {
        model: {
          name: '',
          address: '',
          fone: '',
        },
        id: '',
        name_user: '',
      }
    },
    mounted() {

    },
    methods: {
        creating_user: function() {
            let self = this;
            var condition_1 = this.model.name.length > 2 && this.model.name.length < 50;
            var condition_2 = this.model.address.length > 2 && this.model.address.length < 80;
            var condition_3 = this.model.fone.length > 8 && this.model.fone.length < 30;

            if(condition_1 && condition_2 && condition_3){
                axios.post(url+'/register_user', {
                    name: this.model.name,
                    address: this.model.address,
                    fone: this.model.fone,
                })
                .then(function (response) {
                    //window.location.reload();
                    console.log(response);
                    self.name_user = "Successfully Created!";
                })
                .catch(function (error) {
                    console.log(error);
                });
            }else{
                self.name_user = "Invalid data!";
            }
       
            
        }
    },
  };
</script>
<style></style>
