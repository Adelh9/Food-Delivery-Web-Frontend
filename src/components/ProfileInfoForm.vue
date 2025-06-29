<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import type { IUpdateProfileRequest } from '@/api/types'

const store = useUserStore();
const { handleUpdateInfo } = store;
const { user } = storeToRefs(store);

const form = ref<IUpdateProfileRequest>({
    fullName: '',
    birthDate: '',
    gender: '',
    address: '',
    phoneNumber: '',
});



onMounted(() => {
    form.value.fullName = user.value.fullName
    form.value.gender = user.value.gender
    form.value.birthDate = user.value.birthDate.slice(0, 10)
    form.value.phoneNumber = user.value.phoneNumber
    form.value.address = user.value.address
})

async function onSubmit() {
    await handleUpdateInfo(form.value)
}

</script>

<template>
    <div class="card shadow" style="width: 25rem;">
        <div class="card-body text-center">
            <h3 class="mb-4">Profile</h3>
            <form @submit.prevent="onSubmit">
                <div class="form-floating mb-3">
                    <input type="name" class="form-control" id="floatingName" placeholder="Name" autocomplete="name"
                        v-model="form.fullName" />
                    <label for="floatingName">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingEmail" placeholder="Email" :value="store.user.email"
                        readonly />
                    <label for="floatingEmail">Email address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="floatingDate" placeholder="Date" v-model="form.birthDate" />
                    <label for="floatingDate">Birth Date</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingEmail" placeholder="Email"
                        :value="store.user.gender" readonly />
                    <label for="floatingEmail">Gender</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="address" class="form-control" id="floatingAddress" placeholder="Address"
                        v-model="form.address" />
                    <label for="floatingAddress">Address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="tel" class="form-control" id="floatingTel" placeholder="Phone number" autocomplete="tel"
                        v-model="form.phoneNumber" />
                    <label for="floatingTel">Phone number</label>
                </div>
                <button type="submit" class="btn btn-primary">Save changes</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>