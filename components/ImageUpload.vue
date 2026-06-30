<template>
  <div class="space-y-4">
    <!-- Image Preview Area -->
    <div 
      class="relative w-full aspect-video rounded-[20px] border-2 border-dashed transition-all overflow-hidden bg-brand-cream/10 flex items-center justify-center group"
      :class="isDragging ? 'border-brand-orange bg-brand-orange/5' : 'border-brand-border/50 hover:border-brand-orange'"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <!-- Loading State -->
      <div v-if="isUploading" class="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
        <div class="w-10 h-10 rounded-full border-4 border-brand-cream border-t-brand-orange animate-spin mb-3"></div>
        <span class="text-sm font-bold text-brand-brown tracking-widest uppercase">Mengunggah...</span>
        <div class="w-48 h-2 bg-brand-cream rounded-full mt-4 overflow-hidden">
          <div class="h-full bg-brand-orange transition-all duration-300" :style="{ width: `${uploadProgress}%` }"></div>
        </div>
      </div>

      <!-- Preview Image -->
      <img v-else-if="modelValue" :src="modelValue" alt="Preview" class="w-full h-full object-cover" />
      
      <!-- Empty State / Upload Prompt -->
      <div v-else class="text-center p-6 cursor-pointer">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-brand-orange group-hover:scale-110 transition-transform">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p class="font-bold text-brand-brown mb-1">Pilih Gambar</p>
        <p class="text-xs text-brand-muted">Klik atau seret file gambar ke sini (Maks 2MB)</p>
      </div>

      <!-- Hover Overlay on existing image -->
      <div v-if="modelValue && !isUploading" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer">
        <svg class="w-8 h-8 text-white mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        <span class="text-white font-bold text-xs tracking-widest uppercase">Ganti Gambar</span>
      </div>
    </div>

    <!-- Hidden File Input -->
    <input 
      ref="fileInput" 
      type="file" 
      accept="image/jpeg, image/png, image/webp" 
      class="hidden" 
      @change="handleFileSelect" 
    />
    
    <!-- Manual URL Input Fallback -->
    <div class="flex flex-col gap-2 pt-2">
      <label class="text-xs font-bold text-brand-brown uppercase tracking-widest text-opacity-70">Atau masukkan URL langsung (Opsional)</label>
      <input 
        :value="modelValue" 
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" 
        class="w-full px-5 py-3 text-sm rounded-[15px] border-2 border-brand-border/50 bg-brand-cream/5 focus:outline-none focus:border-brand-orange transition-all text-brand-brown font-medium" 
        placeholder="https://..." 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useNuxtApp } from '#imports';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const isDragging = ref(false);
const isUploading = ref(false);
const uploadProgress = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);

const { $config } = useNuxtApp();

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleDrop = (e: DragEvent) => {
  isDragging.value = false;
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      uploadToCloudinary(file);
    } else {
      alert('File harus berupa gambar (JPG, PNG, WEBP).');
    }
  }
};

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if (file) {
      uploadToCloudinary(file);
    }
    // Reset input so the same file can be selected again if needed
    target.value = '';
  }
};

const uploadToCloudinary = async (file: File) => {
  const cloudName = $config.public.cloudinaryCloudName;
  const uploadPreset = $config.public.cloudinaryUploadPreset;

  if (!cloudName || !uploadPreset) {
    alert('Konfigurasi Cloudinary belum disetel di .env (CLOUDINARY_CLOUD_NAME dan CLOUDINARY_UPLOAD_PRESET). Silakan hubungi developer.');
    return;
  }

  // Check file size (e.g. max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('Ukuran gambar terlalu besar. Maksimal 2MB.');
    return;
  }

  isUploading.value = true;
  uploadProgress.value = 10;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset as string);
  
  // Optional: add a folder
  formData.append('folder', 'mubk');

  try {
    // We use XMLHttpRequest instead of fetch to get upload progress
    const xhr = new XMLHttpRequest();
    
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        uploadProgress.value = Math.round((event.loaded / event.total) * 100);
      }
    };

    const promise = new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(JSON.parse(xhr.responseText));
        }
      };
      xhr.onerror = () => reject(new Error('Network error'));
    });

    xhr.open('POST', url, true);
    xhr.send(formData);

    const data: any = await promise;
    // Cloudinary returns secure_url
    emit('update:modelValue', data.secure_url);

  } catch (error) {
    console.error('Upload error:', error);
    alert('Gagal mengunggah gambar. Pastikan Upload Preset di Cloudinary disetel ke Unsigned.');
  } finally {
    isUploading.value = false;
    uploadProgress.value = 0;
  }
};
</script>
