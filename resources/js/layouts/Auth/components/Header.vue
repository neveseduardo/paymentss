<template>
    <div>
        <el-menu
            :default-active="'1'"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
        >
            <el-menu-item index="1">Paymentss</el-menu-item>
            <el-submenu index="2">
                <template slot="title">Sobre nós</template>
                <el-menu-item index="2-1">Sobre a empresa</el-menu-item>
                <el-menu-item index="2-2">Sobre os criadores</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
	methods: {
		handleSelect(){
			return false
		}
	}
}
</script>

