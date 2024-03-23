<template>

  <div class="search-container" :class="{ 'search-active': searchBarOn }">
    <div class="search" :class="{ active: searchBarOn }">
      <div class="icon" @click="activateSearch"></div>
      <div class="input">
        <input type="text" placeholder="Search your GIPHY..." id="InputSearch" @keyup.enter="searchContent" autocomplete="off">
        <span class="delete" @click="activateSearch"></span>
      </div>
    </div>
  </div>

  <div class="loader-container" v-show="loadingSpinner">
    <loaderComponent />
  </div>

  <div class="content" v-show="showContent">
    <div class="gif-grid">
      <div v-for="gif in gifs" :key="gif.id" class="gif-item">
        <a href="#">
          <img :src="gif.images.fixed_height.url" alt="GIF">
        </a>
      </div>
    </div>
  </div>

</template>

<script>

import axios from 'axios';
import loaderComponent from '@/components/loaderComponent.vue';

export default {
  methods: {
    activateSearch() {
      this.searchBarOn = !this.searchBarOn;
      this.showContent = false;
    },

    async searchContent() {
      this.loadingSpinner = true;
      this.showContent = false;
      document.body.style.overflow = 'hidden';
      try {
        const apiKey = 'PbfMrZT4cuSTz5QVE5bPguk1OKkXYh5s';
        const query = document.getElementById('InputSearch').value;
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}`);
        
        this.gifs = response.data.data;
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      } finally {
        setTimeout(() => {
          this.loadingSpinner = false;
          this.showContent = true;
          document.body.style.overflow = '';
        }, 1000);
      }
    },
  },
  components: {
    loaderComponent
  },
  data() {
    return {
      searchBarOn: false,
      showContent: false,
      loadingSpinner: false,
      gifs: []
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
  transition: height 0.5s ease; 

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

        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
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

// Loader

.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 9999;
}

// Gif Content

.content {

  margin: 16px 32px;

  .gif-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 16px;
    transition: max-height 0.3s ease;

    .gif-item {
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, filter 0.5s ease;

      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }

      &:hover {
        transform: scale(1.05);
        filter: brightness(50%);
      }
    }
  }
}

</style>