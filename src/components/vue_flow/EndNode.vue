<template>
    <div class="end_node" >
        <div>Fin</div>

        <Handle type="source" class="handle" :position="Position.Left"/>
    </div>
</template>

<script setup lang="ts">
import type { Background } from '@vue-flow/background';
import { Position, Handle } from '@vue-flow/core';
import type { NodeProps } from '@vue-flow/core';

const props = defineProps<NodeProps>()
</script>

<style lang="scss">
.end_node{
    border-radius: 50%;
    color: white;
    font-weight: bold;
    background-color: red;
    padding: 20px;
    border: 1px solid red;

    .handle{
        background-color: red;
        border-radius: 0;
        width: 10px;
        height: 10px;
    }
}
</style>