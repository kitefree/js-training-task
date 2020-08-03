export default{
    template:`
    <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
        <div class="modal-header">
            <h5 class="modal-title" id="fillProductModalLabel">{{mode ==='edit' ? '編輯產品' : '新增產品'}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group">
                        <label for="imageUrl">輸入圖片網址</label>
                        <input type="text" id="imageUrl" class="form-control"
                            v-model="tempProduct.imageUrl">
                    </div>
                    <img class="img-fluid" :src="tempProduct.imageUrl">
                </div>
                <div class="col-sm-8">
                    <div class="form-group">
                        <label for="title">標題</label>
                        <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                            v-model="tempProduct.title">
                    </div>

                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="category">分類</label>
                            <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                                v-model="tempProduct.category">
                        </div>
                        <div class="col-md-6">
                            <label for="unit">單位</label>
                            <input id="unit" type="unit" class="form-control" placeholder="請輸入單位"
                                v-model="tempProduct.unit">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="origin_price">原價</label>
                            <input id="origin_price" type="text" class="form-control" placeholder="請輸入原價"
                                v-model="tempProduct.origin_price">
                        </div>
                        <div class="col-md-6">
                            <label for="price">售價</label>
                            <input id="price" type="text" class="form-control" placeholder="請輸入售價"
                                v-model="tempProduct.price">
                        </div>
                    </div>
                    <hr>
                    <div class="form-row">

                        <label for="description">產品描述</label>
                        <textarea type="text" id="description" class="form-control" placeholder="請輸入產品描述"
                            v-model="tempProduct.description"></textarea>

                    </div>
                    <div class="form-row">

                        <label for="content">說明內容</label>
                        <textarea type="text" id="content" class="form-control" placeholder="請輸入說明內容"
                            v-model="tempProduct.content"></textarea>

                    </div>
                    <div class="form-row">
                        <div class="form-check">
                            <input type="checkbox" id="enabled" class="form-check-input"
                                v-model="tempProduct.enabled">
                            <label for="enabled" class="form-check-label">是否啟用</label>
                        </div>
                    </div>
                </div>


            </div>

        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
            <button type="button" class="btn btn-primary" @click="save">儲存</button>
        </div>
    </div>
</div>`,
    props:['tempProduct','mode'],
    methods:{
        save(){                        
            this.$emit('to-save',this.tempProduct);
        }
    }
}