let pendingBooking=null, queueNo="#A023";
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);

function showToast(msg){
  const t=$("#toast"); t.textContent=msg; t.classList.add("show");
  setTimeout(()=>t.classList.remove("show"),2200);
}
function go(id){
  $$("#farmerApp .page").forEach(p=>p.classList.remove("active"));
  $("#"+id).classList.add("active");
  $$("#farmerApp .nav").forEach(n=>n.classList.toggle("active",n.dataset.page===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
function goStaff(id){
  $$("#staffApp .page").forEach(p=>p.classList.remove("active"));
  $("#"+id).classList.add("active");
  $$("#staffApp .nav").forEach(n=>n.classList.toggle("active",n.dataset.page===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
$$(".role").forEach(btn=>btn.onclick=()=>{
  $$(".role").forEach(x=>x.classList.remove("active")); btn.classList.add("active");
  $("#farmerApp").classList.toggle("hidden",btn.dataset.role!=="farmer");
  $("#staffApp").classList.toggle("hidden",btn.dataset.role!=="staff");
});
$$("#farmerApp .nav").forEach(btn=>btn.onclick=()=>go(btn.dataset.page));
$$("#staffApp .nav").forEach(btn=>btn.onclick=()=>goStaff(btn.dataset.page));

function confirmBooking(){
  const date=$("#bookDate").value;
  const time=$("#bookTime").value.split("·")[0].trim();
  const weight=Number($("#weight").value||0).toLocaleString("th-TH");
  const plate=$("#plate").value||"-";
  pendingBooking={shop:$("#shop").value,date,time,weight,plate};
  $("#confirmData").innerHTML=`
    <dt>ร้านรับซื้อ</dt><dd>${pendingBooking.shop}</dd>
    <dt>วันที่</dt><dd>${formatThaiDate(date)}</dd>
    <dt>เวลา</dt><dd>${time}</dd>
    <dt>ประมาณน้ำหนัก</dt><dd>${weight} กก.</dd>
    <dt>ทะเบียนรถ</dt><dd>${plate}</dd>`;
  go("fconfirm");
}
function formatThaiDate(v){
  if(!v) return "-";
  const d=new Date(v+"T00:00:00");
  return `${d.getDate()} ${["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."][d.getMonth()]} ${d.getFullYear()+543}`;
}
function finishBooking(){
  const n=String(Math.floor(Math.random()*900)+100);
  queueNo="#A"+n;
  $("#newQueue").textContent=queueNo;
  $("#successData").innerHTML=`<b>ข้อมูลการจอง</b><p>${formatThaiDate(pendingBooking.date)} · ${pendingBooking.time}</p><p>${pendingBooking.shop}</p><p>ประมาณ ${pendingBooking.weight} กก. · รถ ${pendingBooking.plate}</p>`;
  localStorage.setItem("palmqueue_booking",JSON.stringify({...pendingBooking,no:queueNo,status:"รอคิว"}));
  renderMyQueue(); go("fsuccess");
}
function renderMyQueue(){
  const saved=JSON.parse(localStorage.getItem("palmqueue_booking")||"null");
  const el=$("#myQueueList");
  if(!saved){el.innerHTML=`<div class="panel"><p>ยังไม่มีคิวปัจจุบัน</p></div>`;return}
  el.innerHTML=`<div class="queue-card current"><div><strong class="queue-no">${saved.no}</strong><p>${formatThaiDate(saved.date)} · ${saved.time}</p><p>${saved.shop} · ${saved.weight} กก. · ${saved.plate}</p><span class="pill ${saved.status==="เสร็จสิ้น"?"done":"wait"}">${saved.status}</span></div><button class="outline" onclick="cancelMyQueue()">ยกเลิกคิว</button></div>`;
}
function cancelMyQueue(){
  localStorage.removeItem("palmqueue_booking"); renderMyQueue(); showToast("ยกเลิกคิวแล้ว");
}
function setQueueStatus(status){
  showToast("เปลี่ยนสถานะเป็น "+status+" แล้ว");
  const p=$("#sdetail .big-pill"); p.textContent=status; p.className="pill big-pill "+(status==="กำลังชั่ง"?"blue":"wait");
}
function saveReceive(){
  const w=Number($("#receiveWeight").value||0), p=Number($("#receivePrice").value||0);
  const total=w*p;
  showToast(`บันทึกแล้ว ยอดรวม ${total.toLocaleString("th-TH",{minimumFractionDigits:2})} บาท`);
}
renderMyQueue();
