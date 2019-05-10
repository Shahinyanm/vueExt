<template>
    <div id="main-container">
        <div class="col-12 text-center ">
            <img id="logo" src="img/logo.png">
        </div>
        <div id="main" class="col-md-12 m-1">
            <div class="container shadow p-4 mb-5 bg-white rounded">
                <div class="row">
                    <div data-v-2ee81a46="" class="col-12"><a
                            href="https://www.accountrentals.com/tickets"
                            target="_blank">

                        <sup>0</sup></a>
                        <a href="#/faq" class=""
                           lass="nav-item nav-link"><img
                                src="img/faq.png" id="faq"></a>
                    </div>
                </div>
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
                                    <div class="col-4">{{paid_ref_earnings}}$</div>                            <font-awesome-icon icon="user-secret" />

                                </div>
                            </div>
                        </div>
                        <div class="row mt-5 earnings">
                            <div class="col-3"></div>
                            <div class="col-6"><label  for="referral"
                                                      class="control-label">
                                <h6>Referral Link</h6>
                            </label></div>
                            <div class="col-10"><input type="text" id="referral"
                                                       class="form-control" v-model="referral"></div>
                            <div class="col-1">
                                <a  href="#"
                                   style="background: transparent; border: none;">
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
                            <button class="btn btn-outline-primary btn-block">Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn btn-sm btn-danger btn-block">

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
