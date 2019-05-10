<template>
    <div id="main-container">
        <div class="col-12 text-center ">
            <img id="logo" src="img/logo.png">
        </div>
        <div class="alert alert-warning"><strong data-v-1a7c3660=""> Please LoginYour to receive updates and
            notifications about your account!</strong></div>
        <div>
            <div>
                <div data-v-1a7c3660="">
                    <nav data-v-1a7c3660="" id="nav">
                        <div id="nav-tab" role="tablist" class="nav nav-tabs">
                            <router-link to="/login"
                                         class="nav-item nav-link "
                                         id="links"><strong
                                    data-v-1a7c3660="">Sign in</strong></router-link>
                            <router-link to="/"
                                         class="nav-item nav-link active  router-link-exact-active router-link-active"
                                         id="links_register"><strong
                                    data-v-1a7c3660="">Registration</strong></router-link>
                        </div>
                    </nav>
                </div>

            </div>
            <b-form @submit="onSubmit" v-if="show">
                <div v-if="errorsShow">
                    <ul class="alert alert-danger">
                        <li v-for="(value) in errors">@{{ value }}</li>
                    </ul>
                </div>
                <b-form-group
                        id="input-group-1"
                        label="Email address:"
                        label-for="email"
                        description="We'll never share your email with anyone else."
                >
                    <b-form-input
                            id="email"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Enter email"
                    ></b-form-input>

                </b-form-group>

                <b-form-group id="input-group-2" label="Your Name:" label-for="name">
                    <b-form-input
                            id="name"
                            v-model="form.name"
                            required
                            placeholder="Enter name"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-3" label="Your password:" label-for="password">
                    <b-form-input
                            id="password"
                            v-model="form.password"
                            type="password"
                            required
                            placeholder="Enter password"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-5" label="Password confirmation:" label-for="password_confirmation">
                    <b-form-input
                            id="password_confirmation"
                            v-model="form.password_confirmation"
                            type="password"
                            required
                            placeholder="Enter password confirmation"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-4" label="Your Paypal:" label-for="paypal">
                    <b-form-input
                            id="paypal"
                            v-model="form.paypal"
                            type="password"
                            required
                            placeholder="Enter paypal id"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-7" label="Your Phone:" label-for="phone">
                    <vue-tel-input v-model="form.phone"
                                   @onInput="onInput"
                                   id="phone"
                                   :preferredCountries="['us', 'gb', 'ua']">
                    </vue-tel-input>
                </b-form-group>


                <b-button type="submit" variant="btn btn-outline-primary btn-block m-10">Submit</b-button>
            </b-form>

        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import VueTelInput from 'vue-tel-input';
    import 'vue-tel-input/dist/vue-tel-input.css';
    // import $http from 'vue-resource';
    import {mixins} from "../../mixins/mixins";

    export default {
        mixins: [mixins],
        components: {
            VueTelInput,
        },
        data() {
            return {
                form: {
                    email: '',
                    name: '',
                    password: '',
                    password_confirmation: '',
                    paypal: '',
                    phone: ''
                },
                errors: [],
                errorsShow: false,
                show: true
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                let vm = this;
                this.$http.post('register/', this.form).then(response => {

                        localStorage.setItem('token', response.body.success.token)
                        this.$router.push('home');
                        console.log(response);
                    }, response => {

                        if (response.status === 422)
                            vm.errorsShow = true;
                        let obj = JSON.parse(JSON.stringify(response.body.errors));
                        Object.keys(obj).forEach(function (key) {

                            vm.errors.push(obj[key][0]);
                        });
                        console.log(this.errors)
                    }
                );
                // alert(JSON.stringify(this.form))
            },
            // onReset(evt) {
            //     evt.preventDefault()
            //     // Reset our form values
            //     this.form.email = '';
            //     this.form.name = '';
            //     this.form.password = '';
            //     this.form.password_confirmation = '';
            //     this.form.phone = '';
            //     this.form.paypal = ''                // Trick to reset/clear native browser form validation state
            //     this.show = false
            //     this.$nextTick(() => {
            //         this.show = true
            //     })
            // },
            onInput({number, isValid, country}) {
                console.log(number, isValid, country);
            },
        },

    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/style.css';

</style>
