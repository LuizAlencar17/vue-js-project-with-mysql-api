<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow"
                        :class="type === 'dark' ? 'bg-default': ''">
                        <div class="card-header border-0"
                            :class="type === 'dark' ? 'bg-transparent': ''">
                        <div class="row align-items-center">
                            <div class="col">
                            <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
                                {{title}}
                            </h3>
                            </div>
                        </div>
                        </div>

                        <div class="table-responsive">
                        <base-table class="table align-items-center table-flush"
                                    :class="type === 'dark' ? 'table-dark': ''"
                                    :thead-classes="type === 'dark' ? 'thead-dark': 'thead-light'"
                                    tbody-classes="list"
                                    :data="users">
                            <template slot="columns">
                            <th>Id</th>
                            <th>Name</th>
                            <th>address</th>
                            <th>Fone</th>
                            <th></th>
                            </template>

                            <template slot-scope="{row}">
                            <th scope="row">
                                <div class="media align-items-center">
                                <div class="media-body">
                                    <span class="name mb-0 text-sm">{{row.id}}</span>
                                </div>
                                </div>
                            </th>
                            <td class="budget">
                                {{row.name}}
                            </td>
                            <td class="budget">
                                {{row.address}}
                            </td>
                            <td class="budget">
                                {{row.fone}}
                            </td>
                            <td class="text-right">
                                <base-dropdown class="dropdown"
                                            position="right">
                                <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-ellipsis-v"></i>
                                </a>
                                <template>
                                    <a class="dropdown-item" v-on:click="delete_user(row.id)">Delete</a>
                                    
                                    <router-link :to="{ name: 'edit user', params: { id: row.id }, query: { debug: true }}" class="dropdown-item">Edit</router-link>
                                </template>
                                </base-dropdown>
                            </td>

                            </template>

                        </base-table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import url from '../data.js';

export default {
    mounted() {
        this.loading_users();
    },
    methods: {
        delete_user: function(user_id) {
            axios.delete(url+'/delete_user/' + user_id)
            .then(response => {
                this.loading_users();
            });
        },
        loading_users: function() {
            let self = this;
            axios.get(url+'/user').then(function(response){
                self.users = response.data;
            });
        },
    },
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      title: String
    },
    data() {
      return {
        users:[
        ]
      }
    },
}
</script>
<style>
</style>

