<template>
    <b-container fluid class="book">
      <div>
        <img src="" alt="">
      </div>
      <b-form @submit="saveBook">
        <b-form-group id="exampleInputGroup1"
                      label="Love's Title:"
                      label-for="exampleInput1">
          <b-form-input id="exampleInput1"
                        v-model="bookInfo.title"
                        required>
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="Love's Article:"
                      label-for="exampleInput2">
          <b-form-textarea id="textarea1"
                           v-model="bookInfo.content"
                           :rows="8"
                           required
                           @input="handleChange"
                           :max-rows="12">
          </b-form-textarea>
        </b-form-group>
        <b-button type="submit" class="btn">Save Note</b-button>
      </b-form>
    </b-container>
</template>

<script>
  import {addBook, bookInfo} from "../../apis/index";

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
          if(localStorage.getItem('history')){
            this.bookInfo = JSON.parse(localStorage.getItem('history'))
          }else{
            this.lookBook();
          }
      },
      methods:{
          lookBook(){
            let self =this;
            bookInfo({id:self.userInfo.id}).then(function (res) {
              if(res.code ===1 &&  res.data){
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
            localStorage.removeItem('history');
            addBook(params).then(function () {
              self.lookBook();
            })
          },
        handleChange(){
            console.log(2)
          localStorage.setItem('history',JSON.stringify(this.bookInfo))
        }
      }
    }
</script>

<style scoped lang="scss">
  .book{
    height: 100%;
    overflow: scroll;
    .btn{
      width: 100%;
    }
  }
</style>
