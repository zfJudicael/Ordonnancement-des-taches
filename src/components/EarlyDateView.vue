<template>
    <div class="earlyDate">
        <h3 style="text-align: center;">Dates au plus tôt</h3>
        
        <div style="display: flex; justify-content: left; flex-wrap: wrap; align-items:flex-start; gap: 5px; text-align: center; width: 90%; margin: 20px auto;">
          
          <table v-for="[key, value] in table.getOrderedTasks" border="1px solid black" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; color: red;">{{ value.earlyDate }}</td>
              <td style="padding: 8px;">{{ key }}</td>
            </tr>
            <template v-if="value.previousTasks.length>0">
              <tr v-for="prevKey in value.previousTasks">
                <td style="padding: 8px; color: red;">{{ table.getOneTask(prevKey)?.earlyDate }}</td>
                <td style="display: flex; gap: 3px; padding: 8px 10px;">
                  <span>{{ prevKey }}</span>
                  <span>{{ table.getOneTask(prevKey)?.duration }}</span>
                </td>
              </tr>
            </template>
  
            <tr v-else>
              <td style="padding: 8px; color: red;">0</td>
                <td style="display: flex; gap: 3px; padding: 8px 10px;">
                  <span style="font-weight: bold;">D</span>
                  <span>0</span>
                </td>
            </tr>
          </table>
          
          <table border="1px solid black" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; color: red;">{{ table.getOneTask("fin")?.earlyDate }}</td>
              <td style="padding: 8px; font-weight: bold;">F</td>
            </tr>
            <tr  v-for="prevKey in table.getOneTask('fin')?.previousTasks ">
                <td style="padding: 8px; color: red;">{{ table.tasks.get(prevKey)?.earlyDate }}</td>
                <td style="display: flex; gap: 3px; padding: 8px 10px;">
                  <span>{{ prevKey }}</span>
                  <span>{{ table.tasks.get(prevKey)?.duration  }}</span>
                </td>
            </tr>
          </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TableModel } from '@/models/TableModel';

defineProps({
    table: {
        type: TableModel,
        required: true
    }
})
</script>