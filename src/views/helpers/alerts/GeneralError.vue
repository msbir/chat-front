<template>
  <div class="alert alert-danger" role="alert">
    <h4 class="alert-heading">Oops!</h4>
    <p>Looks like something went wrong.</p>
    <hr>
    <p class="mb-0">Please try again.</p>
  </div>
</template>

<script>
export default {
  name: 'error',
}
</script>

<style scoped>
  .alert {
    margin-bottom: 0px;
  }
</style>
