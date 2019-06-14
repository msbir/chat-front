<template>
      <div class="terms-of-use">
            <div class="max-container">
        <div class="container">

            <header class="flex flex-center-h flex-center">
                <img @click="goBack" class="arrow-back" src="static/img/footer-icons/arrowBack.png " alt="arrow-back">
                <div class="logo-container">
                    <img class="logo-img" src="static/img/logo.png" alt="Yoho">
                </div>
            </header>
        </div>
        <hr>
    </div>
    <div class="container">

        <main>
            <p class="terms-title">About & Terms</p>
            <p class="terms-text">This User Agreement, the Mobile devices terms, and all policies and additional terms posted on and in our sites,
                applications, tools and services (collectively "Services") set out the terms on which Yoho offers you access
                to and use of our Services. You can find an overview of our policies here. The Mobile devices terms, all
                policies and additional terms posted on and in our sites, applications, tools, and services are incorporated
                into this User Agreement. You agree to comply with all of the terms of this User Agreement when accessing
                or using our Services.</p>
            <p class="terms-text">The entity you are contracting with is: eBay Inc., 2025 Hamilton Ave., San Jose, CA 95125, if you reside in the
                United States; if you reside in the United Kingdom; eBay GmbH, Albert-Einstein-Ring 2-6, 14532 Kleinmachnow,
                Germany, if you reside outside the United Kingdom but within the European Union; Canada Limited, 500 King
                Street West, Suite 200, Toronto, ON M5V 1L9, Canada, if you reside in Canada; and eBay International AG,
                Helvetiastrasse 15/17, 3005, Bern, Switzerland, if you reside in any other country (as of June 1, 2018, this
                entity will be eBay Marketplaces GmbH, Helvetiastrasse 15/17, 3005 Bern, Switzerland). In this User Agreement,
                these entities are individually and collectively referred to as "eBay," "we," or "us."</p>
            <p class="terms-text">Please be advised that this User Agreement contains provisions that govern how claims you and we have against
                each other are resolved (see Disclaimer of Warranties; Limitation of Liability and Legal Disputes provisions
                below). It also contains an Agreement to Arbitrate, which will, with limited exception, require you to submit
                claims you have against us or our agents to binding and final arbitration, unless you opt out of the Agreement
                to Arbitrate (see Legal Disputes, Section B ("Agreement to Arbitrate")). Unless you opt out: (1) you will
                only be permitted to pursue claims against us or our agents on an individual basis, not as a plaintiff or
                class member in any class or representative action or proceeding and (2) you will only be permitted to seek
                relief (including monetary, injunctive, and declaratory relief) on an individual basis.
            </p>
        </main>
    </div>
    
    <div class="max-container">
          <footer class="flex flex-around">
            <button @click="decline" type="button" class="btn btn-outline-danger">Decline</button>
            <button @click="accept" type="button" class="btn btn-success">Accept</button>
        </footer>
    </div>
      </div>
</template>


<script>
export default {
  name: 'terms-of-use',
  props: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  components: {},
  created() {},
  methods: {
    accept() {
      this.$emit('terms', true);
      this.$router.push('/signup-input');
    },
    decline() {
      bootbox.alert(
        'In order to continue as a registered user, Terms of Use must be accept'
      );
    },
    goBack() {
      this.$emit('terms', false);
      this.$router.push('/signup-input');
    }
  }
};
</script>


<style scoped>
/**header**/

.terms-of-use {
  min-height: calc(100vh);
  background-image: linear-gradient(
    rgba(240, 232, 255, 0.65),
    rgb(209, 199, 228),
    rgba(192, 145, 255, 0.68)
  );
  background-repeat: no-repeat;
}
header {
  padding: 20px 0 0 0;
}

.logo-container {
  text-align: center;
  width: 100%;
}
/**header end**/

/**main**/
main {
  margin: 0 0 60px 0;
}
.terms-title {
  color: rgb(26 13 59);
  font-size: 20px;
  font-family: Poppins-black;
  text-align: center;
}
.terms-text {
  color: rgb(26 13 59);
  font-size: 14px;
}
/**main end**/

/**footer**/
.footer-hr {
  margin: 0;
}
footer {
  padding: 10px 0;
  background-color: rgba(249, 249, 250, 0.83);
  position: fixed;
  width: 100%;
  max-width: 800px;
  bottom: 0;
  border-top: 1px solid #ccc;
}
.btn-success {
  background-color: rgb(116 202 23);
  border-color: rgb(116 202 23);
  color: #ffffff;
  font-family: Poppins-Bold;
}
.btn-outline-danger {
  color: rgb(255 20 49);
  border-color: rgb(255 20 49);
  font-family: Poppins-Bold;
  border: 2px solid rgb(255 20 49);
}
/**footer end**/

@media (orientation: landscape) {
  .terms-of-use {
    height: auto;
    min-height: -webkit-fill-available;
  }
}
</style>
