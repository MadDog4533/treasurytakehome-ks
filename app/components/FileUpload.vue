<template>
    <div class="col-span-full">
        <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900 dark:text-white">{{ title }}</label>
        <div id="upload-container"
        @dragover.prevent
        @dragenter.prevent
        @drop="onDrop"
        class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 dark:border-white/25">
            <div class="text-center">
                <PhotoIcon class="mx-auto size-12 text-gray-300 dark:text-gray-600" aria-hidden="true" />
                <div class="mt-4 flex text-sm/6 text-gray-600 dark:text-gray-400">
                    <label for="file-upload" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:focus-within:outline-indigo-500 dark:hover:text-indigo-300">
                        <span>Upload file(s)</span>
                        <input id="file-upload" name="file-upload" type="file" class="sr-only" multiple @change="onFileSelect"/>
                    </label>
                    <p class="pl-1">or drag and drop</p>
                </div>
                <p v-if="files.length <= 0" class="text-xs/5 text-gray-600 dark:text-gray-400">PNG, JPG, GIF up to {{ uploadSize }} {{ uploadUnit }}</p>
                <ul>
                    <li v-for="file in files" :key="file.name" class="dark:text-gray-400">
                        {{ file.name }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { PhotoIcon } from '@heroicons/vue/24/solid';

    interface Props {
        title: String,
        uploadSize: Number,
        uploadUnit: 'KB' | 'MB' | 'GB',
    }

    const props = defineProps<Props>();

    const files = ref<File[]>([]);

    function onDrop(event: DragEvent){
        files.value = Array.from(event.dataTransfer?.files  ?? []);
        const input = document.getElementById("file-upload") as HTMLInputElement;

        if (input != null)
            input.files = event.dataTransfer?.files || [];

        event.preventDefault();
    }

    async function onFileSelect(e: Event){
        files.value = [];
        const input = e.target as HTMLInputElement;
        files.value = Array.from(input?.files || []);
    }

    defineExpose({
        files
    });
</script>