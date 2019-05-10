export const mixins = {
    data() {
        return {

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
            updated_at: ""
        }

    },
    beforeCreate: function () {

        let vm = this;

        this.$http.post('details/').then(response => {
                console.log(response.body)
                if (localStorage.getItem('token') !== null) {
                    vm.balance = response.body.success.balance;
                    vm.created_at = response.body.success.created_at;
                    vm.email = response.body.success.email;
                    vm.email_verified_at = response.body.success.email_verified_at;
                    vm.id = response.body.success.id;
                    vm.name = response.body.success.name;
                    vm.paid_earnings = response.body.success.paid_earnings;
                    vm.paid_ref_earnings = response.body.success.paid_ref_earnings;
                    vm.paypal = response.body.success.paypal;
                    vm.phone = response.body.success.phone;
                    vm.referral = response.body.success.referral;
                    vm.referral_id = response.body.success.referral_id;
                    vm.role = response.body.success.role;
                    vm.show = response.body.success.show;
                    vm.status = response.body.success.status;
                    vm.total_earnings = response.body.success.total_earnings;
                    vm.updated_at = response.body.success.updated_at;
                    localStorage.setItem('token', response.body.success.token)
                }
                this.$router.push('/home');
            }, response => {


                if (response.status === 401) {
                    this.$router.push('/');
                }

                // this.$router.push('/');
            }
        );
    }

}