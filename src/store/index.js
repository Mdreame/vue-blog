import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const getBookList = `{
    getBookList{
        id
        name
        category
        extract
        comment
        createdAt
        classify
        tags
        author {
          name
        }
        coverUrl
    }
    
}`;

const getBlogList = `{
	getBlogList{
    	id
	  	name
        tags
    	description
    	createdAt
        category
	}
}`;

//按标签名分组，返回文章id和name
function groupByTags(allTagObjs, tags) {
	let arr = tags.reduce((acc, tag) => {
		let tagItemArr = tag.tags;
		if (tagItemArr.length > 0) {
			//遍历标签数组
			tagItemArr.map((item) => {
				// console.log(item);
				//初始化数组
				if (!acc[item]) {
					acc[item] = [];
				}
				acc[item].push({
					id: tag.id,
					name: tag.name,
					category: tag.category,
				});
			});
		}
		return acc;
	}, allTagObjs);
	console.log("arr ===> ", arr);
}
const store = new Vuex.Store({
	state: {
		jiang: "jiang",
		allTagObjs: {},
		books: [],
		techBlogs: [],
        //sameTags缓存
        cache: {}
	},
	mutations: {
		deliverBooks(state, books) {
			//数据传送给BookList
			state.books = books;
			groupByTags(state.allTagObjs, books);
		},
		deliverTechBlogs(state, techBlogs) {
			//数据传送给home
			state.techBlogs = techBlogs;
			groupByTags(state.allTagObjs, techBlogs);
		},
	},
	actions: {
        
		// 将图书列表传给mutations处理
		deliverBooks({ commit }) {
            
			//请求图书列表--Booklist.vue
			axios({
				url: `http://localhost:9000/graphql`, // 后端的接口地址
				method: "get",
				params: { query: getBookList },
				dataType: "json",
			})
				.then((res) => {
					// console.log(res);
					// console.log(commit);

					commit("deliverBooks", res.data.data.getBookList);
					// this.books = res.data.data.getBookList;
					// this.total = this.books.length > 0 ? this.books.length : 0;
				})
				.catch((error) => console.log(error));
		},

		deliverTechBlogs({ commit }) {
			//请求博客列表
			axios({
				url: `http://localhost:9000/graphql`,
				method: "get",
				params: { query: getBlogList },
				dataType: "json",
			})
				.then((res) => {
					commit("deliverTechBlogs", res.data.data.getBlogList);
				})
				.catch((error) => console.log(error));
		},
	},
});

export default store;
