<template>
    <div id="main-container">
        <div class="row mb-2">
            <div class="col-12 text-center "><img id="logo" src="img/logo.png">
            </div>
        </div>
        <div class="container shadow p-4 mb-5 bg-white rounded">
            <router-link to="/home"
                         class="nav-item nav-link router-link-active"
                         id="main">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-left"
                     role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                     class="fa-lg svg-inline--fa fa-arrow-left fa-w-14">
                    <path fill="currentColor"
                          d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
                          class=""></path>
                </svg>
            </router-link> <!---->
            <div>
                <div class="alert alert-info"><p>You can ask any questions,
                    choosing ticket type</p></div>
                <form id="form">
                    <div class="form-group"><label for="ticket_id"><strong
                    >Select Ticket</strong></label> <select id="ticket_id"
                                                            class="custom-select" >
                        <option v-for="ticket in tickets" v-bind:value="ticket.id">{{ticket.title}}</option>

                    </select></div>
                    <div class="form-group"><label for="topic"><strong
                    >Topic Title</strong></label> <input type="email"
                                                         id="topic" placeholder="Enter Titlle"
                                                         class="form-control"
                                                         v-model="form.title">
                        <div role="alert" class="alert alert-danger" style="display: none;">
                            This is a danger alert—check it out!
                        </div>
                    </div>
                    <div class="form-group"><label for="description"><strong
                    >Topic Description</strong></label> <textarea
                            v-model="form.description"
                            id="description"
                            placeholder="Ask Question..."
                            wrap="soft"
                            class="form-control"
                            style="resize: none; height: 86px;"></textarea>
                        <div role="alert" class="alert alert-danger" style="display: none;">
                            This is a danger alert—check it out!
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-outline-primary btn-block" @click="onSubmit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <button class="btn btn-sm btn-danger btn-block" @click="logout">
            <font-awesome-icon icon="sign-out-alt" />
        </button>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    import {logout} from "../../mixins/logout";

    export default {
        mixins: [logout],
        data() {
            return {
                errors: [],
                errorsShow: false,
                tickets: [],
                form: {
                    title: '',
                    description: '',
                    ticket_id: ''
                }


            }
        },
        beforeCreate: function () {
            let vm = this;

            // console.log(localStorage.getItem('token1'))
            vm.$http.get('tickets/', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token1')
                }
            }).then(response => {
                    return response.body.tickets
                    // vm.$router.push('/home');
                }, response => {

                    // this.$router.push('/');
                }
            ).then(tickets => {
                tickets.forEach(function (key) {
                    vm.tickets.push(key);
                })
            });

        },
        mounted: function () {
            console.log(this.tickets)
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                let vm = this;
                vm.form.ticket_id = document.getElementById('ticket_id').value
                this.$http.post('topics/store/', vm.form).then(response => {


                        // this.$router.push('home');
                        console.log(response);
                    }, response => {

                        if (response.status === 401)
                            vm.$router.push('/');
                    }
                );
                // alert(JSON.stringify(this.form))
            },


        },

    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/style.css';

</style>
