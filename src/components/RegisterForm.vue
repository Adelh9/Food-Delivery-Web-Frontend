<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import type { IRegisterRequest } from '@/api/types'

const { handleRegister } = useUserStore();

const form = ref<IRegisterRequest>({
    fullName: '',
    gender: '',
    birthDate: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: '',
});


async function onSubmit() {
    await handleRegister(form.value);
}

</script>

<template>
    <div class="card shadow" style="width: 25rem;">
        <div class="card-body text-center">
            <h3 class="mb-4">Register new account</h3>
            <form @submit.prevent="onSubmit">
                <div class="form-floating mb-3">
                    <input type="name" class="form-control" id="floatingName" placeholder="Name" autocomplete="name"
                        required v-model="form.fullName" pattern="[A-Za-zА-Яа-яЁё]{3,}"/>
                    <label for="floatingName">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <select class="form-select py-0" id="autoSizingSelect" required v-model="form.gender">
                        <option value="" disabled selected hidden>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="floatingDate" placeholder="Date" required
                        v-model="form.birthDate" :max="new Date().toISOString().split('T')[0]"/>
                    <label for="floatingDate">Birth Date</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="tel" class="form-control" id="floatingTel" placeholder="Phone number" autocomplete="tel"
                        required v-model="form.phoneNumber" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"/>
                    <label for="floatingTel">Phone number</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="address" class="form-control" id="floatingAddress" placeholder="Address" required
                        v-model="form.address" />
                    <label for="floatingAddress">Address</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingEmail" placeholder="Email" autocomplete="email"
                        required v-model="form.email" />
                    <label for="floatingEmail">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                        autocomplete="password" required v-model="form.password" minlength="6"/>
                    <label for="floatingPassword">Password</label>
                </div>
                <button type="submit" class="btn btn-primary mt-3">Register</button>
            </form>
        </div>
    </div>
</template>