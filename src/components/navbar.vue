<template>
    <nav class="nav">
        <ul class="menu">
            <li v-for="(item, index) in menuList" :key="index" class="menu-item" @mouseenter="openMenu = index"
                @mouseleave="openMenu = null">
                <!-- 一级菜单触发 -->
                <span class="menu-trigger" @click="go(item.path)">
                    {{ item.name }}
                </span>

                <!-- 二级菜单（嵌在当前 li 内，作用域正确） -->
                <ul v-if="item.children && item.children.length && openMenu === index" class="submenu">
                    <li v-for="(child, idx) in item.children" :key="idx" class="submenu-item">
                        <span @click="go(child.path)">{{ child.name }}</span>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="lang-switch">
            <select :value="locale" @change="switchTo($event.target.value)">
                <option value="zh-CN">{{ $t('common.lang.zh') }}</option>
                <option value="en-US">{{ $t('common.lang.en') }}</option>
            </select>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useI18n } from 'vue-i18n'
import { setLocale } from '../i18n'

const { locale } = useI18n()
const router = useRouter()
const openMenu = ref(null)

function switchTo(code) {
    if (code !== locale.value) setLocale(code)
}

function go(path) {
    if (path) router.push(path)
}

const menuList = [
    { name: '首页', path: '/' },
    {
        name: '关于',
        path: '/about',
        children: [
            { name: '发布活动', path: '/activities/create' },
            { name: '活动列表', path: '/activities/list' },
        ],
    },
]
</script>

<style scoped>
.nav {
    background: #333;
    padding: 0;
}

/* 顶部菜单容器 */
.menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0 8px;
}

/* 每个一级菜单项 */
.menu-item {
    position: relative;
}

/* 一级菜单触发元素（加一个 span 以匹配选择器） */
.menu-item>.menu-trigger {
    display: block;
    padding: 12px 20px;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
}

.menu-item>.menu-trigger:hover {
    background: #444;
}

/* 二级菜单 */
.submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background: #555;
    list-style: none;
    padding: 6px 0;
    margin: 0;
    min-width: 160px;
    border-radius: 6px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    z-index: 10;
}

.submenu-item>span {
    display: block;
    padding: 10px 14px;
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
}

.submenu-item>span:hover {
    background: #666;
}

.lang-switch button {
    margin-left: 8px;
    padding: 4px 8px;
    cursor: pointer;
}
</style>
