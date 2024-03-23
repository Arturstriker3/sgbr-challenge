<template>

  <header>
    <div class="search-container" :class="{ 'search-active': searchBarOn }">
      <div class="search" :class="{ active: searchBarOn }">
        <div class="icon" @click="activateSearch"></div>
        <div class="input">
          <input type="text" placeholder="Search your GIPHY..." id="InputSearch" @keyup.enter="searchContent" autocomplete="off">
        </div>
      </div>
    </div>
  </header>

  <main>
    <div class="loader-container" v-show="loadingSpinner">
      <loaderComponent />
    </div>

    <div class="content" v-show="showContent" ref="contentContainer">
      <div class="gif-grid">
        <div v-for="gif in gifs" :key="gif.id" class="gif-item">
          <a href="#" @click="enlargeGif(gif.images.fixed_height.url)">
            <img :src="gif.images.fixed_height.url" alt="GIF">
          </a>
        </div>
      </div>
    </div>
  </main>

  <section>
    <div class="modal" v-if="isGifModalOpen" @click="closeModal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <img :src="selectedGifUrl" alt="GIF Ampliado">
      </div>
    </div>
  </section>

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
      this.gifs = [];
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

    async moreContent() {
      if (this.loadingMore || this.endReached) return;

      this.loadingMore = true;
      document.body.style.overflow = 'hidden';
      try {
        const apiKey = 'PbfMrZT4cuSTz5QVE5bPguk1OKkXYh5s';
        const query = document.getElementById('InputSearch').value;
        const limit = 20; // Set the limit for the maximum number of new GIFs to be loaded
        const offset = this.gifs.length; // Calculates the displacement based on the number of GIFs already loaded
        const response = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=${limit}&offset=${offset}`);
        
        if (response.data.data.length === 0) {
          this.endReached = true;
        } else {
          this.gifs = [...this.gifs, ...response.data.data];
        }
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      } finally {
        setTimeout(() => {
          this.showContent = true;
          document.body.style.overflow = '';
          this.loadingMore = false;
        }, 1000);
      }
    },

    handleScroll() {
      // Checks if the user has reached the end of the page
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        this.moreContent();
      }
    },

    enlargeGif(gifUrl) {
      this.selectedGifUrl = gifUrl;
      this.isGifModalOpen = true;
    },

    closeModal() {
      this.isGifModalOpen = false;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  components: {
    loaderComponent
  },
  data() {
    return {
      searchBarOn: false,
      showContent: false,
      loadingSpinner: false,
      gifs: [],
      loadingMore: false,
      endReached: false,
      isGifModalOpen: false,
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
      // width: 360px;
      width: calc(100vh - 50vh)
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

// Modal
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: $color3;
  padding: 16px;
  border-radius: 8px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: $colorBlack;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

</style>