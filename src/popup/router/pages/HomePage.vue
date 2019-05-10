<template>
    <div id="main-container">
        <div class="col-12 text-center ">
            <img id="logo" src="img/logo.png">
        </div>
        <div  id="main" class="col-md-12 m-1">
            <div  class="container shadow p-4 mb-5 bg-white rounded">
                <div  class="row">
                    <div data-v-2ee81a46="" class="col-12"><a
                                                              href="https://www.accountrentals.com/tickets"
                                                              target="_blank">

                        <sup d>0</sup></a> <a  href="#/faq" class=""
                                                               lass="nav-item nav-link"><img data-v-2ee81a46=""
                                                                                             src="img/faq.png" id="faq"></a>
                    </div>
                </div>
                <div  class="row ">
                    <div  class="col-12">
                        <div  class="row earnings">
                            <div  class="col-12 ">
                                <div class="row">
                                    <div  class="col-8"><h6 data-v-2ee81a46="">Total Earnings</h6>
                                    </div>
                                    <div  class="col-4">0$</div>
                                </div>
                            </div>
                        </div>
                        <div  class="row earnings">
                            <div  class="col-12  ">
                                <div  class="row">
                                    <div  class="col-8"><h6 >Paid Earnings</h6>
                                    </div>
                                    <div  class="col-4">0$</div>
                                </div>
                            </div>
                        </div>
                        <div  class="row earnings">
                            <div  class="col-12  ">
                                <div  class="row">
                                    <div  class="col-8"><h6>Referrals Earnings</h6>
                                    </div>
                                    <div  class="col-4">0$</div>
                                </div>
                            </div>
                        </div>
                        <div  class="row mt-5 earnings">
                            <div data-v-2ee81a46="" class="col-3"></div>
                            <div data-v-2ee81a46="" class="col-6"><label data-v-2ee81a46="" for="referral"
                                                                         class="control-label"><h6 data-v-2ee81a46="">
                                Referral Link</h6></label></div>
                            <div data-v-2ee81a46="" class="col-10"><input data-v-2ee81a46="" type="text" id="referral"
                                                                          class="form-control"></div>
                            <div data-v-2ee81a46="" class="col-1"><a data-v-2ee81a46="" href="#"
                                                                     style="background: transparent; border: none;">
                            </a></div>
                        </div>
                        <div data-v-2ee81a46="" class="row mt-5">
                            <div data-v-2ee81a46="" class="col-12">
                                <div data-v-2ee81a46="" class="row">
                                    <div data-v-2ee81a46="" class="col-6"><h6 data-v-2ee81a46="">Next Payment:</h6>
                                    </div>
                                    <div data-v-2ee81a46="" class="col-4"><span data-v-2ee81a46=""
                                                                                class="badge badge-warning"> (finished)</span>
                                    </div>
                                </div>
                                <div data-v-2ee81a46="" class="row">
                                    <div data-v-2ee81a46="" class="col-6"><h6 data-v-2ee81a46="">Account Status:</h6>
                                    </div>
                                    <div data-v-2ee81a46="" class="col-6"><span data-v-2ee81a46=""
                                                                                class="badge badge-primary"> (Pending Review)</span>
                                    </div>
                                </div>
                            </div>
                            <button data-v-2ee81a46="" class="btn btn-outline-primary btn-block">Dashboard</button>
                        </div>
                    </div>
                </div>
            </div>
            <button  class="btn btn-sm btn-danger btn-block">

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
