<template>
    <div class="book">
      <div>
        <img src="" alt="">
      </div>
      <b-form @submit="saveBook">
        <b-form-group id="exampleInputGroup1"
                      label="Love's Title:"
                      label-for="exampleInput1">
          <b-form-input id="exampleInput1"
                        type="text"
                        v-model="bookInfo.title"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="Love's Article:"
                      label-for="exampleInput2">
          <b-form-textarea id="textarea1"
                           v-model="bookInfo.content"
                           :rows="6"
                           required
                           :max-rows="32">
          </b-form-textarea>
        </b-form-group>
        <b-button type="submit" class="btn" variant="primary">submit</b-button>
      </b-form>
    </div>
</template>

<script>
  import {addBook, bookInfo} from "../apis";

    export default {
        name: "Book",
      data() {
        return {
          userInfo:JSON.parse(sessionStorage.getItem('user')),
          bookInfo: {
            title: '',
            content: ''
          },
        }
      },
      mounted(){
          this.lookBook();
      },
      methods:{
          lookBook(){
            let self =this;
            bookInfo({id:self.userInfo.id}).then(function (res) {
              if(res.code ===1){
                self.bookInfo = res.data;
              }
            })
          },
          saveBook(evt){
            evt.preventDefault();
            let self = this;
            let params = {
              id:self.userInfo.id,
              title:self.bookInfo.title,
              content:self.bookInfo.content,
              nick:self.userInfo.nick
            };
            addBook(params).then(function (res) {
              if(res.code ===1){
                if(res.data > 0){
                  self.lookBook();
                }else{
                  // 暂未修改
                }
              }
            })
          }
      }
    }
</script>

<style scoped lang="scss">
  .book{
    .btn{
      width: 100%;
    }
  }
</style>
