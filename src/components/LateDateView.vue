<template>
    <div class="lateDate">
        <h3 style="text-align: center;">Dates au plus tard</h3>
        
        <div style="display: flex; justify-content: left; flex-wrap: wrap; align-items:flex-start; gap: 5px; text-align: center; width: 90%; margin: 20px auto;">
          <table border="1px solid black" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; color: blue;">{{ table.getOneTask("deb")?.lateDate }}</td>
              <td style="padding: 8px; font-weight: bold;">D</td>
            </tr>
            <tr v-for="nextKey in table.getOneTask('deb')?.nextTasks" >
                <td style="padding: 8px; color: blue;">{{ table.tasks.get(nextKey)?.lateDate }}</td>
                <td style="display: flex; gap: 3px; padding: 8px 10px;">
                  <span>{{ nextKey }}</span>
                  <span>{{ 0 }}</span>
                </td>
            </tr>
          </table>
  
          <table v-for="[key, value] in table.getOrderedTasks" border="1px solid black" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; color: blue;">{{ value.lateDate }}</td>
              <td style="padding: 8px;">{{ key }}</td>
            </tr>
            <template v-for="nextKey in value.nextTasks">
              <tr>
                <td style="padding: 8px; color: blue;">{{ table.getOneTask(nextKey)?.lateDate }}</td>
                <td style="display: flex; gap: 3px; padding: 8px 10px;">
                  <span>{{ nextKey }}</span>
                  <span>{{ table.getOneTask(key)?.duration }}</span>
                </td>
              </tr>
              </template>
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