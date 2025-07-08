<template>
    <div class="start_node">
        <div>Deb</div>

        <Handle type="source" :position="Position.Right"/>
    </div>
</template>

<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core';
import type { NodeProps } from '@vue-flow/core';

const props = defineProps<NodeProps>()
</script>

<style lang="scss">
.start_node{
    border-radius: 50%;
    color: white;
    font-weight: bold;
    background-color: blue;
    padding: 20px;
    border: 1px solid blue;
}
</style>