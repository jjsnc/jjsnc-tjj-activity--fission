    import sensors from '@/assets/js/common/shenceImport';
   
    // 获取url参数(&符号拼接参数)
    const getQueryString = (name) => {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)", "ig");
        var r;
        r = window.location.search.substr(1).match(reg);
        r == 'null' || r == 'undefined' ? r = null : '';
        if (r){
            var val = r[r.length-1].split('=')[1];
            return val == 'null' || val == 'undefined' ? null : val;
        } 
        // if (r) return unescape(r[2]);
        var r = getParams(name);
        r == 'null' || r == 'undefined' ? r = null : '';
        if (r) return r;
        return null;
    }
   // 获取url参数(/符号拼接参数)
    function getParams(key) {
        var url = window.location.pathname;
        var arr = url.split('/');
        var index = arr.lastIndexOf(key);
        return (index < 0 ? null : arr[index + 1]);
    }
    // 获取用户信息
    const _getUserInfo = () => {
        let isWeixinMini = getQueryString('uuid') == 'wechat';
        let session_id = getQueryString('session_id'), // 小程序标识
            os = getQueryString('os'); // APP标识
        if(isWeixinMini || os){
            return (sessionStorage.getItem('tjj_fission_user') ? JSON.parse(sessionStorage.getItem('tjj_fission_user')) : {})
        }else{
            return (localStorage.getItem('tjj_fission_user') ? JSON.parse(localStorage.getItem('tjj_fission_user')) : {})
        }
    }
   /**
     * @type {{product: {banneCurrentUrl: string, bannerToUrl: string, bannerType: string, bannerRank: string, bannerBelongArea: string, bannerCurrentPageType: string, bannerToPageType: string}, imgBtn: {banneCurrentUrl: string, bannerToUrl: string, bannerType: string, bannerRank: string, bannerBelongArea: string, bannerCurrentPageType: string, bannerToPageType: string}, banner: {banneCurrentUrl: string, bannerToUrl: string, bannerType: string, bannerRank: string, bannerBelongArea: string, bannerCurrentPageType: string, bannerToPageType: string}}}
     * bannerType：运营位位类型 （图片/图片按钮/商品/品牌类型/搜索/个性化推荐/推送（PUSH）类型）
     * banneCurrentUrl： 运营位所在页面地址
     * bannerCurrentPageType： 当前运营位页面名称 （开机广告页、首页、个人中心、赚赚、活动专区、搜索、商品详情页）
     * bannerBelongArea：运营位所在版区（轮播图区域、频道区域、首页弹屏）
     * bannerToUrl： 运营位位跳转url地址
     * bannerToPageType： 运营位跳转页的页面类型（首页、分类页、店铺主页、十元五件、赚赚、商品详情页、H5、无跳转）
     * bannerRank： banner排序
     */
    let factory = {
        'banner': {
            bannerType: '图片',
            banneCurrentUrl:'',
            bannerCurrentPageType: '首页-推荐',
            bannerBelongArea: '轮播广告板块',
            bannerToUrl: '', //  must be fetched dynamically
            bannerToPageType: 'H5',
            bannerRank: 0 //  must be fetched dynamically
        },
        'imgBtn': {
            bannerType: '图片按钮',
            banneCurrentUrl:'',
            bannerCurrentPageType: '',
            bannerBelongArea: '频道区域',
            bannerToUrl: '', //  must be fetched dynamically
            bannerToPageType: '商品详情',
            bannerRank: 0 //  must be fetched dynamically
        },
        'product':{
            bannerType: '商品',
            banneCurrentUrl:'',
            bannerCurrentPageType: '',
            bannerBelongArea: '推荐商品',
            bannerToUrl: '', //  must be fetched dynamically
            bannerToPageType: '商品详情',
            bannerRank: 0 //  must be fetched dynamically
        },
        'oneBuy':{
            commodityID: '',
            commodityName:'',
            firstCommodity: '',
            secondCommodity: '',
            pricePerCommodity: '', 
            commodityNumber: 1, 
            refer: '',
            currentPage: '',
        },
        'commodityDetail':{
            // 商品详情页类型
            goodsDetailType:'',
            // 上一层页面
            refer:'',
            // 商品ID
            commodityID:'',
            // 商品名称
            commodityName: '',
            // 商品一级分类
            firstCommodity:'',
            // 商品二级分类
            secondCommodity:'',
            // 商品单价
            pricePerCommodity:'',
            // storeID
            storeID: '',
            // 店铺名称
            storeName:''
        },
        'addToShoppingcart':{
            commodityID: '',
            commodityName:'',
            firstCommodity: '',
            secondCommodity: '',
            pricePerCommodity: '', 
            commodityNumber: 1, 
            refer: '',
            currentPage: '',
        }
    }

    /**
     *
     * @param option
     * @returns {Target}
     * @constructor
     *  if want use sensors tract , you can
     *  let target = new Target ({productDom: productDom, dom: bannerDom})
     *   during use swipe loop module, banner dom is not real count so need use target.banner() init
     *   banner sensors tract use target.bannerTrack(index: bannerRank)
     *   bannerBtn sensor tract use target.bannerBtnTrack({...})
     *   product sensor tract use target.productTrack({...})
     *
     */

    function Target(option) {
        let self = this;
        self.linkDom = null; // banner  a tag dom
        self.dom = option["dom"] || ''; // banner origin dom
        self.productDom = option["productDom"] || ''; // product origin dom
        self.data = option["data"] || {}; // banner origin data
        self.bannerData = []; // analyzed banner data
        self.loginUser(); // use real user_id
        return self;
    }
    Target.prototype = {
        loginUser: function() {
            // use local storage user_id
            let userInfo = _getUserInfo();
            let user_id = userInfo.user_id || '';
            if (user_id) {
                console.log(Vue)
                sensors.login(user_id);
            } else {
                sensors.logout();
            }
        },
        bannerAnalyze: function() {
            let self = this;
            let dom = self.dom;
            // analyze banner data and setting to factory
            self.linkDom = dom.find('a');
            self.slide = dom.find('.swiper-slide');
            let len = self.linkDom.length;
            for( let i =0 ;i < len; i++) {
                let obj =  factory['banner'];
                let o =  self.consistItem({index: i});
                self.bannerData.push(o);
            }
        },
        consistItem: function(option) {
            // consist banner item data and return
            let self = this;
            return function citem() {
                let linkDom = self.linkDom;
                let len = self.linkDom.length;
                let item = factory['banner'];
                let index = option.index
                item.bannerToUrl = $(linkDom[index]).attr('href');
                item.bannerRank = index+1;
                if( len > self.data.length ){
                    // rectify swiper loop index
                    if (index == len - 2) {
                        item.bannerRank = 1;
                    }
                }
                return item;
            }
        },
        banner: function() {
            // banner init
            let self = this;
            self.bannerAnalyze();
        },
        /**
         *
         * banner pagination index
         */
        bannerTrack: function( params ) {
            let self  = this;
            // send  customer sensors track
            console.log(params,'bannerClick')
            self.track('bannerClick', params);
        },
        /**
         * @param option
         * url: bannerToUrl 运营位位跳转url地址
         * index: banerRank banner排序
         * bannerCurrentPageType:  当前运营位页面名称
         */
        productTrack: function(option) {
            // product customer sensors track
            let self = this;
            let dom = self.productDom;
            let obj = factory['product'];
            obj.bannerToUrl = option.url || '';
            obj.banerRank = option.index || 0;
            obj.bannerCurrentPageType = option.bannerCurrentPageType || '';
            self.track('bannerClick', obj);
        },
        /**
         * @param option
         * url: bannerToUrl 运营位位跳转url地址
         * index: banerRank banner排序
         * bannerCurrentPageType:  当前运营位页面名称
         */
        bannerBtnTrack: function(option) {
            // analyze banner button data and setting to factory
            let self = this;
            let obj = factory['imgBtn'];
            obj.bannerCurrentPageType = option.bannerCurrentPageType || '';
            obj.bannerToUrl = option.url || '';
            obj.bannerRank = option.index || 0;
            self.track('bannerClick', obj);
        },
        /**
         * @param option
         */
        oneBuyTrack: function(option) {
            // analyze banner button data and setting to factory
            let self = this;
            let obj = factory['oneBuy'];
            obj.commodityID = option.commodityID;
            obj.commodityName = option.commodityName;
            obj.firstCommodity = option.firstCommodity;
            obj.secondCommodity = option.secondCommodity;
            obj.pricePerCommodity = option.pricePerCommodity;
            obj.refer = option.refer;
            obj.currentPage = option.currentPage;
            self.track('buying', obj);
        },
        /**
         * @param option
         */
        addToShoppingcartTrack: function(option) {
            // analyze banner button data and setting to factory
            let self = this;
            let obj = factory['addToShoppingcart'];
            obj.commodityID = option.commodityID;
            obj.commodityName = option.commodityName;
            obj.firstCommodity = option.firstCommodity;
            obj.secondCommodity = option.secondCommodity;
            obj.pricePerCommodity = option.pricePerCommodity;
            obj.refer = option.refer;
            obj.currentPage = option.currentPage;
            self.track('addToShoppingcart', obj);
        },
        /**
         * @param option
         */
        commodityDetailTrack: function(option) {
            // analyze banner button data and setting to factory
            let self = this;
            let obj = factory['commodityDetail'];
            obj.goodsDetailType = option.goodsDetailType;
            obj.commodityID = option.commodityID;
            obj.commodityName = option.commodityName;
            obj.firstCommodity = option.firstCommodity;
            obj.secondCommodity = option.secondCommodity;
            obj.pricePerCommodity = option.pricePerCommodity;
            obj.storeID = option.storeID;
            obj.storeName = option.storeName;
            obj.refer = option.refer;
            self.track('commodityDetail', obj);
        },
        track: function(target, param) {
            // setting sensors customer track
            sensors.track(target, param);
        }
    }
    export default Target;
