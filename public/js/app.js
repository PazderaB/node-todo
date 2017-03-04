angular.module("idea",["ideaController","ideaService","loginService"]);var app=angular.module("ideaController",["ui.router"]).controller("mainController",["$scope","$http","Ideas","$state","Authenticate","LoginService","$timeout",function(t,e,n,a,o,i,r){t.formData={},t.loading=!0,n.get().success(function(e){i.isAuthenticated()?t.ideas=e:t.ideas=[],t.loading=!1}),t.createIdea=function(){void 0!=t.formData.text&&(t.loading=!0,n.create(t.formData).success(function(e){t.loading=!1,t.formData={},t.ideas=e}))},t.reload=function(){location.reload()},t.deleteIdea=function(e){t.loading=!0,n.delete(e).success(function(e){t.loading=!1,t.ideas=e})}}]).directive("ngConfirmClick",[function(){return{link:function(t,e,n){var a=n.ngConfirmClick||"Are you sure?",o=n.confirmedClick;e.bind("click",function(e){window.confirm(a)&&t.$eval(o)})}}}]).run(["$rootScope","$location","$state","LoginService",function(t,e,n,a){a.isAuthenticated()||n.transitionTo("login")}]).config(["$stateProvider","$urlRouterProvider",function(t,e){e.otherwise("/login"),t.state("login",{url:"/login",templateUrl:"loginTemplate.html",controller:"LoginController"}).state("home",{url:"/",templateUrl:"domainList.html",controller:"mainController"})}]).controller("LoginController",["$scope","$rootScope","$stateParams","$state","LoginService","$timeout",function(t,e,n,a,o,i){t.formSubmit=function(){o.login(t),t.loading=!0,i(function(){t.loading=!1,o.isAuthenticated()?(t.error="",t.username="",t.password="",a.go("home")):t.error="Incorrect username/password!"},1e3)}}]).factory("LoginService",["Authenticate","$state",function(t,e){var n=!1;return{login:function(e){t.authenticate(e.loginData).then(function(t){return value=t.data.callback===!1?t.data.callback:'"'+t.data.callback+'"',localStorage.setItem("token",'{"token":'+value+"}"),n})},isAuthenticated:function(){return localStorage.getItem("token")?(auth=JSON.parse(localStorage.getItem("token")).token||!1,t.authenticateToken(auth).then(function(t){return value=t.data.callback===!1?t.data.callback:'"'+t.data.callback+'"',localStorage.setItem("token",'{"token":'+value+"}"),t.data.callback===!1?(e.go("login"),!1):n}),auth):(e.go("login"),!1)}}}]);angular.module("ideaService",[]).factory("Ideas",["$http","LoginService",function(t,e){return{get:function(){return e.isAuthenticated(),t.get("/api/ideas")},create:function(n){return e.isAuthenticated(),t.post("/api/ideas",n)},delete:function(n,a){return e.isAuthenticated(),t.delete("/api/ideas/"+n)}}}]),angular.module("loginService",[]).factory("Authenticate",["$http",function(t){return{authenticate:function(e){return t.post("/api/authenticate",e)},authenticateToken:function(e){return t.get("/api/authenticate/"+e)}}}]);