<template>
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    Hey, you are visiting the app as a guest. Your guest name is <strong>{{currentUser.name}}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'warning',
  computed: {
    ...mapGetters({
      currentUser: 'currentUser'
    })
  },
}

</script>

<style scoped>
  .alert {
    margin-bottom: 0px;
  }
</style>
