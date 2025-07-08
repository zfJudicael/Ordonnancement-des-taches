<template>
    <div class="tableView" style="display: flex;  margin-top: 20px; margin-bottom: 20px; justify-content: center;"> 
        <div style="padding: 4px; border: 1px solid black; font-weight: bold; ">
          <p style="height: 40px; margin: 2px;">Tâches</p>
          <p style="height: 40px; margin: 2px;">Durée</p>
          <p style="height: 40px; margin: 2px;">T.ant.</p>
          <p style="height: 40px; margin: 2px;">T.succ.</p>
        </div>
        <div style="padding: 4px; min-width: 40px; text-align: center; border: 1px solid black;"
          v-for="[key, value] in table.getTasks" 
          
        >
          <p style="height: 40px; margin: 2px;">{{ key }}</p>
          <p style="height: 40px; margin: 2px;">{{ value.duration }}</p>
          <p style="height: 40px; margin: 2px;">
            <template v-if="value.previousTasks.length > 0">
              <span v-for="prevTask in value.previousTasks">{{ `${prevTask} ` }}</span>
            </template>
            <span v-else>-</span>
          </p>
          <p style="height: 40px; margin: 2px;">
            <template v-if="value.nextTasks?.[0] == 'fin' ">
              <span style="font-weight: bold;">F</span>
            </template>
            <span v-else v-for="nextTask in value.nextTasks">{{ `${nextTask} ` }}</span>
          </p>
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