<template>
    <div class="step_node">
        <div>{{ data.label }}</div>

        <Handle type="target" class="left_handle" :position="Position.Left"/>
        <Handle type="source" :position="Position.Right"/>
    </div>
</template>

<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core';
import type { NodeProps } from '@vue-flow/core';

const props = defineProps<NodeProps>()
</script>

<style lang="scss">
.step_node{
    border-radius: 50%;
    font-weight: bold;
    padding: 20px;
    border: 1px solid black;

    .left_handle{
        border-radius: 0;
        width: 10px;
        height: 10px;
    }
}
</style>