<script setup>
import { onMounted, ref, watch } from 'vue';

import DeleteButton from './DeleteButton.vue';

// import EditButton from './EditButton.vue';

const newItem = ref(''); // Input binding
const todoList = ref([]); // Array to hold the todo items
watch(
  todoList,
  newValue => {
    localStorage.setItem('todoList', JSON.stringify(newValue));
  },
  { deep: true }, // important since todoList is an array of objects
);
onMounted(() => {
  const stored = localStorage.getItem('todoList');
  if (stored) {
    todoList.value = JSON.parse(stored) || [];
  }
});

// Function to add an item to the list
const addItem = () => {
  if (newItem.value.trim() !== '') {
    const id = Date.now(); // Unique key based on timestamp
    const label = newItem.value; //new item value
    const isChecked = false;
    todoList.value.push({ id, label, isChecked }); // Add new item with id and label to the list
    localStorage.setItem('todoList', JSON.stringify(todoList.value));
    console.log(todoList.value);
    newItem.value = ''; // Reset input to empty string
  }
};

// Function to remove all items from the list
const clearList = () => {
  localStorage.removeItem('todoList');
  todoList.value = [];
};

// Function to remove individual item from list
const removeItem = id => {
  todoList.value = todoList.value.filter(items => items.id !== id);
};
</script>

<template>
  <div class="h-screen w-screen flex justify-center md:items-center">
    <div
      class="md:h-2/3 md:w-1/3 h-full w-full flex flex-col gap-6 rounded-xl bg-opacity-90"
    >
      <div class="flex justify-center w-full">
        <p class="md:text-4xl text-2xl font-bold mt-4 font-EDU text-gray-700">
          ToDo List
        </p>
      </div>

      <div class="h-full w-full overflow-y-auto no-scrollbar pb-4">
        <div class="flex flex-wrap items-center justify-center mt-4">
          <input
            type="text"
            placeholder="click to add item to list"
            class="p-2 rounded-md outline-none bg-inherit w-[200px] shadow-md"
            v-model="newItem"
            @keypress.enter="addItem"
          />

          <!-- Save button calls addItem -->
          <button
            @click.prevent="addItem()"
            class="px-3 py-2 text-sm rounded-md bg-green-400 m-2 text-white shadow-md"
            v-if="newItem && newItem.length > 0"
          >
            Save
          </button>
        </div>

        <!-- unordered list to display ToDo items -->
        <Transition name="switch" mode="out-in">
          <div
            class="h-full flex flex-col items-center font-sans mt-3"
            v-if="todoList.length > 0"
          >
            <transition-group name="list" tag="ul" appear>
              <li
                class="flex justify-between bg-inherit p-2 rounded-lg my-2 shadow-md"
                style="width: 300px"
                v-for="item in todoList"
                :key="item.id"
                :class="
                  item.isChecked
                    ? 'text-opacity-100 line-through font-mono'
                    : ''
                "
              >
                {{ item.label }}
                <div>
                  <input
                    type="checkbox"
                    class="mx-2"
                    v-model="item.isChecked"
                  />
                  <button @click="removeItem(item.id)" class="">
                    <!-- delete button component -->
                    <DeleteButton />
                  </button>
                </div>
              </li>
              <!-- Clear button calls removeItem -->
            </transition-group>
            <div
              class="flex items-center justify-center fixed bottom-0 w-[60%] md:w-[20%]"
            >
              <button
                type="button"
                @click.prevent="clearList()"
                class="p-2 rounded-md bg-[#e66868] m-2 w-full text-white"
                v-if="todoList && todoList.length > 0"
              >
                Clear list
              </button>
            </div>
          </div>
          <div
            v-else
            class="h-[80%] flex items-center justify-center text-center p-4 text-gray-500"
          >
            Woohoo, nothing left todo!
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style>
::placeholder {
  text-align: center;
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari, and WebKit browsers */
}
/* List transition classes */

ul {
  position: relative;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.list-move {
  transition: all 0.3s ease;
  position: absolute;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
/* switch transitions */
.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.switch-enter-active,
.switch-leave-active {
  transition: all 0.4s ease;
}
</style>
