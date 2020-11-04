<template>
  <v-container style="margin-top:-25px;">
    <v-row>
      <v-col>
        <v-carousel cycle height="700"
        :show-arrows="false">
          <v-carousel-item
            v-for="(item, i) in items"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [
          {
            src: 'https://res.cloudinary.com/doa7hxnbq/image/upload/v1604312971/image4.jpg',
          },
          {
            src: 'https://res.cloudinary.com/doa7hxnbq/image/upload/v1604318745/image1.jpg',
          },
          {
            src: 'https://res.cloudinary.com/doa7hxnbq/image/upload/v1604318744/image2.jpg',
          },
          {
            src: 'https://res.cloudinary.com/doa7hxnbq/image/upload/v1604318903/image3.jpg',
          },
        ],
    };
  },
};
</script>