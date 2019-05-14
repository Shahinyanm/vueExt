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
                            type="text"
                            required
                            placeholder="Enter paypal id"
                    ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-7" label="Your Phone:" label-for="phone">
                    <vue-tel-input v-model="form.phone"
                                   ref="telInput"
                                   @onInput="onInput"
                                   id="phone"
                                   :preferredCountries="[countryCode]"
                    >
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
        beforeCreate() {
            let vm = this;
            vm.$http.post('details').then(response => {
                    this.$router.push('/home')
                }, response => {
                    if (response.status === 401 && (localStorage.getItem('token1') === null)) {
                    }
                }
            );
        },
        mounted:function(){
            this.getGeolocation().then( ()=>{
                this.selectCountry()
            })
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                let vm = this;
                this.$http.post('register', this.form).then(response => {
                        localStorage.setItem('token1', response.body.success.token)

                        return response.body.success.token;

                    }, err => {
                        if (err.status === 422)
                            vm.errorsShow = true;
                        let obj = JSON.parse(JSON.stringify(err.body.errors));
                        Object.keys(obj).forEach(function (key) {
                            vm.errors.push(obj[key][0]);
                        });
                    }
                ).then(token => {

                    if (localStorage.getItem('token1') !== null) {
                        this.$router.push('/home');
                        this.storeData(token);
                    }
                })
                // alert(JSON.stringify(this.form))
            },
            selectCountry: function () {
                this.$refs.telInput.choose(
                    this.$refs.telInput.findCountry(this.countryCode)
                );
            },
            onInput({number, isValid, country}) {
                console.log(number, isValid, country);
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/style.css';

</style>
