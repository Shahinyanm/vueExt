<template>
    <div id="main-container">
        <div class="col-12 text-center ">
            <img id="logo" src="img/logo.png">
        </div>
        <div id="main" class="col-md-12 m-1">
            <div class="container shadow p-4 mb-5 bg-white rounded">
                <div class="row">
                    <div class="col-6"><a
                            href="https://www.accountrentals.com/tickets"
                            target="_blank">
                        <font-awesome-icon icon="envelope"/>
                        <sup>{{newMessage}}</sup></a></div>
                    <div class="col-6">
                        <router-link to="/faq" class="nav-item nav-link"><img
                                src="img/faq.png" id="faq"></router-link>
                    </div>
                </div>
                <div v-if="isHome">
                    <div class="row ">
                        <div class="col-12">
                            <div class="row earnings">
                                <div class="col-12 ">
                                    <div class="row">
                                        <div class="col-8"><h6 data-v-2ee81a46="">Total Earnings</h6>
                                        </div>
                                        <div class="col-4">{{total_earnings}}$</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row earnings">
                                <div class="col-12  ">
                                    <div class="row">
                                        <div class="col-8"><h6>Paid Earnings</h6>
                                        </div>
                                        <div class="col-4">{{paid_earnings}}$</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row earnings">
                                <div class="col-12  ">
                                    <div class="row">
                                        <div class="col-8"><h6>Referrals Earnings</h6>
                                        </div>
                                        <div class="col-4">{{paid_ref_earnings}}$</div>

                                    </div>
                                </div>
                            </div>
                            <div class="row mt-5 earnings">
                                <div class="col-3"></div>
                                <div class="col-6"><label for="referral"
                                                          class="control-label">
                                    <h6>Referral Link</h6>
                                </label></div>
                                <div class="col-10"><input type="text" id="referral"
                                                           class="form-control" v-model="referral"></div>
                                <div class="col-1 p-0">
                                    <a href="#" class="btn-lg"
                                       style="background: transparent; border: none;"
                                       @click="copy">
                                        <font-awesome-icon icon="copy"></font-awesome-icon>
                                    </a>

                                </div>
                            </div>
                            <div class="row mt-5">
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-6"><h6>Next Payment:</h6>
                                        </div>
                                        <div class="col-4"><span
                                                class="badge badge-warning"> ({{payment_status}})</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div d class="col-6"><h6>Account Status:</h6>
                                        </div>
                                        <div class="col-6"><span
                                                class="badge badge-primary"> ({{status}})</span>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn btn-outline-primary btn-block" @click="goDash">Dashboard</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div data-v-2ee81a46="" class="row">
                        <div class="container shadow p-3 mb-5 bg-white rounded" v-if="isEdit">
                            <div class="col-md-12 m-1">
                                <div class="row">
                                    <div class="col-md-12 m-1">
                                        <div class="panel panel-default">
                                            <div class="panel-body">
                                                <div class="box box-info">
                                                    <div class="box-body">
                                                        <div class="col-sm-"><br>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-6"><h4
                                                                    style="color: rgb(0, 177, 177);">
                                                                Profile </h4></div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                        <hr style="margin: 5px 0px;">
                                                        <div class="row">
                                                            <div class="col-4 tital ">Name:</div>
                                                            <div class="col-7">{{name}}</div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                        <div class="bot-border"></div>
                                                        <div class="row">
                                                            <div class="col-4 tital ">Email:</div>
                                                            <div class="col-7">
                                                                {{email}}
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                        <div class="bot-border"></div>
                                                        <div class="row">
                                                            <div class="col-4  tital ">
                                                                Phone:
                                                            </div>
                                                            <div class="col-7">{{phone}}
                                                            </div>
                                                        </div>
                                                        <div class="clearfix"></div>
                                                        <div class="bot-border"></div>
                                                        <div class="row">
                                                            <div class="col-4 tital ">
                                                                Paypal:
                                                            </div>
                                                            <div class="col-7">{{paypal}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-4"></div>
                                </div>
                            </div>
                        </div>
                        <div class="container shadow p-3 mb-5 bg-white rounded" v-else>
                            <div class="col-md-12 m-1">
                                <b-form @submit="onSubmit">
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

                                                placeholder="Enter password"
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
                                                       @onInput="onInput"
                                                       id="phone"
                                                       :preferredCountries="['countryCode', 'gb', 'ua']"

                                        >
                                        </vue-tel-input>
                                    </b-form-group>


                                    <b-button type="submit" variant="btn btn-outline-primary btn-block m-10">Submit
                                    </b-button>
                                </b-form>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-outline-success btn-block" @click="edit"> Edit</button>
                        <button class="btn btn-outline-primary btn-block" @click="goDash">Home</button>
                    </div>
                </div>
            </div>
            <button class="btn btn-sm btn-danger btn-block" @click="logout">
                <font-awesome-icon icon="sign-out-alt"/>
            </button>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import VueTelInput from 'vue-tel-input';
    import 'vue-tel-input/dist/vue-tel-input.css';
    // import $http from 'vue-resource';
    // import {mixins} from "../../mixins/mixins";
    import {logout} from "../../mixins/logout";

    export default {
        mixins: [logout],
        components: {
            VueTelInput,
        },
        data() {
            return {
                form: {
                    email: '',
                    name: '',
                    password: '',
                    paypal: '',
                    phone: ''
                },
                errors: [],
                errorsShow: false,
                show: true,
                balance: 0,
                created_at: "",
                email: "",
                email_verified_at: null,
                id: null,
                name: "",
                paid_earnings: 0,
                paid_ref_earnings: 0,
                paypal: "",
                phone: "",
                referral: "",
                referral_id: null,
                role: null,
                show: 0,
                status: "",
                total_earnings: 0,
                updated_at: "",
                payment_status: '',
                newMessage: 0,
                messages: '',
                isHome: true,
                isEdit: true,


            }
        },
        beforeCreate: function () {
            let vm = this;

            // console.log(localStorage.getItem('token1'))
            vm.$http.post('details/', {}, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token1')
                }
            }).then(response => {
                    if (localStorage.getItem('token1') !== null) {
                        if (response.body.success.balance > 0) {
                            vm.payment_status = "processing"
                        } else {
                            vm.payment_status = "finished"
                        }
                        vm.balance = response.body.success.balance;
                        vm.created_at = response.body.success.created_at;
                        vm.email = response.body.success.email;
                        vm.form.email = response.body.success.email;
                        vm.email_verified_at = response.body.success.email_verified_at;
                        vm.id = response.body.success.id;
                        vm.name = response.body.success.name;
                        vm.form.name = response.body.success.name;
                        vm.paid_earnings = response.body.success.paid_earnings;
                        vm.paid_ref_earnings = response.body.success.paid_ref_earnings;
                        vm.paypal = response.body.success.paypal;
                        vm.form.paypal = response.body.success.paypal;
                        vm.phone = response.body.success.phone;
                        vm.form.phone = response.body.success.phone;
                        vm.referral = response.body.success.referral;
                        vm.referral_id = response.body.success.referral_id;
                        vm.role = response.body.success.role;
                        vm.show = response.body.success.show;
                        if (response.body.success.status === 'unverified') {
                            vm.status = 'Pending review'
                        } else {
                            vm.status = 'Verified'
                        }
                        vm.total_earnings = response.body.success.total_earnings;
                        vm.updated_at = response.body.success.updated_at;

                        vm.$router.push('/home');
                    }
                }, response => {
                    if (response.status === 401 && (localStorage.getItem('token1') === null)) {
                        vm.$router.push('/');
                    }
                    // this.$router.push('/');
                }
            );


        },
        created: function () {
            this.startInterval();
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                let vm = this;
                this.$http.patch('update/', this.form).then(response => {


                    }, response => {

                        if (response.status === 422)
                            vm.errorsShow = true;
                        let obj = JSON.parse(JSON.stringify(response.body.errors));
                        Object.keys(obj).forEach(function (key) {

                            vm.errors.push(obj[key][0]);
                        });
                    }
                ).then(() => {
                    vm.isEdit = false;
                });
                // alert(JSON.stringify(this.form))
            },
            copy() {
                this.$copyText(this.referral).then(function (e) {
                    alert('Copied');
                }, function (e) {
                    alert('Can not copy')
                })
            },
            onInput({number, isValid, country}) {
                console.log(number, isValid, country);
            },
            startInterval: function () {
                let vm = this;
                vm.messages = setInterval(() => {
                    if (localStorage.getItem('token1')!== null) {
                        vm.$http.post('checkMail').then(response => {
                                return response
                            }, response => {
                            }
                        ).then(response => {
                            vm.newMessage = response.body
                        });
                    }
                }, 5000);

            },
            goDash() {
                this.isHome = !this.isHome;
            },
            edit() {
                this.isEdit = !this.isEdit;
            },
        },

    }
</script>

<style lang="scss" scoped>
    @import '../../../assets/style.css';

</style>
