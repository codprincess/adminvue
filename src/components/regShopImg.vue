<template>
  <el-upload class="upload-demo" action="" ref="upload" :auto-upload='false' :on-change='changeUpload' accept="image/jpeg,image/gif,image/png,image/bmp">
    <div size="small" class="upload_btn"><div style="height:40px"></div><i class="iconfont icon-jiahao"></i><p style="line-height:0">点击上传</p></div>
  </el-upload>
</template>
<script>
export default {
  name: 'regShopImg',
  data () {
    return {
      imageUrl: '',
      imgthing: {}
    }
  },
  props: ['imgN', 'nameN'],
  methods: {
    changeUpload (file, fileList) {
      console.log(file)
      // 判断图片大小
      if (fileList[0].size < 1100000) {
        // 判断图片格式是否为jpg,png,jepg,gif
        var fileName=fileList[0].name
        // var suffixIndex=fileName.lastIndexOf(".")
        // var suffix=fileName.substring(suffixIndex+1).toUpperCase()
        var suffix = fileName.substring(fileName.lastIndexOf(".")+1).toUpperCase()
        if (suffix=="BMP"||suffix=="JPG"||suffix=="JPEG"||suffix=="PNG"||suffix=="GIF") {
            this.fileList = fileList
            this.$nextTick(
            () => {
              var i = this.imgN
              let uploadLists = document.getElementsByClassName('el-upload-list')
              let uploadListsN = uploadLists[i]
              let uploadListLi = uploadListsN.children
              uploadListsN.setAttribute('style', 'position: absolute;height: 160px;margin-top: 0;margin-left: 300px;width: 260px;overflow: hidden')
              let liA = uploadListLi[0]
              // 试着获取bolb里面的数据------------S
              //获取图片的Blob值
              function getImageBlob(url, cb) {
                  var xhr          = new XMLHttpRequest()
                  xhr.open("get", url, true)
                  xhr.responseType = "blob"
                  xhr.onload       = function() {
                      if (this.status == 200) {
                          if(cb) cb(this.response)
                      }
                  }
                  xhr.send()
              }
              function preView(url){
                  let reader    = new FileReader()
                  getImageBlob(url, function(blob){
                      reader.readAsDataURL(blob)
                  })
                  reader.onload = function(e) {
                      // 获取bolb里面数据时,生成预览
                      var img = document.createElement("img")
                      img.src = e.target.result
                      // 获取bolb里面数据时,生成预览
                      let imgElement = document.createElement('img')
                      imgElement.setAttribute('src', fileList[0].url)
                      imgElement.setAttribute('style', 'max-width:100%;padding-left:0')
                      if (liA.lastElementChild.nodeName !== 'IMG') {
                        liA.appendChild(imgElement)
                      }
                      // 把base64的信息放到imgthing的file里
                      file.base64 = e.target.result
                  }
              }
              preView(fileList[0].url)
              // 试着获取bolb里面的数据-------------E
              // 不获取bolb里面数据时,生成预览
              // let imgElement = document.createElement('img')
              // imgElement.setAttribute('src', fileList[0].url)
              // imgElement.setAttribute('style', 'max-width:100%;padding-left:0')
              // if (liA.lastElementChild.nodeName !== 'IMG') {
              //   liA.appendChild(imgElement)
              // }
            }
          )
          // 修改nameN名字对应的数据,在一个页面使用多个不同字段图片上传，为了复用组件
          if (this.nameN === 'identityCard_Z') {
            this.imgthing.identityCard_Z = file
          }
          if (this.nameN === 'identityCard_F') {
            this.imgthing.identityCard_F = file
          }
          if (this.nameN === 'identityCard_S') {
            this.imgthing.identityCard_S = file
          }
          this.$emit('imgthing', this.imgthing)
        } else {
          this.$message.error('文件类型不正确,请重新上传！')
        }
      } else {
        this.$message.error('图片大小超过1M,请重新上传')
      }
    }
  }
}
</script>
<style>
.upload-demo{
    width:260px;
    height:160px;
}
.upload_btn{
    width:260px;
    height:160px;
    background:#f2f2f2
}
.el-upload__tip{
    margin:0;float:left
}
</style>


