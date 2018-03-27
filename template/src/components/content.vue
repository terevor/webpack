<template>
    <div class="ab-content">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'content'
}
</script>
<style scoped>
.ab-content {
    overflow: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    -webkit-overflow-scrolling: touch;
}
</style>
