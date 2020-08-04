import zh from './zh_TW.js';

// 自定義設定檔案，錯誤的 className
//bootstrap 的 classname  https://getbootstrap.com/docs/4.5/components/forms/#how-it-works
VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
});

// 載入自訂規則包
VeeValidate.localize('tw', zh);

// 將 VeeValidate input 驗證工具載入 作為全域註冊
Vue.component('ValidationProvider', VeeValidate.ValidationProvider);
// 將 VeeValidate 完整表單 驗證工具載入 作為全域註冊
Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

// 掛載 Vue-Loading 套件 選其一使用，使用此方法會在 __proto__ 可看見 $loading 方法
//Vue.use(VueLoading);

// 全域註冊 VueLoading 並標籤設定為 loading
Vue.component('loading', VueLoading);

// 全域註冊 filter 千分位功能
Vue.filter('currency', function (value) {
  if (typeof value === 'number') {
    var parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return '$' + parts.join('.');
  } else {
    return value;
  }

});

var app = new Vue({
  el: '#app',
  data: {
    products: [], //取得產品列表使用
    tempProduct: {}, //取得產品明細使用
    status: { //小圈圈動畫，記錄item.id使用
      loadingItem: '',
    },
    form: { //表單使用
      name: '',
      email: '',
      tel: '',
      address: '',
      payment: '',
      message: '',
    },
    formColumnName: { //表單使用
      name: '收件人姓名',
      email: 'Email',
      tel: '手機',
      address: '地址',
      payment: '購買方式',
      message: '留言',
    },
    cart: {},
    cartTotal: 0,
    isLoading: false,
    UUID: '603cb025-ce43-4d9c-bb8a-51732cf440ab',
    APIPATH: 'https://course-ec-api.hexschool.io',
  },
  //vue instance 被 constructor 建立後，在這裡完成 data binding
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    //請求服務器取得所有產品資料
    getProducts(page = 1) {
      this.pageLoading(true);
      const url = `${this.APIPATH}/api/${this.UUID}/ec/products?page=${page}`;
      axios.get(url).then((response) => {
        this.products = response.data.data;
        this.pageLoading(false);
      });
    },
    //請求服務器提供產品明細資料 by productID
    getDetailed(id) {
      this.dotLoadingById(id);

      const url = `${this.APIPATH}/api/${this.UUID}/ec/product/${id}`;

      axios.get(url).then((response) => {
        this.tempProduct = response.data.data;
        // 由於 tempProduct 的 num 沒有預設數字
        // 因此 options 無法選擇預設欄位，故要增加這一行解決該問題
        // 另外如果直接使用物件新增屬性進去是會雙向綁定失效，因此需要使用 $set
        this.$set(this.tempProduct, 'num', 0);

        //使用$refs 代替用dom 方式去調用物件
        $(this.$refs.productDetailModal).modal('show');
        //$('#productDetailModal').modal('show');

        this.dotLoadingById('');
      });
    },
    //頁面loading效果
    pageLoading(show = true) {
      this.isLoading = show;
    },
    //點點loading效果
    dotLoadingById(id = '') {
      this.status.loadingItem = id;
    },
    //請求服務器將商品加入購物車記錄，支援直接添加與選數量添加
    addToCart(item, quantity = 1) {
      this.dotLoadingById(item.id);

      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;

      const cart = {
        product: item.id,
        quantity,
      };

      axios.post(url, cart).then(() => {
        this.dotLoadingById('');
        //使用$refs 代替用dom 方式去調用物件
        $(this.$refs.productDetailModal).modal('hide');
        this.getCart();
      }).catch((error) => {
        this.dotLoadingById('');
        console.log(error.response.data.errors);
        //使用$refs 代替用dom 方式去調用物件
        $(this.$refs.productDetailModal).modal('hide');
      });
    },
    //請求服務器提供購物車資料
    getCart() {
      this.pageLoading(true);
      this.cartTotal = 0;
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;

      axios.get(url).then((response) => {
        this.cart = response.data.data;
        // 累加總金額
        this.cart.forEach((item) => {
          this.cartTotal += item.product.price * item.quantity;
        });
        this.pageLoading(false);
      });
    },
    //請求服務器更新購物車資料 by productID
    quantityUpdate(id, num) {
      // 避免商品數量低於 0 個
      if (num <= 0) return;

      this.pageLoading(true);
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping`;

      const data = {
        product: id,
        quantity: num,
      };

      axios.patch(url, data).then(() => {
        this.pageLoading(false);
        this.getCart();
      });
    },
    //請求服務器刪除所有購物車資料
    removeAllCartItem() {
      this.pageLoading(true);
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/all/product`;

      axios.delete(url)
        .then(() => {
          this.pageLoading(false);
          this.getCart();
        });
    },
    //請求服務器刪除購物車資料 by productID
    removeCartItem(id) {
      this.pageLoading(true);
      const url = `${this.APIPATH}/api/${this.UUID}/ec/shopping/${id}`;

      axios.delete(url).then(() => {
        this.pageLoading(false);
        this.getCart();
      });
    },
    //請求服務器寫入訂單資訊
    createOrder() {
      this.pageLoading(true);
      const url = `${this.APIPATH}/api/${this.UUID}/ec/orders`;

      axios.post(url, this.form).then((response) => {
        if (response.data.data.id) {
          // 跳出提示訊息
          //使用$refs 代替用dom 方式去調用物件
          $(this.$refs.orderModal).modal('show');
          //$('#orderModal').modal('show');

          // 訂單送出成功後，重新渲染購物車(購物車會清空)
          this.getCart();
        }
      }).catch((error) => {
        console.log(error.response.data.errors);
      }).finally(() => {
        /* 不論成功失敗，都做些事 */
        this.pageLoading(false);

      });
    },
  },
});
