<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from 'vue-router';
import MainLayout from "@/components/MainLayout.vue";

const router = useRouter();

const userType = ref(localStorage.getItem("userType"));

const userTypeLabel = computed(() => {
  return userType.value === "admin"
    ? "Virtual Assistant Admin Panel"
    : "Virtual Assistant List";
});

const isAdmin = computed(() => {
  return userType.value === "admin";
});

const endDate = ref('');
const info = ref({
  value: []
});

const formatCreatedAt = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
};

const filteredInfo = computed(() => {
  return info.value.value.filter(item => {
    return item.status === 'pending' || item.status === 'approved'  && item.created_at.includes(endDate.value);
  });
});

onMounted(async () => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    const response = await axios.get('https://va.mis.digital/virtual_assistant', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log(response.data); 
    info.value.value = response.data.data || [];
  } catch (error) {
    console.error("Error fetching data", error);
  }
});

const onNextStatus = async (id) => {
  try {
    const token = Cookies.get("token");

    if (!token) {
      console.error("Token not found");
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("status", "approved");

    const response = await axios.put(`https://va.mis.digital/virtual_assistant/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    router.push({ name: 'virtualassistantlist' });
    window.location.reload(); // Reload the page
  } catch (error) {
    console.error("Error during request", error);
  }
};
</script>

<template>
  <MainLayout :title="userTypeLabel">
    <template v-if="!isAdmin">
      <table>
        <input type="date" class="dateid" v-model="endDate">
      </table>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Date</th>
            <th>Text</th>
            <th>Voice</th>
            <th>File</th>
            <th>Feedback</th>
            <th>Reviewed</th>
          </tr>
        </thead>
        <br>
        <tbody>
          
            <tr v-for="(item, index) in filteredInfo" :key="index">
                <template v-if="item.status === 'pending'">
                <td>{{ item.user_id }}</td>
                <td>{{ formatCreatedAt(item.created_at) }}</td>
                <td>
                    <a :href="item.text" target="_blank" rel="noopener noreferrer">
                    <img
                        src="@/assets/images/audio.png"
                        alt="img"
                        class="inline-block h-12 w-12"
                        />
                    </a>
                </td>
                <td>
                    <a :href="item.voice" target="_blank" rel="noopener noreferrer">
                        <img
                        src="@/assets/images/file.png"
                        alt="img"
                        class="inline-block h-12 w-12"
                        />
                   </a>
                </td>
                <td>
                <a :href="item.file" target="_blank" rel="noopener noreferrer">
                    <img
                        src="@/assets/images/text.png"
                        alt="img"
                        class="inline-block h-12 w-12"
                    />
                </a>
                </td>
                <td>{{ item.feedback }}</td>
                <td>
                    <button
                        type="button"
                        class="btn-button"
                        @click.prevent="onNextStatus(item.id)"
                    >
                    <p style="color: #FFFFFF">Add to data set </p>
                    </button>
                </td>
               </template>
            </tr>
          <br>
          
          <tr v-for="(item, index) in filteredInfo" :key="index">
            <template v-if="item.status === 'approved'">
            <td>{{ item.user_id }}</td>
            <td>{{ formatCreatedAt(item.created_at) }}</td>
            <td>
                <a :href="item.text" target="_blank" rel="noopener noreferrer">
                    <img
                        src="@/assets/images/audio.png"
                        alt="img"
                        class="inline-block h-12 w-12"
                        />
                </a>
           </td>
            <td>
                <a :href="item.voice" target="_blank" rel="noopener noreferrer">
                        <img
                        src="@/assets/images/file.png"
                        alt="img"
                        class="inline-block h-12 w-12"
                        />
                   </a>
            </td>
            <td>
                <a :href="item.file" target="_blank" rel="noopener noreferrer">
                    <img
                        src="@/assets/images/text.png"
                        alt="img"
                        class="inline-block h-12 w-12"
                    />
                </a>
            </td>
            <td>{{ item.feedback }}</td>
            <td>
                <img
                        src="@/assets/images/check.png"
                        alt="img"
                        class="inline-block h-12 w-12 imgcheck"
                />
            </td>
           </template>
          </tr>
        </tbody>
      </table>
    </template>
  </MainLayout>
</template>


<style scoped>

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: left;
}

table, tr {

    top: 428px;
    left: 176px;
    border-radius: 7px;
    border: 1px;

}

th {
    background-color: #f2f2f2;
}

input[type="date"] {
    width: 337px;
    height: 41px;
    top: 292px;
    left: 176px;
    border-radius: 7px;
    border: 1px;
    border: 1px solid #8F8C8C;

}
.btn-button {
    width: 174px;
    height: 41.63px;
    top: 441px;
    left: 1529px;
    background: #4D5865;

}
.imgcheck {

    width: 30px;
    height: 30px;
    top: 784px;
    margin-left: 70px;


}
</style>
