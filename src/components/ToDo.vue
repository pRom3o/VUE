<script setup>
import { ref } from 'vue';

import DeleteButton from './DeleteButton.vue';
// import EditButton from './EditButton.vue';

const newItem = ref(''); // Input binding
const items = ref([]); // Array to hold the todo items

// Function to add an item to the list
const addItem = () => {
  if (newItem.value.trim() !== '') {
    const id = Date.now(); // Unique key based on timestamp
    const label = newItem.value; //new item value
    const isChecked = false;
    items.value.push({ id, label, isChecked }); // Add new item with id and label to the list
    newItem.value = ''; // Reset input to empty string
  }
};

// Function to remove all items from the list
const clearList = () => {
  items.value = [];
};

// Function to remove individual item from list
const removeItem = id => {
  items.value = items.value.filter(items => items.id !== id);
};
</script>

<template>
  <div class="h-screen w-screen flex justify-center md:items-center">
    <div
      class="md:h-2/3 md:w-1/3 w-full flex flex-col gap-6 rounded-xl bg-gray-200 bg-opacity-90 shadow-lg"
    >
      <div class="flex justify-center w-full">
        <p class="md:text-4xl text-2xl font-bold mt-4 font-EDU text-gray-700">
          ToDo List
        </p>
      </div>

      <form
        class="h-3/4 w-full overflow-y-auto no-scrollbar"
        @submit.prevent="submitform"
      >
        <div class="flex flex-wrap items-center justify-center mx-2">
          <input
            type="text"
            placeholder="add item to list"
            class="p-2 rounded-md outline-none h-14"
            style="width: 250px"
            v-model="newItem"
          />

          <!-- Save button calls addItem -->
          <button
            @click.prevent="addItem()"
            class="p-2 rounded-md bg-green-400 m-2 text-white"
            v-if="newItem && newItem.length > 0"
          >
            Save
          </button>

          <!-- Clear button calls removeItem -->
          <button
            type="button"
            @click.prevent="clearList()"
            class="p-2 rounded-md bg-red-400 m-2 text-white"
            v-if="items && items.length > 0"
          >
            Clear list
          </button>
        </div>

        <!-- unordered list to display ToDo items -->
        <div class="flex flex-col items-center font-mono mt-3">
          <ul class="">
            <li
              class="flex justify-between bg-customZinc p-2 rounded-lg my-2"
              style="width: 300px"
              v-for="item in items"
              :key="item.id"
              :class="
                item.isChecked ? 'text-opacity-100 line-through font-mono' : ''
              "
            >
              {{ item.label }}
              <div>
                <input type="checkbox" class="mx-2" v-model="item.isChecked" />
                <button @click="removeItem(item.id)">
                  <!-- delete button component -->
                  <DeleteButton />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.no-scrollbar::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari, and WebKit browsers */
}
</style>
