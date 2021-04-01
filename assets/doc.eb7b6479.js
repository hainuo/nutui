import{c as t,o as e,A as n}from"./vendor.ce30e942.js";const o={class:"markdown-body"},d=n('<h1>ActionSheet 动作面板</h1><p>从底部弹出的动作菜单面板。</p><h2>基本用法</h2><p>默认</p><pre><code class="language-html">&lt;div @click=&quot;switchActionSheet&quot;&gt;\n   &lt;span&gt;&lt;label&gt;基础用法&lt;/label&gt;&lt;/span&gt;\n   &lt;div class=&quot;selected-option&quot; v-html=&quot;state.val&quot;&gt;&lt;/div&gt;\n&lt;/div&gt;\n&lt;nut-actionsheet\n  :is-visible=&quot;state.isVisible&quot;\n  :menu-items=&quot;menuItems&quot;\n  @choose=&quot;chooseItem&quot;\n&gt;&lt;/nut-actionsheet&gt;\n</code></pre><h2>展示取消按钮</h2><pre><code class="language-html">&lt;div @click=&quot;switchActionSheet&quot;&gt;\n  &lt;span&gt;&lt;label&gt;展示取消按钮&lt;/label&gt;&lt;/span&gt;\n  &lt;div class=&quot;selected-option&quot; v-html=&quot;state.val&quot;&gt;&lt;/div&gt;\n&lt;/div&gt;\n&lt;nut-actionsheet :is-visible=&quot;isVisible&quot; \n  @close=&quot;switchActionSheet&quot;\n  :menu-items=&quot;menuItems&quot;\n  @choose=&quot;chooseItem&quot;\n  cancel-txt=&quot;取消&quot;\n&gt;&lt;/nut-actionsheet&gt;\n</code></pre><h2>展示描述信息</h2><pre><code class="language-html">&lt;div @click.native=&quot;switchActionSheet&quot;&gt;\n   &lt;span&gt;&lt;label&gt;展示取消按钮&lt;/label&gt;&lt;/span&gt;\n    &lt;div class=&quot;selected-option&quot; v-html=&quot;state.val&quot;&gt;&lt;/div&gt;\n&lt;/div&gt;\n &lt;nut-actionsheet :is-visible=&quot;isVisible&quot; \n    @close=&quot;switchActionSheet&quot;\n    description=&quot;state.desc&quot;\n    :menu-items=&quot;menuItems&quot;\n    @choose=&quot;chooseItem&quot;\n    cancel-txt=&quot;取消&quot;\n&gt;&lt;/nut-actionsheet&gt;\n</code></pre><h2>选项状态</h2><pre><code class="language-html">&lt;div @click.native=&quot;switchActionSheet&quot;&gt;\n    &lt;span class=&quot;title&quot;&gt;&lt;label&gt;性别&lt;/label&gt;&lt;/span&gt;\n    &lt;span class=&quot;selected-option&quot; v-html=&quot;sex&quot;&gt;&lt;/span&gt;\n&lt;/div&gt;\n&lt;nut-actionsheet\n@close=&quot;switchActionSheet&quot;\n  :is-visible=&quot;state.isVisible4&quot;\n  cancel-txt=&quot;取消&quot;\n  :menu-items=&quot;menuItemsThree&quot;\n&gt;&lt;/nut-actionsheet&gt;\n</code></pre><pre><code class="language-javascript">setup() {\n    const state = reactive({\n      isVisible: false,\n      value: &#39;&#39;,\n      desc: &#39;这是一段描述信息&#39;\n    });\n    const menuItems = [\n      {\n        name: &#39;选项一&#39;,\n        value: 0\n      },\n      {\n        name: &#39;选项二&#39;,\n        value: 1\n      },\n      {\n        name: &#39;选项三&#39;,\n        value: 2\n      }\n    ];\n     const switchActionSheet = () =&gt; {\n       state.isVisible = !state.isVisible\n    };\n    const chooseItem = (item,index) =&gt; {\n      console.log(item,index);\n    };\n\n</code></pre><h2>Prop</h2><table><thead><tr><th>字段</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>cancel-txt</td><td>取消文案</td><td>String</td><td>‘取消’</td></tr><tr><td>menu-items</td><td>列表项</td><td>Array</td><td>[ ]</td></tr><tr><td>option-tag</td><td>设置列表项展示使用参数</td><td>String</td><td>‘name’</td></tr><tr><td>is-visible</td><td>遮罩层可见</td><td>Boolean</td><td>false</td></tr><tr><td>option-sub-tag</td><td>设置列表项描述展示使用参数</td><td>String</td><td>‘subname’</td></tr><tr><td>choose-tag-value</td><td>设置选中项的值，和’option-tag’的值对应</td><td>String</td><td>‘’</td></tr><tr><td>title</td><td>设置列表项标题</td><td>String</td><td>‘’</td></tr><tr><td>description</td><td>设置列表项副标题/描述</td><td>String</td><td>‘’</td></tr><tr><td>color</td><td>高亮颜色</td><td>String</td><td>‘#ee0a24’</td></tr><tr><td>close-abled</td><td>遮罩层是否可关闭</td><td>Boolean</td><td>true</td></tr></tbody></table><h2>Event</h2><table><thead><tr><th>字段</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>choose</td><td>选择之后触发</td><td>选中列表项item, 选中的索引值index</td></tr><tr><td>cancel</td><td>点击取消文案时触发</td><td>无</td></tr></tbody></table>',16),l={expose:[],setup:n=>(n,l)=>(e(),t("div",o,[d]))};export default l;
