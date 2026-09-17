// =========================
// PalmQueue - ระบบเปลี่ยนหน้า
// =========================

let selectedRole = "";

// เลือกประเภทผู้ใช้งาน
function showLogin(role) {

    selectedRole = role;

    const homePage = document.getElementById("homePage");
    const loginPage = document.getElementById("loginPage");

    const loginIcon = document.getElementById("loginIcon");
    const loginTitle = document.getElementById("loginTitle");
    const loginDescription = document.getElementById("loginDescription");

    // ซ่อนหน้าแรก
    homePage.classList.remove("active");

    // แสดงหน้า Login
    loginPage.classList.add("active");


    // ถ้าเป็นลานรับซื้อ
    if (role === "buyer") {

        loginIcon.textContent = "🏭";

        loginTitle.textContent = "เข้าสู่ระบบลานรับซื้อ";

        loginDescription.textContent =
            "สำหรับเจ้าหน้าที่และผู้ดูแลลานรับซื้อปาล์ม";
    }


    // ถ้าเป็นเกษตรกร
    if (role === "farmer") {

        loginIcon.textContent = "👨‍🌾";

        loginTitle.textContent = "เข้าสู่ระบบเกษตรกร";

        loginDescription.textContent =
            "สำหรับเกษตรกรที่ต้องการจองคิวขายทะลายปาล์ม";
    }

}


// กลับหน้าหลัก
function goHome() {

    const homePage = document.getElementById("homePage");
    const loginPage = document.getElementById("loginPage");

    loginPage.classList.remove("active");

    homePage.classList.add("active");

    selectedRole = "";
}


// กดเข้าสู่ระบบ
function login(event) {

    event.preventDefault();

    if (selectedRole === "buyer") {

        alert("กำลังเข้าสู่ระบบลานรับซื้อ");

    } else if (selectedRole === "farmer") {

        alert("กำลังเข้าสู่ระบบเกษตรกร");

    }

}
