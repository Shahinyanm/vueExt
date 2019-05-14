export const logout = {
  data() {
    return {};
  },
  methods: {
    logout: function() {
      this.$http.post('logout').then(
        response => {
          if (response.body === 'logged out') {
            localStorage.removeItem('token1');
            this.$router.push('/login');
          }
        },
        response => {
          if (response.status === 401) {
            this.$router.push('/');
          }

          // this.$router.push('/');
        }
      );
    },
  },
};
