<template>
  <b-container fluid class="craw">
    <b-row>
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="采集类别" class="mb-2">
          <b-form-select v-model="crawType" :options="typeOptions" text-field="label"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="4" class="my-1">
        <b-form-group horizontal label="关键字" class="mb-2">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="关键字搜索"/>
            <b-input-group-append>
              <b-btn :disabled="!filter" @click="filter = ''">清除</b-btn>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="4" class="my-1">
        <b-form-group horizontal class="mb-2 text-right">
          <b-btn  @click.stop="openAddModel( $event.target)">添加</b-btn>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table show-empty bordered hover
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             empty-text="暂无数据,快去添加一条吧"
             empty-filtered-text="无匹配查询结果"
             @filtered="onFiltered">
      <template slot="lastTime" slot-scope="row">
        {{row.item.lastTime | dateTimeFormat}}
      </template>
      <template slot="handle" slot-scope="row">
        <b-button size="sm" @click.stop="info(row.item, $event.target)" class="mr-1 mw">编辑</b-button>
        <b-button size="sm" @click.stop="row.toggleDetails" class="mr-1 mw">{{ row.detailsShowing ? '隐藏' : '查看'}}</b-button>
        <b-button size="sm" @click.stop="deleteCraw(row.item.id)" class="mr-1 mw">删除</b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <p>采集参数:</p>
        <pre>{{row.item.keywords}}</pre>
        <p>采集结果:</p>
        <b-card>
          <div v-html="row.item.lastResult"></div>
        </b-card>
        <b-button size="sm mt-2" @click="execCraw(row.item)">再次采集</b-button>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination size="md" :total-rows="totalRows" v-model="currentPage"
                      :per-page="perPage"></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal id="modalInfo" hide-footer	 ref="modal" @hide="resetModal" :title="modalInfo.title">
      <b-form @submit.stop.prevent="onSubmit">
        <b-form-group id="exampleInputGroup1"
                      label="采集类别:"
                      class="text-left"
                      label-for="exampleInput1">
          <b-form-select id="exampleInput1"
                         :options="typeOptions"
                         required
                         text-field="label"
                         v-model="modalInfo.content.url">
          </b-form-select>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="采集名称:"
                      class="text-left"
                      label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        required
                        v-model="modalInfo.content.name"
                        placeholder="请输入采集名称">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup3"
                      label="搜索名称:"
                      class="text-left"
                      label-for="exampleInput3">
          <b-form-input id="exampleInput3"
                        required
                        v-model="modalInfo.content.keywords.keyWord"
                        placeholder="输入搜索名称">
          </b-form-input>
        </b-form-group>
        <div class="craw-footer">
          <b-button type="submit" class="btn">采集并保存</b-button>
        </div>
      </b-form>
    </b-modal>

  </b-container>
</template>

<script>
  import { crawModify,crawExec,crawDelete,crawList,addCraw,common } from './../../apis/index'
  export default {
    name: "Craw",
    data() {
      return {
        userInfo:JSON.parse(sessionStorage.getItem('user')),
        typeOptions: [],
        crawType: null,
        fields: [
          {
            key: 'id',
            label: '序号',
          },
          {
            key: 'name',
            label: '名称',
          },
          {
            key: 'common.label',
            label: '类别',
          },
          {
            key: 'lastNick',
            label: '人员',
          },
          {
            key: 'lastTime',
            label: '时间',
          },
          {
            key: 'handle',
            label: '操作',
          },
        ],
        items:[],
        currentPage: 1,
        perPage: 5,
        totalRows: 5,
        filter: null,
        modalInfo: {title: '',
          content: {
            name:'',
            keywords:{
              keyWord:''
            },
            url:'',
          }
        }
      }
    },
    mounted(){
      this.lookCrawTypes()
      this.lookCraws();
    },
    methods: {
      lookCrawTypes(){
        let self = this;
        common({type:'craw_url'}).then(function (res) {
          if(res.code ===1 &&  res.data){
            res.data.unshift({
              label:'请选择',
              value:null
            });
            self.typeOptions = res.data;
          }
        });
      },
      lookCraws(){
        let self =this;
        crawList({id:self.userInfo.id}).then(function (res) {
          if(res.code ===1 &&  res.data){
            for(let [index,value] of res.data.entries()){
              res.data[index].keywords = JSON.parse(value.keywords);
            }
            self.items = res.data;
            self.totalRows = res.data.length;
          }
        });
      },
      resetModal() {
        this.modalInfo.title = '';
        this.modalInfo.content =  {
          name:'',
          keywords:{
            keyWord:''
          },
          url:''
        };
      },
      info(item, button) {
        this.modalInfo.title = '编辑数据采集';
        this.modalInfo.content = item;
        this.$root.$emit('bv::show::modal', 'modalInfo', button)
      },
      openAddModel(button){
        this.modalInfo.title = '添加数据采集';
        this.$root.$emit('bv::show::modal', 'modalInfo', button);
      },
      //添加
      onSubmit(evt) {
        evt.preventDefault();
        let self = this;
        let params = {
          name:self.modalInfo.content.name,
          url:self.modalInfo.content.url,
          keywords:JSON.stringify(self.modalInfo.content.keywords),
          lastNick:self.userInfo.nick
        };
        if(self.modalInfo.title === '编辑数据采集'){
          params.id = self.modalInfo.content.id;
          params.lastResult = self.modalInfo.content.lastResult;
          crawModify(params).then(function () {
            self.lookCraws();
          });
        }else{
          addCraw(params).then(function () {
            self.lookCraws();
          })
        }

        this.$refs.modal.hide()
      },
      execCraw(item){
        let self = this;
        let params = {
          id:item.id,
          lastNick:self.userInfo.nick
        };
        crawExec(params).then(function () {
          self.lookCraws();
        })
      },
      deleteCraw(id){
        let self = this;
        let params = {
          id:id,
        };
        crawDelete(params).then(function () {
          self.lookCraws();
        })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

<style scoped lang="scss">
  .craw {
    height: 100%;
    overflow: scroll;
    pre{
      padding: 1.25rem;
      color: #f56c6c;
      background-color: #263238;
    }
    .craw-footer{
      display: flex;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-pack: end;
      justify-content: flex-end;
      padding: 1rem 0;
      border-top: 1px solid #e9ecef;
    }
  }
  @media only screen and (max-width: 576px) {
    .craw {
      .mw{
        width: 100%;
        margin-bottom: 1rem;
      }
    }
  }

</style>
