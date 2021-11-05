<template>
    <div class="homesty">
        <Header />
        <Item />
        <Sale />
        <Class />
    </div>
    <Docker />
</template>
<script>
import Header from './Header'
import Item from './Item'
import Sale from './Sale'
import Class from './Class'
import Docker from './Docker'

export default {
  name: 'Home',
  components: { Header, Item, Sale, Class, Docker }
}
</script>
<style lang="scss" scoped>
    .homesty{
        overflow-y:auto;
        position: absolute;
        left:0;
        top:0;
        bottom: .5rem;
        right:0;
        padding: 0 .18rem .1rem .18rem;
    }
</style>
