<template>

  

  <div class="search-container">
    <div class="search">
      <div class="icon" @click="activateSearch"></div>
      <div class="input">
        <input type="text" placeholder="Search your GIPHY..." id="InputSearch">
        <span class="delete" @click="activateSearch"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    activateSearch() {
      this.SearchBarActive = !this.SearchBarActive;
      const searchElement = document.querySelector('.search');
      searchElement.classList.toggle('active');
      const containerElement = document.querySelector('.search-container');
      containerElement.classList.toggle('search-active'); // Adiciona ou remove a classe search-active
    }
  },
  data() {
    return {
      SearchBarActive: false,
    };
  }
};
</script>

<style lang="scss">

@import '../assets/_main.scss';




// SearchBar

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: $colorBlack;
  transition: height 0.5s ease; /* Add transition property */ 

  &.search-active {
    height: calc(100vh - 80vh);
  }

  .search {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background: $colorWhite;
    overflow: hidden;
    box-shadow: 0px 3px 5px 3px $color1;
    transition: 0.5s;

    &.active {
      width: 360px;
    }

    .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 60px;
      height: 60px;
      background: $colorWhite;
      border-radius: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1000;

      &::before {
        content: '';
        position: absolute;
        width: 15px;
        height: 15px;
        border: 3px solid $colorBlack;
        border-radius: 15px;
        transform: translate(-4px, -4px);
      }

      &::after {
        content: '';
        position: absolute;
        width: 3px;
        height: 12px;
        background-color: $colorBlack;
        transform: translate(6px,6px) rotate(315deg);
      }
    }

    .input {
      position: relative;
      width: 300px;
      height: 60px;
      left: 60px;
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        font-size: 17px;
        background-color: $colorWhite;
      }

      .delete {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        right: 15px;
        
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &::before {
          position: absolute;
          content: '';
          width: 1px;
          height: 20px;
          background: $colorBlack;
          transform: rotate(45deg);
        }

        &::after {
          position: absolute;
          content: '';
          width: 1px;
          height: 20px;
          background: $colorBlack;
          transform: rotate(315deg);
        }
      }
    }
  }
}

</style>