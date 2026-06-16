<template>
    
    <form name="upload" @submit.prevent>
        <FileUpload title="Upload" uploadSize="50" uploadUnit="MB" ref="uploadRef"></FileUpload>
        <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="submit">Upload</button>
    </form>
    <div v-if="uploading">
        <h4 class="sr-only">Status</h4>
        <div class="relative mt-6">
  <div class="overflow-hidden rounded-full bg-white/10">
    <div
      class="h-2 rounded-full bg-indigo-500 transition-all duration-200 ease-in-out"
      :style="{ width: progress + '%' }"
    ></div>
  </div>

  <div
    class="absolute text-sm font-medium text-gray-400 transition-all duration-200 ease-in-out"
    :style="{
  left: Math.min(Math.max(progress, 2), 98) + '%',
  transform: 'translateX(-50%)'
}"
  >
    {{ progress }}%
  </div>
</div>
    </div>
</template>

<script setup async lang="ts">

const uploadRef = ref<InstanceType<typeof FileUpload> | null>(null);

const uploading = ref(false);
const progress = ref(0);

async function submit() {
    uploading.value = true;
    progress.value = 0;

    const selectedFiles = uploadRef.value?.files ?? [];

    console.log('files:', selectedFiles);

    const formData = new FormData();

    for (const file of selectedFiles) {
        formData.append('files', file);
    }

    await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/upload');

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                progress.value = Math.round(
                    (event.loaded / event.total) * 100
                );
            }
        };

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                progress.value = 100;
                uploading.value = false;
                resolve(true);
            } else {
                reject(xhr.response);
            }
        };

        xhr.onerror = () => {
            uploading.value = false;
            reject(new Error('Upload failed'));
        };

        xhr.send(formData);
    });
}

</script>