var app = require("express");
var router = app.Router();
//米可盒子
router.get("/mkBox",function(req,res,next){
	res.render("CloudWard/MKbox",{title : "设备详情"});
});
//设备绑定
router.get("/alterData",function(req,res,next){
	//req.params.id  //获取url取参数ID
	res.render("CloudWard/alterData",{title : "绑定使用者"});
});
//家庭医生
router.get("/familyDoctor",function(req,res,next){
	res.render("CloudWard/FamilyDoctor",{title : "家庭医生"})
});
//申请签约
router.get("/applyDoctor",function (req,res,next) {
    res.render("CloudWard/applyDoctor",{"title":"申请签约"});
})
//电子病历
router.get("/medicalRecords",function(req,res,next){
	res.render("CloudWard/MedicalRecords",{title : "健康档案"})
});
//APP下载
router.get("/download",function (req,res,next) {
	res.render("Download/Download",{"title":"APP下载"});
});
//绑定设备
router.get("/blindEquip",function (req,res,next) {
	res.render("CloudWard/blindEquip",{"title":"绑定设备"});
})
//康复指导
router.get("/guide",function (req,res,next) {
	res.render("CloudWard/Guide",{"title":"康复指导"})
});
//康复指导
router.get("/phyDetail",function (req,res,next) {
    res.render("CloudWard/phyDetail",{"title":"血压数据统计"})
});
//授权页面
router.get("/author",function (req,res,next) {
    res.render("author/author",{"title":"授权中..."})
})
//绑定手机号页面
router.get("/login",function (req,res,next) {
	res.render("author/login",{title : "绑定手机"})
})
module.exports = router;
