<template>
    <div class="max-container">
        <div class="container">
            <header>
              <div class="flex flex-center-h flex-center">
                  <img @click="goBack" class="arrow-back" src="static/img/footer-icons/arrowBack.png " alt="arrow-back">
                  <div class="logo-container">
                      <img class="logo-img" src="static/img/logo.png" alt="Yoho" @click="$router.push('/')">
                  </div>
              </div>
            </header>
        </div>
        <hr>
        <div class="container">
            <h1 class="title">Choose Your {{title}}</h1>
            <div class="select-wrapper">
                <div v-for="(item,index) in items" :key="item.name">
                    <div @click="getSelect(item.name,index)" class="flex flex-center flex-between item"><div>{{item.name}}</div>
                        <img v-if="!item.isSelcted" class="selected" :src="selector" alt="selector">
                        <img v-if="item.isSelcted" class="selected" :src="selected" alt="selected">
                    </div>
                </div>
            </div>
        </div>
        <footer class="text-center container">
            <button class="clean-btn skip" @click="remove">Remove</button>
            <button @click="goBack" class="clean-btn next">Save</button>
        </footer>
    </div>
</template>


<script>
export default {
  name: 'select-details',
  props: {
    title: String,
    items: Array
  },

  data() {
    return {
      selector: 'static/img/footer-icons/selector.svg',
      selected: 'static/img/footer-icons/selected.svg'
    };
  },
  methods: {
    getSelect(value, index) {
      if (this.items[index].isSelcted) {
        this.items[index].isSelcted = false;
        this.$emit('shareSelected', '');
      } else {
        this.items.forEach(item => {
          item.isSelcted = false;
        });
        this.items[index].isSelcted = true;
        this.$emit('shareSelected', value);
      }
      this.goBack();
    },
    remove() {
      this.items.forEach(item => {
        item.isSelcted = false;
      });
      this.$emit('shareSelected', '');
      this.goBack();
    },
    goBack() {
      this.$emit('goBack', false);
    }
  }
};
</script>


<style scoped>
/**header**/
header {
  padding: 20px 0 0 0;
}
.logo-container {
  text-align: center;
  width: 100%;
}
.logo-img {
  width: 30px;
}
/**header end**/
.title {
  color: #1a0d3b;
  font-size: 20px;
  font-family: Poppins-black;
  text-align: center;
  text-transform: capitalize;
}
.select-wrapper {
  background-color: #fcfcfc;
}
.item {
  text-transform: capitalize;
  color: #7e7d88;
  padding: 10px 0;
  font-size: 14px;
}
.selected {
  height: 14px;
}

/**footer**/
footer {
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
}
.next {
  font-family: Poppins-Bold;
  background-color: rgb(71 35 161);
  padding: 10px 0;
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
  width: 48%;
  max-width: 500px;
  letter-spacing: 0.5px;
}
.skip {
  font-family: Poppins-Bold;
  padding: 10px 0;
  border-radius: 6px;
  border: 1px solid #7e7d88;
  color: #7e7d88;
  font-size: 14px;
  width: 48%;
  background-color: #bebdc361;
}
/**footer and**/
</style>
